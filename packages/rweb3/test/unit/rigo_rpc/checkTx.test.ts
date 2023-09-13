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
import { getTestAccountPrivateKey, getTestWsServer } from '../e2e_utils';
import { privateKeyToAccount, RWeb3Account, TrxProtoBuilder } from '@rigo/rweb3-rigo-accounts';
import { AccountResponse, CheckTxResponse } from '@rigo/rweb3-types';

describe('checkTx check ', () => {
    let testWebsocketRWeb3Instance: RWeb3;

    beforeAll(() => {
        testWebsocketRWeb3Instance = new RWeb3(getTestWsServer());
    });

    it('should call rweb3 with testWebsocketRWeb3Instance.checkTx() method success return', async () => {
        const secretKey = getTestAccountPrivateKey();

        const acct = privateKeyToAccount(secretKey) as RWeb3Account;

        console.log('acct', acct);

        const accountResponse: AccountResponse = await testWebsocketRWeb3Instance.rigo.account(
            acct.address,
        );

        acct.balance = accountResponse.value.balance;
        acct.nonce = accountResponse.value.nonce;

        console.log(acct.balance);
        console.log(acct.nonce);

        console.log('address 2', acct);

        //
        // build a tx.
        const tx = TrxProtoBuilder.buildTransferTrxProto({
            from: acct.address,
            nonce: accountResponse.value.nonce,
            to: '6fff13a50450039c943c9987fa43cef0d7421904',
            amount: '1000000000000000',
            gas: '1000000000000000',
        });

        // sign the tx.
        const [sig, signedTx] = TrxProtoBuilder.signTrxProto(tx, acct);
        tx.sig = sig;

        console.log('signedTx', signedTx);

        console.log('nonce', tx.nonce);

        const testCheckTxResponse: CheckTxResponse = await testWebsocketRWeb3Instance.rigo.checkTx(
            tx,
        );

        console.log(JSON.stringify(testCheckTxResponse));

        // let broadcastTxCommitResponse: BroadcastTxCommitResponse =
        //     await testWebsocketRWeb3Instance.rigo.broadcastTxCommit(tx);
        //
        // console.log(JSON.stringify(broadcastTxCommitResponse));
    });
});
