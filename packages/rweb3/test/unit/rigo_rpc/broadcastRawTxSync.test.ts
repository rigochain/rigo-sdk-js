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
import { BroadcastTxCommitResponse, RWeb3 } from '../../../src';
import { getTestAccountPrivateKey, getTestWsServer } from '../e2e_utils';
import { privateKeyToAccount, RWeb3Account, TrxProtoBuilder } from '@rigochain/rweb3-rigo-accounts';
import { AccountResponse, BroadcastTxSyncResponse } from '@rigochain/rweb3-types';

describe('broadcastTxSync check ', () => {
    let testWebsocketRWeb3Instance: RWeb3;

    beforeAll(() => {
        testWebsocketRWeb3Instance = new RWeb3(getTestWsServer());
    });

    it('should call rweb3 with testWebsocketRWeb3Instance.broadcastTxSync() method success return', async () => {
        const secretKey = getTestAccountPrivateKey();
        const rweb3Account = privateKeyToAccount(secretKey) as RWeb3Account;
        const accountResponse: AccountResponse = await testWebsocketRWeb3Instance.rigo.getAccount(
            rweb3Account.address,
        );
        expect(Number(accountResponse.value.balance)).toBeGreaterThan(0);

        const tx = TrxProtoBuilder.buildTransferTrxProto({
            from: rweb3Account.address,
            nonce: accountResponse.value.nonce,
            to: rweb3Account.address,
            amount: '1',
            gas: 4000,
            gasPrice: '250000000000',
        });

        const { rawTransaction } = rweb3Account.signTransaction(tx, 'testnet');

        const broadcastTxCommitResponse: BroadcastTxSyncResponse =
            await testWebsocketRWeb3Instance.rigo.broadcastRawTxSync(rawTransaction);
        expect(broadcastTxCommitResponse.hash).toBeDefined();
    });
});
