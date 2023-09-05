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

import * as trxPb from './trx_pb';
import Long from 'long';
import { BytesUint8Array } from 'rweb3-types';
import BN from 'bn.js';
import { Account } from '../account';
import { fromNanoSecond, getNanoSecond } from 'rweb3-utils';
import { createHash } from 'crypto';
import { TrxProtoUtils } from './trx_pb';
import { HexString, ResponsesDecoder, TrxProto } from 'rweb3-types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isSet(value: any): boolean {
    return value !== undefined;
}

export interface Trx {
    hash?: string;
    version?: number;
    time?: Date;
    nonce?: number;
    from: string;
    to: string;
    amount: string;
    gas: string;
    type?: number;
    payload?: object | TrxPayloadUndelegating;
    sig?: string;
}

interface TrxPayloadUndelegating {
    txhash: string;
}

interface TrxPayloadCreateContract {
    data: string;
}

function DecodeTrx(d: BytesUint8Array): Trx {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let payload: any;
    const tx = trxPb.TrxProtoUtils.decode(d);
    switch (tx.type) {
        case 1: // transfer
        case 2: // staking
            break;
        case 3: // unstaking
            const p: trxPb.TrxPayloadUnstakingProto = trxPb.TrxPayloadUnstakingProto.decode(
                tx.Payload,
            );
            payload = {
                txhash: new BytesUint8Array(p.txHash).toHex(),
            };
            break;
    }

    const sha256 = createHash('sha256');
    const hash = sha256.update(d).digest();

    return {
        hash: hash.toString('hex'),
        version: tx.version,
        time: fromNanoSecond(tx.time),
        nonce: tx.nonce.toNumber(),
        from: new BytesUint8Array(tx.from).toHex(),
        to: new BytesUint8Array(tx.to).toHex(),
        amount: new BN(tx.Amount).toString(10),
        gas: new BN(tx.Gas).toString(10),
        type: tx.type,
        payload: payload,
        sig: new BytesUint8Array(tx.sig).toHex(),
    };
}

function BuildTransferTrx(obj: Trx): TrxProto {
    return {
        version: isSet(obj.version) ? Number(obj.version) : 1,
        time: isSet(obj.time) ? getNanoSecond(obj.time) : getNanoSecond(),
        nonce: isSet(obj.nonce) && obj.nonce ? Long.fromValue(obj.nonce) : Long.fromValue(0),
        from: BytesUint8Array.fromHex(obj.from),
        to: BytesUint8Array.fromHex(obj.to),
        // proto3 default rule: If the field has default value, the filed should be omitted.
        Amount:
            obj.amount === '0'
                ? new Uint8Array()
                : new Uint8Array(new BN(obj.amount).toArrayLike(Buffer)),
        Gas:
            obj.gas === '0'
                ? new Uint8Array()
                : new Uint8Array(new BN(obj.gas).toArrayLike(Buffer)),
        type: 1, // staking type
        Payload: new Uint8Array(),
        sig: new Uint8Array(),
    };
}

function BuildDelegateTrx(obj: Trx): TrxProto {
    return {
        version: isSet(obj.version) ? Number(obj.version) : 1,
        time: isSet(obj.time) ? getNanoSecond(obj.time) : getNanoSecond(),
        nonce: isSet(obj.nonce) && obj.nonce ? Long.fromValue(obj.nonce) : Long.fromValue(1),
        from: BytesUint8Array.fromHex(obj.from),
        to: BytesUint8Array.fromHex(obj.to),
        // proto3 default rule: If the field has default value, the filed should be omitted.
        Amount:
            obj.amount === '0'
                ? new Uint8Array()
                : new Uint8Array(new BN(obj.amount).toArrayLike(Buffer)),
        Gas:
            obj.gas === '0'
                ? new Uint8Array()
                : new Uint8Array(new BN(obj.gas).toArrayLike(Buffer)),
        type: 2, // staking type
        Payload: new Uint8Array(),
        sig: new Uint8Array(),
    };
}

