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
import {
    getTestAccountAddress,
    getTestAccountPrivateKey,
    getTestProposalAccountPrivateKey,
    getTestWsServer,
} from '../e2e_utils';
import * as fs from 'fs';
import { privateKeyToAccount, RWeb3Account, TrxProtoBuilder } from '@rigochain/rweb3-rigo-accounts';
import { hexToBytes } from '@rigochain/rweb3-utils';

describe('rweb3.rigo.account check ', () => {
    let notSetProviderRweb3: RWeb3;

    beforeAll(() => {
        notSetProviderRweb3 = new RWeb3();
    });

    it('should call rweb3 with erc20 transfer method success return', async () => {
        let rweb3Account = notSetProviderRweb3.rigo.accounts.create();

        console.log(rweb3Account);

        expect(rweb3Account.address.length > 0).toBeTruthy();

        let testAccount = notSetProviderRweb3.rigo.accounts.privateKeyToAccount(
            getTestAccountPrivateKey(),
        );

        expect(testAccount.address === getTestAccountAddress()).toBeTruthy();
    });
});
