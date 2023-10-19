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
import { getTestWsServer } from '../e2e_utils';
import { BytesUint8Array } from '@rigochain/rweb3-types';
import { TrxProtoBuilder } from '@rigochain/rweb3-rigo-accounts';

describe('builder test', () => {
    let rweb3: RWeb3;

    beforeAll(() => {
        rweb3 = new RWeb3(getTestWsServer());
    });

    it('decode transaction', async () => {
        const tx = '0xA257AEBA03663601C50EC71DC656D95B7BEB96DD38AC7AF814B2466A89919D2F';
        const txResult = await rweb3.rigo.tx(tx);
        const bytes = BytesUint8Array.b64ToBytes(txResult.tx);
        const result = TrxProtoBuilder.decodeTransaction(bytes);
        console.log(result);
    });
});
