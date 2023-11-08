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
import tokenJson from '../../fixtures/erc20-contract.json';
import { Contract } from '@rigochain/rweb3-rigo-contract';

describe('contractAddrFromTx check ', () => {
    let rweb3: RWeb3;

    beforeAll(() => {
        rweb3 = new RWeb3(getTestWsServer());
    });

    it('Check return value of contractAddrFromTx call', async () => {
        const contractAddr: string = await rweb3.rigo.contractAddrFromTx(
            'A29CE7BEEE8B09E3C59A85BBC9CF90E3F066ADAF485FACBBFB3C538FF32A7098',
        );

        expect(contractAddr).toBe('0xa0ee488fe69273b40985c52ac5a6e91034eb61cd');
    });
});
