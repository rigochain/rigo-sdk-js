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
import tokenJson from '../../fixtures/erc20-contract.json';

describe('contract test', () => {
    let rweb3: RWeb3;

    beforeAll(() => {
        rweb3 = new RWeb3(getTestWsServer());
    });

    it('deploy', async () => {
        const account = privateKeyToAccount(getTestProposalAccountPrivateKey()) as RWeb3Account;
        const nonce = (await rweb3.rigo.getAccount(account.address)).value.nonce;
        const contract = new rweb3.rigo.Contract(tokenJson.abi);
        const result = await contract
            .deploy(tokenJson.bytecode, ['TEST', 'TST'], account, 'testnet0', 10000000)
            .send();
        console.log(result);
    });
});
