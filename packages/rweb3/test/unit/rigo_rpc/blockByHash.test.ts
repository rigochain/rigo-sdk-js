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
import { BlockResponse } from '@rigochain/rweb3-types';

describe('blockByHash check ', () => {
    let testWebsocketRWeb3Instance: RWeb3;

    beforeAll(() => {
        testWebsocketRWeb3Instance = new RWeb3(getTestWsServer());
    });

    it('should call rweb3 with testWebsocketRWeb3Instance.blockByHash(faa65d261087ff3cf3cbb530dad7d7cb8c2a60bad968bc0c6d4e6b8632efbc3e) method success return', async () => {
        const testBlockResponse: BlockResponse = await testWebsocketRWeb3Instance.rigo.blockByHash(
            'faa65d261087ff3cf3cbb530dad7d7cb8c2a60bad968bc0c6d4e6b8632efbc3e',
        );
        expect(testBlockResponse.block.header.height == 82367).toBe(true);
    });
});
