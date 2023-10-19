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
import { getTestProposalAccountPrivateKey, getTestWsServer } from '../e2e_utils';
import { privateKeyToAccount, RWeb3Account, TrxProtoBuilder } from '@rigochain/rweb3-rigo-accounts';

describe('staking test', () => {
    let rweb3: RWeb3;

    beforeAll(() => {
        rweb3 = new RWeb3(getTestWsServer());
    });

    it('staking', async () => {
        const account = privateKeyToAccount(getTestProposalAccountPrivateKey()) as RWeb3Account;
        const nonce = (await rweb3.rigo.getAccount(account.address)).value.nonce;
        const tx = TrxProtoBuilder.buildDelegateTrxProto({
            nonce: nonce,
            from: account.address,
            to: 'fde6b792498effa9095694d722a6fc629a060b11',
            amount: '1000000000000000000',
            gas: 1000000,
            gasPrice: '250000000000',
        });
        TrxProtoBuilder.signTrxProto(tx, account, 'testnet0');
        const result = await rweb3.rigo.broadcastTxCommit(tx);
        console.log(result);
    });
});
