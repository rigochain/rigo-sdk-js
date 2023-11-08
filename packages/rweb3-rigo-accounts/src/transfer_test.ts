// /*
//     Copyright 2023 All Rigo Chain Developers
//
//     Licensed under the Apache License, Version 2.0 (the "License");
//     you may not use this file except in compliance with the License.
//     You may obtain a copy of the License at
//
//         http://www.apache.org/licenses/LICENSE-2.0
//
//     Unless required by applicable law or agreed to in writing, software
//     distributed under the License is distributed on an "AS IS" BASIS,
//     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//     See the License for the specific language governing permissions and
//     limitations under the License.
// */
// interface Trx {
//     hash?: string;
//     version?: number;
//     time?: Date;
//     nonce?: number;
//     from: string;
//     to: string;
//     amount: string;
//     gas: number;
//     gasPrice?: string;
//     type?: number;
//     payload?: object;
//     sig?: string;
// }
//
// function _buildTransferTrx(obj: Trx): trxPb.TrxProto {
//     return {
//         version: 1,
//         time: getNanoSecond(),
//         nonce: Long.fromValue(obj.nonce),
//         from: Bytes.fromHex(obj.from),
//         to: Bytes.fromHex(obj.to),
//         // proto3 default rule: If the field has default value, the filed should be omitted.
//         Amount: new Uint8Array(new BN(obj.amount).toArrayLike(Buffer)),
//         gas: Long.fromValue(obj.gas),
//         GasPrice: new Uint8Array(new BN(obj.gasPrice).toArrayLike(Buffer)),
//         type: 1, // staking type
//         Payload: new Uint8Array(),
//         sig: new Uint8Array(),
//     }
// }
//
// //import {rlp} from "ethereumjs-util";
// function _encodeTrxProto(trx: trxPb.TrxProto): Buffer {
//     return rlp.encode([
//         trx.version,
//         new BN(trx.time.toString()),
//         trx.nonce.toNumber(),
//         trx.from,
//         trx.to,
//         trx.Amount,
//         trx.gas.toNumber(),
//         trx.GasPrice,
//         trx.type,
//         trx.Payload,
//         trx.sig,
//     ]);
// }
//
// function _signTrx(tx:trxPb.TrxProto, acct:Account): [Bytes, Uint8Array] {
//     const encodedData = _encodeTrxProto(tx);
//
//     const chainId = 'localnet0';
//     const prefix = `\x19RIGO(${chainId}) Signed Message:\n${encodedData.length}`;
//
//     const prefixedData = Buffer.concat([Buffer.from(prefix), encodedData]);
//
//     tx.sig = acct.sign(new Uint8Array(prefixedData));
//     return [new Bytes(tx.sig), new Bytes(trxPb.TrxProto.encode(tx).finish())];
// }
//
// async function rlpTest() {
//     const payableKey =
//         '3D84F8D9C2F5BA90198A8B41C4CEA983ABE96EA577CBE75CA88FAC7F410D9EB8';
//     const payableKeyBytes = Bytes.fromHex(payableKey);
//     const payableAddr = await Account.Import(
//         'payable',
//         '1234',
//         payableKeyBytes,
//         '1234',
//     );
//     await rweb3.syncAccount(payableAddr);
//
//     const tx = _buildTransferTrx({
//         from: '09A889661D41FB116C1A92B97B41E938CCBB8966',
//         to: '5AEBE0DB6BBAC7D2788BB10E5781FEDBFDC2E075',
//         nonce: 0,
//         gas: 100000,
//         gasPrice: '10000000000',
//         amount: '1',
//     });
//
//     _signTrx(tx, payableAddr);
//     const result = await rweb3.broadcastTrxSync(tx);
//     console.log(result);
// }
