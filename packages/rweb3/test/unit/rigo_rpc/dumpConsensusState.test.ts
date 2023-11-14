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
import { DumpConsensusStateResponse } from '@rigochain/rweb3-types';

describe('dumpConsensusState check ', () => {
    let testWebsocketRWeb3Instance: RWeb3;

    beforeAll(() => {
        testWebsocketRWeb3Instance = new RWeb3(getTestWsServer());
    });

    it('should call rweb3 with testWebsocketRWeb3Instance.dumpConsensusState method success return', async () => {
        const testdumpConsensusStateResponse: DumpConsensusStateResponse =
            await testWebsocketRWeb3Instance.rigo.dumpConsensusState();
        expect(testdumpConsensusStateResponse.round_state.height).toBeDefined();
        expect(testdumpConsensusStateResponse.round_state.round).toBeDefined();
    });
});
