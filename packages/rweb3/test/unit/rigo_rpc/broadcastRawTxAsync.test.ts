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
import { privateKeyToAccount, TrxProtoBuilder } from '@rigochain/rweb3-rigo-accounts';
import { AccountResponse, BroadcastTxAsyncResponse } from '@rigochain/rweb3-types';

describe('broadcastTxAsync check ', () => {
    let testWebsocketRWeb3Instance: RWeb3;

    beforeAll(() => {
        testWebsocketRWeb3Instance = new RWeb3(getTestWsServer());
    });

    it('should call rweb3 with testWebsocketRWeb3Instance.broadcastTxAsync() method success return', async () => {
        const secretKey = getTestAccountPrivateKey();

        const rWeb3Account = privateKeyToAccount(secretKey);

        const accountResponse: AccountResponse = await testWebsocketRWeb3Instance.rigo.account(
            rWeb3Account.address,
        );

        rWeb3Account.balance = accountResponse.value.balance;

        console.log('address acct.balance', rWeb3Account.balance);
        console.log('address acct.nonce', rWeb3Account.nonce);

        //
        // build a tx.
        const tx = TrxProtoBuilder.buildTransferTrxProto({
            from: rWeb3Account.address,
            nonce: accountResponse.value.nonce,
            to: '6fff13a50450039c943c9987fa43cef0d7421904',
            amount: '1000000000000000',
            gas: '1000000000000000',
        });

        // signed the tx.
        const signedTx = TrxProtoBuilder.signedRawTrxProto(tx, rWeb3Account);

        const broadcastTxAsyncResponse: BroadcastTxAsyncResponse =
            await testWebsocketRWeb3Instance.rigo.broadcastRawTxAsync(signedTx);

        console.log(JSON.stringify(broadcastTxAsyncResponse));
    });
});
