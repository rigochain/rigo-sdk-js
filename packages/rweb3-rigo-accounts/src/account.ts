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
import { RWeb3Account, SignTransactionResult } from './types.js';
import { PrvKey, PubKey } from './tx/tx_types.js';
import { HexString, TrxProto, BytesUint8Array } from '@rigo/rweb3-types';
import { sha3Raw } from '@rigo/rweb3-utils';
import { TrxProtoUtils } from './tx/trx_pb.js';

export const create = (): RWeb3Account => {
    const prvKey = new PrvKey();
    return prvKeyToAccount(prvKey);
};

export const privateKeyToAccount = (privateKey: HexString | ArrayBufferLike): RWeb3Account => {
    const prvKey = PrvKey.import(privateKey);
    return prvKeyToAccount(prvKey);
};

export const privateKeyToPrvKey = (privateKey: HexString | ArrayBufferLike): PrvKey => {
    return PrvKey.import(privateKey);
};

export const prvKeyToAccount = (prvKey: PrvKey): RWeb3Account => {
    const pubKey = new PubKey(prvKey);

    return {
        address: pubKey.toAddress().toHex(),
        prvKey: prvKey,
        pubKey: pubKey,
        privateKey: prvKey.export().toHex(),
        sign: (msg: Uint8Array) => sign(msg, prvKey.export().toHex()),
        signTransaction: (trxProto: TrxProto) => signTransaction(trxProto, prvKey.export().toHex()),
    };
};

export const sign = (msg: Uint8Array, privateKey: HexString | ArrayBufferLike): BytesUint8Array => {
    const signObj = privateKeyToPrvKey(privateKey).sign(msg);
    return new BytesUint8Array([...signObj.signature, signObj.recid & 0xff]);
};

export const signTransaction = (
    trxProto: TrxProto,
    privateKey: HexString,
    // To make it compatible with rest of the API, have to keep it async
    // eslint-disable-next-line @typescript-eslint/require-await
): SignTransactionResult => {
    trxProto.sig = new Uint8Array();

    const buf = TrxProtoUtils.encode(trxProto);
    const tbz = buf.finish();

    trxProto.sig = sign(new BytesUint8Array(tbz), privateKey);

    const signedTxByte = new BytesUint8Array(TrxProtoUtils.encode(trxProto).finish());

    const rawTransaction = Buffer.from(signedTxByte).toString('base64');

    // TODO : 이건 검증 필요함. Node 에서 Transaction 생성을 다른 방법 으로 할 수도 있음.
    const transactionHash = sha3Raw(rawTransaction);

    return {
        rawTransaction: rawTransaction,
        transactionHash: transactionHash,
    };
};
