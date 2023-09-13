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

import * as trxPb from './trx_pb.js';
import Long from 'long';
import { BytesUint8Array } from 'rweb3-types';
import BN from 'bn.js';
import { fromNanoSecond, getNanoSecond } from 'rweb3-utils';
import { createHash } from 'crypto';
import { TrxPayloadProposalProto, TrxPayloadVotingProto, TrxProtoUtils } from './trx_pb.js';
import { HexString, TrxProto } from 'rweb3-types';
import { Transaction, TransactionPayloadUnDelegating } from './tx_types.js';
import { RWeb3Account } from '../types.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isSet(value: any): boolean {
    return value !== undefined;
}

interface TrxPayloadCreateContract {
    data: string;
}

function decodeTransaction(d: BytesUint8Array): Transaction<Object> {
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

function buildTransferTrxProto(transaction: Transaction<Object>): TrxProto {
    return {
        version: isSet(transaction.version) ? Number(transaction.version) : 1,
        time: isSet(transaction.time) ? getNanoSecond(transaction.time) : getNanoSecond(),
        nonce:
            isSet(transaction.nonce) && transaction.nonce
                ? Long.fromValue(transaction.nonce)
                : Long.fromValue(0),
        from: BytesUint8Array.fromHex(transaction.from),
        to: BytesUint8Array.fromHex(transaction.to),
        // proto3 default rule: If the field has default value, the filed should be omitted.
        Amount:
            transaction.amount === '0'
                ? new Uint8Array()
                : new Uint8Array(new BN(transaction.amount).toArrayLike(Buffer)),
        Gas:
            transaction.gas === '0'
                ? new Uint8Array()
                : new Uint8Array(new BN(transaction.gas).toArrayLike(Buffer)),
        type: 1, // staking type
        Payload: new Uint8Array(),
        sig: new Uint8Array(),
    };
}

function buildDelegateTrxProto(transaction: Transaction<Object>): TrxProto {
    return {
        version: isSet(transaction.version) ? Number(transaction.version) : 1,
        time: isSet(transaction.time) ? getNanoSecond(transaction.time) : getNanoSecond(),
        nonce:
            isSet(transaction.nonce) && transaction.nonce
                ? Long.fromValue(transaction.nonce)
                : Long.fromValue(1),
        from: BytesUint8Array.fromHex(transaction.from),
        to: BytesUint8Array.fromHex(transaction.to),
        // proto3 default rule: If the field has default value, the filed should be omitted.
        Amount:
            transaction.amount === '0'
                ? new Uint8Array()
                : new Uint8Array(new BN(transaction.amount).toArrayLike(Buffer)),
        Gas:
            transaction.gas === '0'
                ? new Uint8Array()
                : new Uint8Array(new BN(transaction.gas).toArrayLike(Buffer)),
        type: 2, // staking type
        Payload: new Uint8Array(),
        sig: new Uint8Array(),
    };
}

function buildUnDelegateTrxProto(
    transaction: Transaction<TransactionPayloadUnDelegating>,
): TrxProto {
    const payload = transaction.payload as TransactionPayloadUnDelegating;
    if (!isSet(payload) || !isSet(payload.txhash)) {
        throw Error('mandatory argument is missed');
    }

    const payloadBytes = trxPb.TrxPayloadUnstakingProto.encode({
        txHash: BytesUint8Array.fromHex(payload.txhash),
    }).finish();

    return {
        version: isSet(transaction.version) ? Number(transaction.version) : 1,
        time: isSet(transaction.time) ? getNanoSecond(transaction.time) : getNanoSecond(),
        nonce:
            isSet(transaction.nonce) && transaction.nonce
                ? Long.fromValue(transaction.nonce)
                : Long.fromValue(1),
        from: BytesUint8Array.fromHex(transaction.from),
        to: BytesUint8Array.fromHex(transaction.to),
        Amount:
            transaction.amount === '0'
                ? new Uint8Array()
                : new Uint8Array(new BN(transaction.amount).toArrayLike(Buffer)),
        Gas:
            transaction.gas === '0'
                ? new Uint8Array()
                : new Uint8Array(new BN(transaction.gas).toArrayLike(Buffer)),
        type: 3, // un-staking type
        Payload: payloadBytes,
        sig: new Uint8Array(),
    };
}

function buildContractTrxProto(transaction: Transaction<TrxPayloadCreateContract>): TrxProto {
    const payload = transaction.payload as TrxPayloadCreateContract;
    if (!isSet(payload) || !isSet(payload.data)) {
        throw Error('mandatory argument is missed');
    }
    const payloadBytes = trxPb.TrxPayloadContractProto.encode({
        data: BytesUint8Array.fromHex(payload.data),
    }).finish();

    return {
        version: isSet(transaction.version) ? Number(transaction.version) : 1,
        time: isSet(transaction.time) ? getNanoSecond(transaction.time) : getNanoSecond(),
        nonce:
            isSet(transaction.nonce) && transaction.nonce
                ? Long.fromValue(transaction.nonce)
                : Long.fromValue(1),
        from: BytesUint8Array.fromHex(transaction.from),
        to: BytesUint8Array.fromHex(transaction.to),
        Amount: new Uint8Array(),
        Gas:
            transaction.gas === '0'
                ? new Uint8Array()
                : new Uint8Array(new BN(transaction.gas).toArrayLike(Buffer)),
        type: 6, // contract type
        Payload: payloadBytes,
        sig: new Uint8Array(),
    };
}

function buildProposalTrx(transaction: Transaction<TrxPayloadProposalProto>): TrxProto {
    const payload = transaction.payload as TrxPayloadProposalProto;
    if (!isSet(payload)) {
        throw Error('mandatory argument is missed');
    }
    const payloadBytes = trxPb.TrxPayloadProposalProto.encode({
        message: payload.message,
        startVotingHeight: payload.startVotingHeight,
        votingBlocks: payload.votingBlocks,
        optType: payload.optType,
        options: payload.options,
    }).finish();

    return {
        version: isSet(transaction.version) ? Number(transaction.version) : 1,
        time: isSet(transaction.time) ? getNanoSecond(transaction.time) : getNanoSecond(),
        nonce:
            isSet(transaction.nonce) && transaction.nonce
                ? Long.fromValue(transaction.nonce)
                : Long.fromValue(1),
        from: BytesUint8Array.fromHex(transaction.from),
        to: BytesUint8Array.fromHex(transaction.to),
        Amount: new Uint8Array(),
        Gas:
            transaction.gas === '0'
                ? new Uint8Array()
                : new Uint8Array(new BN(transaction.gas).toArrayLike(Buffer)),
        type: 4, // proposal type
        Payload: payloadBytes,
        sig: new Uint8Array(),
    };
}

function buildVotingTrx(transaction: Transaction<TrxPayloadVotingProto>): TrxProto {
    const payload = transaction.payload as TrxPayloadVotingProto;
    if (!isSet(payload)) {
        throw Error('mandatory argument is missed');
    }
    const payloadBytes = trxPb.TrxPayloadVotingProto.encode({
        txHash: payload.txHash,
        choice: payload.choice,
    }).finish();

    return {
        version: isSet(transaction.version) ? Number(transaction.version) : 1,
        time: isSet(transaction.time) ? getNanoSecond(transaction.time) : getNanoSecond(),
        nonce:
            isSet(transaction.nonce) && transaction.nonce
                ? Long.fromValue(transaction.nonce)
                : Long.fromValue(1),
        from: BytesUint8Array.fromHex(transaction.from),
        to: BytesUint8Array.fromHex(transaction.to),
        Amount: new Uint8Array(),
        Gas:
            transaction.gas === '0'
                ? new Uint8Array()
                : new Uint8Array(new BN(transaction.gas).toArrayLike(Buffer)),
        type: 5, // voting type
        Payload: payloadBytes,
        sig: new Uint8Array(),
    };
}

function signTrxProto(
    trxProto: TrxProto,
    account: RWeb3Account,
): [BytesUint8Array, BytesUint8Array] {
    trxProto.sig = new Uint8Array();

    const buf = TrxProtoUtils.encode(trxProto);
    const txbz = buf.finish();

    trxProto.sig = account.sign(new BytesUint8Array(txbz));

    return [
        new BytesUint8Array(trxProto.sig),
        new BytesUint8Array(TrxProtoUtils.encode(trxProto).finish()),
    ];
}

function signedRawTrxProto(trxProto: TrxProto, account: RWeb3Account): HexString {
    trxProto.sig = new Uint8Array();

    const buf = TrxProtoUtils.encode(trxProto);
    const txbz = buf.finish();

    trxProto.sig = account.sign(new BytesUint8Array(txbz));

    const signedTxByte = new BytesUint8Array(TrxProtoUtils.encode(trxProto).finish());

    return Buffer.from(signedTxByte).toString('base64');
}

function verifyTrxProto(trxProto: TrxProto, account: RWeb3Account): boolean {
    const oriSig = trxProto.sig;
    trxProto.sig = new Uint8Array();

    const buf = TrxProtoUtils.encode(trxProto);
    const tbz = buf.finish();
    const ret = account.pubKey.verify(oriSig, tbz);
    trxProto.sig = oriSig;
    return ret;
}

export const TrxProtoBuilder = {
    decodeTransaction,
    buildTransferTrxProto,
    buildDelegateTrxProto,
    buildUnDelegateTrxProto,
    verifyTrxProto,
    signTrxProto,
    buildContractTrxProto,
    buildProposalTrx,
    buildVotingTrx,
    signedRawTrxProto,
};
