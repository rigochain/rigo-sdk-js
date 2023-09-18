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
import { RWeb3 } from '../../../src';
import { getDevWsServer, getTestProposalAccountPrivateKey, getTestWsServer } from '../e2e_utils';
import { privateKeyToAccount, RWeb3Account, TrxProtoBuilder } from '@rigochain/rweb3-rigo-accounts';
import { AccountResponse, BroadcastTxAsyncResponse } from '@rigochain/rweb3-types';

describe('broadcastTxAsync check ', () => {
    let testWebsocketRWeb3Instance: RWeb3;

    beforeAll(() => {
        testWebsocketRWeb3Instance = new RWeb3(getDevWsServer());
    });

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

    it('should call rweb3 with testWebsocketRWeb3Instance.broadcastTxAsync() method success return', async () => {
        // TODO 이억기 : 여기 신규 계정 PK 셋팅
        const secretKey = getTestProposalAccountPrivateKey();

        const acct = privateKeyToAccount(secretKey) as RWeb3Account;

        const accountResponse: AccountResponse = await testWebsocketRWeb3Instance.rigo.getAccount(
            acct.address,
        );

        acct.balance = accountResponse.value.balance;

        console.log('address acct.balance', acct.balance);
        console.log('address acct.nonce', acct.nonce);

        //
        // build a tx.
        const tx = TrxProtoBuilder.buildTransferTrxProto({
            from: acct.address,
            nonce: accountResponse.value.nonce,
            to: '6fff13a50450039c943c9987fa43cef0d7421904',
            amount: '1000000000000000',
            gas: 100000,
            gasPrice: '10000000000',
        });

        // sign the tx.
        const [sig, signedTx] = TrxProtoBuilder.signTrxProto(tx, acct);
        tx.sig = sig;

        console.log('signedTx', signedTx);

        console.log('nonce', tx.nonce);

        const broadcastTxAsyncResponse: BroadcastTxAsyncResponse =
            await testWebsocketRWeb3Instance.rigo.broadcastTxAsync(tx);

        console.log(JSON.stringify(broadcastTxAsyncResponse));
    });
});
