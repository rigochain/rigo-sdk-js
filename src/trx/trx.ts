/*
    Copyright 2023 All Rigo Chain Developers

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/

import * as trxPb from './trx_pb'
import Long from 'long'
import Bytes from "../utils/bytes";
import BN from "bn.js";
import Account from "../account/account";
import {fromNanoSecond, getNanoSecond} from "../utils/time";
import {createHash} from "crypto";

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

function isZeroAddr(value: string): boolean {
  return value === '0000000000000000000000000000000000000000'
}

interface Trx {
  hash?: string;
  version?: number;
  time?: Date;
  nonce?: number;
  from: string;
  to: string;
  amount: string;
  gas: string;
  type?: number;
  payload?: object|TrxPayloadUndelegating;
  sig?: string;
}

interface TrxPayloadUndelegating {
  txhash: string
}

interface TrxPayloadCreateContract {
  data: string
}

function DecodeTrx(d: Bytes): Trx {
  let payload:any
  const tx = trxPb.TrxProto.decode(d)
  switch (tx.type) {
    case 1: // transfer
    case 2: // staking
      break;
    case 3: // unstaking
      const p:trxPb.TrxPayloadUnstakingProto = trxPb.TrxPayloadUnstakingProto.decode(tx.Payload);
      payload = {
        txhash: new Bytes(p.txHash).toHex()
      }
      break;
  }

  const sha256 = createHash('sha256')
  const hash = sha256.update(d).digest()

  return {
    hash: hash.toString('hex'),
    version: tx.version,
    time: fromNanoSecond(tx.time),
    nonce: tx.nonce.toNumber(),
    from: new Bytes(tx.from).toHex(),
    to: new Bytes(tx.to).toHex(),
    amount: new BN(tx.Amount).toString(10),
    gas: new BN(tx.Gas).toString(10),
    type: tx.type,
    payload: payload,
    sig: new Bytes(tx.sig).toHex()
  }
}

function BuildTransferTrx(obj: Trx): trxPb.TrxProto {
  return {
    version: isSet(obj.version) ? Number(obj.version) : 1,
    time: isSet(obj.time) ?  getNanoSecond(obj.time) : getNanoSecond(),
    nonce: isSet(obj.nonce) ? Long.fromValue(obj.nonce) : Long.fromValue(1),
    from: Bytes.fromHex(obj.from),
    to: Bytes.fromHex(obj.to),
    // proto3 default rule: If the field has default value, the filed should be omitted.
    Amount: obj.amount === "0" ? new Uint8Array() : new Uint8Array(new BN(obj.amount).toArrayLike(Buffer)),
    Gas: obj.gas === "0" ? new Uint8Array() : new Uint8Array(new BN(obj.gas).toArrayLike(Buffer)),
    type: 1, // staking type
    Payload: new Uint8Array(),
    sig: new Uint8Array(),
  }
}

function BuildDelegateTrx(obj: Trx): trxPb.TrxProto {
  return {
    version: isSet(obj.version) ? Number(obj.version) : 1,
    time: isSet(obj.time) ? getNanoSecond(obj.time) : getNanoSecond(),
    nonce: isSet(obj.nonce) ? Long.fromValue(obj.nonce) : Long.fromValue(1),
    from: Bytes.fromHex(obj.from),
    to: Bytes.fromHex(obj.to),
    // proto3 default rule: If the field has default value, the filed should be omitted.
    Amount: obj.amount === "0" ? new Uint8Array() : new Uint8Array(new BN(obj.amount).toArrayLike(Buffer)),
    Gas: obj.gas === "0" ? new Uint8Array() : new Uint8Array(new BN(obj.gas).toArrayLike(Buffer)),
    type: 2, // staking type
    Payload: new Uint8Array(),
    sig: new Uint8Array(),
  }
}

function BuildUndelegateTrx(obj: Trx): trxPb.TrxProto {
  const payload = obj.payload as TrxPayloadUndelegating
  if( !isSet((payload)) || !isSet(payload.txhash)) {
    throw Error("mandatory argument is missed")
  }

  const payloadBytes = trxPb.TrxPayloadUnstakingProto.encode({
    txHash: Bytes.fromHex(payload.txhash)
  }).finish()

  return {
    version: isSet(obj.version) ? Number(obj.version) : 1,
    time: isSet(obj.time) ? getNanoSecond(obj.time) : getNanoSecond(),
    nonce: isSet(obj.nonce) ? Long.fromValue(obj.nonce) : Long.fromValue(1),
    from: Bytes.fromHex(obj.from),
    to: Bytes.fromHex(obj.to),
    Amount: obj.amount === "0" ? new Uint8Array() : new Uint8Array(new BN(obj.amount).toArrayLike(Buffer)),
    Gas: obj.gas === "0" ? new Uint8Array() : new Uint8Array(new BN(obj.gas).toArrayLike(Buffer)),
    type: 3, // un-staking type
    Payload: payloadBytes,
    sig: new Uint8Array(),
  }
}

function buildContractTrx(obj: Trx): trxPb.TrxProto  {
  const payload = obj.payload as TrxPayloadCreateContract
  if( !isSet((payload)) || !isSet(payload.data)) {
    throw Error("mandatory argument is missed")
  }
  const payloadBytes = trxPb.TrxPayloadContractProto.encode({
    data: Bytes.fromHex(payload.data)
  }).finish()

  return {
    version: isSet(obj.version) ? Number(obj.version) : 1,
    time: isSet(obj.time) ? getNanoSecond(obj.time) : getNanoSecond(),
    nonce: isSet(obj.nonce) ? Long.fromValue(obj.nonce) : Long.fromValue(1),
    from: Bytes.fromHex(obj.from),
    to: Bytes.fromHex(obj.to),
    Amount: new Uint8Array(),
    Gas: obj.gas === "0" ? new Uint8Array() : new Uint8Array(new BN(obj.gas).toArrayLike(Buffer)),
    type: 6, // contract type
    Payload: payloadBytes,
    sig: new Uint8Array(),
  };
}

function SignTrx(tx:trxPb.TrxProto, acct:Account): [Bytes, Bytes] {
  tx.sig = new Uint8Array()

  const buf = trxPb.TrxProto.encode(tx)
  const txbz = buf.finish()

  tx.sig = acct.sign(new Bytes(txbz))

  return [new Bytes(tx.sig), new Bytes(trxPb.TrxProto.encode(tx).finish())]
}

function VerifyTrx(tx:trxPb.TrxProto, acct:Account): boolean {
  const oriSig = tx.sig
  tx.sig = new Uint8Array()

  const buf = trxPb.TrxProto.encode(tx)
  const txbz = buf.finish()
  const ret = acct.verify(oriSig, txbz)
  tx.sig = oriSig
  return ret
}

export const TrxBuilder = {
  DecodeTrx,
  BuildTransferTrx,
  BuildDelegateTrx,
  BuildUndelegateTrx,
  VerifyTrx,
  SignTrx,
  buildContractTrx,
}

