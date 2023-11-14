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
import { StakesResponse } from '@rigochain/rweb3-types';

describe('stakes check ', () => {
    let testWebsocketRWeb3Instance: RWeb3;

    beforeAll(() => {
        testWebsocketRWeb3Instance = new RWeb3(getTestWsServer());
    });
    it('should call rweb3 with testWebsocketRWeb3Instance.stakes method success return', async () => {
        const testStakeResponse: StakesResponse = await testWebsocketRWeb3Instance.rigo.stakes(
            '1594b3a79f75a81f0181dd6d113a95dca419e7ec',
        );
        expect(testStakeResponse.key).toEqual('1594B3A79F75A81F0181DD6D113A95DCA419E7EC');
        expect(testStakeResponse.value).toBeDefined();
    });
});