function BuildUndelegateTrx(obj: Trx): TrxProto {
    const payload = obj.payload as TrxPayloadUndelegating;
    if (!isSet(payload) || !isSet(payload.txhash)) {
        throw Error('mandatory argument is missed');
    }

    const payloadBytes = trxPb.TrxPayloadUnstakingProto.encode({
        txHash: BytesUint8Array.fromHex(payload.txhash),
    }).finish();

    return {
        version: isSet(obj.version) ? Number(obj.version) : 1,
        time: isSet(obj.time) ? getNanoSecond(obj.time) : getNanoSecond(),
        nonce: isSet(obj.nonce) && obj.nonce ? Long.fromValue(obj.nonce) : Long.fromValue(1),
        from: BytesUint8Array.fromHex(obj.from),
        to: BytesUint8Array.fromHex(obj.to),
        Amount:
            obj.amount === '0'
                ? new Uint8Array()
                : new Uint8Array(new BN(obj.amount).toArrayLike(Buffer)),
        Gas:
            obj.gas === '0'
                ? new Uint8Array()
                : new Uint8Array(new BN(obj.gas).toArrayLike(Buffer)),
        type: 3, // un-staking type
        Payload: payloadBytes,
        sig: new Uint8Array(),
    };
}

function buildContractTrx(obj: Trx): TrxProto {
    const payload = obj.payload as TrxPayloadCreateContract;
    if (!isSet(payload) || !isSet(payload.data)) {
        throw Error('mandatory argument is missed');
    }
    const payloadBytes = trxPb.TrxPayloadContractProto.encode({
        data: BytesUint8Array.fromHex(payload.data),
    }).finish();

    return {
        version: isSet(obj.version) ? Number(obj.version) : 1,
        time: isSet(obj.time) ? getNanoSecond(obj.time) : getNanoSecond(),
        nonce: isSet(obj.nonce) && obj.nonce ? Long.fromValue(obj.nonce) : Long.fromValue(1),
        from: BytesUint8Array.fromHex(obj.from),
        to: BytesUint8Array.fromHex(obj.to),
        Amount: new Uint8Array(),
        Gas:
            obj.gas === '0'
                ? new Uint8Array()
                : new Uint8Array(new BN(obj.gas).toArrayLike(Buffer)),
        type: 6, // contract type
        Payload: payloadBytes,
        sig: new Uint8Array(),
    };
}

function SignTrx(tx: TrxProto, acct: Account): [BytesUint8Array, BytesUint8Array] {
    tx.sig = new Uint8Array();

    const buf = TrxProtoUtils.encode(tx);
    const txbz = buf.finish();

    tx.sig = acct.sign(new BytesUint8Array(txbz));

    return [new BytesUint8Array(tx.sig), new BytesUint8Array(TrxProtoUtils.encode(tx).finish())];
}

function signedRawTransaction(tx: TrxProto, acct: Account): HexString {
    tx.sig = new Uint8Array();

    const buf = TrxProtoUtils.encode(tx);
    const txbz = buf.finish();

    tx.sig = acct.sign(new BytesUint8Array(txbz));

    const signedTxByte = new BytesUint8Array(TrxProtoUtils.encode(tx).finish());

    return Buffer.from(signedTxByte).toString('base64');
}

function VerifyTrx(tx: TrxProto, acct: Account): boolean {
    const oriSig = tx.sig;
    tx.sig = new Uint8Array();

    const buf = TrxProtoUtils.encode(tx);
    const txbz = buf.finish();
    const ret = acct.verify(oriSig, txbz);
    tx.sig = oriSig;
    return ret;
}

export const TrxBuilder = {
    DecodeTrx,
    BuildTransferTrx,
    BuildDelegateTrx,
    BuildUndelegateTrx,
    VerifyTrx,
    SignTrx,
    buildContractTrx,
    signedRawTransaction,
};
