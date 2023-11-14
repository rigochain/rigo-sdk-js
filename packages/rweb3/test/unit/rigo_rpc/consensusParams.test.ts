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
import { ConsensusParamsResponse } from '@rigochain/rweb3-types';

describe('consensusParams check ', () => {
    let testWebsocketRWeb3Instance: RWeb3;

    beforeAll(() => {
        testWebsocketRWeb3Instance = new RWeb3(getTestWsServer());
    });

    it('should call rweb3 with testWebsocketRWeb3Instance.consensusParams method success return', async () => {
        const testConsensusParamsResponse: ConsensusParamsResponse =
            await testWebsocketRWeb3Instance.rigo.consensusParams();
        expect(testConsensusParamsResponse.block_height).toBeDefined();
        expect(testConsensusParamsResponse.consensus_params).toBeDefined();
    });

    it('should call rweb3 with testWebsocketRWeb3Instance.consensusParams(10000) method success return', async () => {
        const testConsensusParamsResponse2: ConsensusParamsResponse =
            await testWebsocketRWeb3Instance.rigo.consensusParams(10000);
        expect(testConsensusParamsResponse2.block_height).toBeDefined();
        expect(testConsensusParamsResponse2.consensus_params).toBeDefined();
    });
});
