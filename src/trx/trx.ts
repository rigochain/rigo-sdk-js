import * as trxPb from './trx_pb'
import Long from 'long'
import Bytes from "../utils/bytes";
import BN from "bn.js";
import Account from "../account/account";
import {getNanoSecond} from "../utils/time";
import {createHash} from "crypto";

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

function isZeroAddr(value: string): boolean {
  return value === '0000000000000000000000000000000000000000'
}


export class Trx {
  static BuildTransferTrx(obj: any): Trx {
    return {
      version: isSet(obj.version) ? Number(obj.version) : Number(1),
      time: isSet(obj.time) ? Long.fromValue(obj.time) : getNanoSecond(),
      nonce: isSet(obj.nonce) ? Long.fromValue(obj.nonce) : Long.fromValue(1),
      from: Bytes.fromHex(obj.from),
      to: Bytes.fromHex(obj.to),
      amount: isSet(obj.amount) ? obj.amount: "0",
      gas: isSet(obj.gas) ? obj.gas: "0",
      type: 1, // transfer type
      payload: isSet(obj.payload) ? obj.payload: {}
    }
  },

  encodeTransferTrx(object: any): trxPb.TrxProto {
    if( !isSet(object.from)
        || !isSet(object.to)
        || !isSet(object.amount)
        || !isSet(object.gas)) {
      throw Error("mandatory argument is missed")
    }
    return {
      version: isSet(object.version) ? Number(object.version) : 1,
      time: isSet(object.time) ? Long.fromValue(object.time) : getNanoSecond(),
      nonce: isSet(object.nonce) ? Long.fromValue(object.nonce) : Long.fromValue(1),
      from: Bytes.fromHex(object.from),
      to: Bytes.fromHex(object.to),
      Amount: new Uint8Array(new BN(object.amount).toArrayLike(Buffer)),
      Gas: new Uint8Array(new BN(object.gas).toArrayLike(Buffer)),
      type: 1, // transfer type
      Payload: new Uint8Array(),
      sig: new Uint8Array(),
    }
  },

  BuildDelegateTrx(object:any): trxPb.TrxProto {
    if( !isSet(object.from)
        || !isSet(object.to)
        || !isSet(object.amount)
        || !isSet(object.gas)) {
      throw Error("mandatory argument is missed")
    }
    return {
      version: isSet(object.version) ? Number(object.version) : 1,
      time: isSet(object.time) ? Long.fromValue(object.time) : getNanoSecond(),
      nonce: isSet(object.nonce) ? Long.fromValue(object.nonce) : Long.fromValue(1),
      from: Bytes.fromHex(object.from),
      to: Bytes.fromHex(object.to),
      // proto3 default rule: If the field has default value, the filed should be omitted.
      Amount: object.amount === "0" ? new Uint8Array() : new Uint8Array(new BN(object.amount).toArrayLike(Buffer)),
      Gas: object.gas === "0" ? new Uint8Array() : new Uint8Array(new BN(object.gas).toArrayLike(Buffer)),
      type: 2, // staking type
      Payload: new Uint8Array(),
      sig: new Uint8Array(),
    }
  },

  BuildUndelegateTrx(object:any): trxPb.TrxProto {
    if( !isSet(object.from)
        || !isSet(object.to)
        || !isSet(object.amount)
        || !isSet(object.gas)
        || !isSet(object.txhash)) {
      throw Error("mandatory argument is missed")
    }

    const payloadBytes = trxPb.TrxPayloadUnstakingProto.encode({
      txHash: Bytes.fromHex(object.txhash)
    }).finish()

    return {
      version: isSet(object.version) ? Number(object.version) : 1,
      time: isSet(object.time) ? Long.fromValue(object.time) : getNanoSecond(),
      nonce: isSet(object.nonce) ? Long.fromValue(object.nonce) : Long.fromValue(1),
      from: Bytes.fromHex(object.from),
      to: Bytes.fromHex(object.to),
      Amount: object.amount === "0" ? new Uint8Array() : new Uint8Array(new BN(object.amount).toArrayLike(Buffer)),
      Gas: object.gas === "0" ? new Uint8Array() : new Uint8Array(new BN(object.gas).toArrayLike(Buffer)),
      type: 3, // un-staking type
      Payload: payloadBytes,
      sig: new Uint8Array(),
    }
  }
}

export function verifyTrx(tx:trxPb.TrxProto, acct:Account): boolean {
  const oriSig = tx.sig
  tx.sig = new Uint8Array()

  const buf = trxPb.TrxProto.encode(tx)
  const txbz = buf.finish()
  const ret = acct.verify(oriSig, txbz)
  tx.sig = oriSig
  return ret
}




// SignTrx(tx:trxPb.TrxProto, acct:Account): [Bytes, Bytes] {
//   tx.sig = new Uint8Array()
//
//   const buf = trxPb.TrxProto.encode(tx)
//   const txbz = buf.finish()
//
//   tx.sig = acct.sign(new Bytes(txbz))
//
//   return [new Bytes(tx.sig), new Bytes(trxPb.TrxProto.encode(tx).finish())]
// }

//
// export function decodeTrx(d: Bytes): TrxJson {
//   let payload:any
//   const tx = TrxProto.decode(d)
//   switch (tx.type) {
//     case 1: // transfer
//       break;
//     case 2: // staking
//       break;
//     case 3: // unstaking
//       const p:TrxPayloadUnstakingProto = TrxPayloadUnstakingProto.decode(tx.Payload);
//       payload = {
//         txhash: new Bytes(p.txHash).toHex()
//       }
//       break;
//   }
//
//   const sha256 = createHash('sha256')
//   const hash = sha256.update(d).digest()
//
//   return {
//     hash: hash.toString('hex'),
//     version: tx.version,
//     time: tx.time.toString(10),
//     nonce: tx.nonce.toString(10),
//     from: new Bytes(tx.from).toHex(),
//     to: new Bytes(tx.to).toHex(),
//     amount: new BN(tx.Amount).toString(10),
//     gas: new BN(tx.Gas).toString(10),
//     type: tx.type,
//     payload: payload,
//     sig: new Bytes(tx.sig).toHex()
//   }
// }

