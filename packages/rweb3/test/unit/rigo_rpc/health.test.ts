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
import { getTestServer } from '../e2e_utils';

describe('health check ', () => {
    let testServerRWeb3Instance: RWeb3;

    beforeAll(() => {
        testServerRWeb3Instance = new RWeb3(getTestServer());
    });

    it('should call rweb3 with testServerRWeb3Instance.getHealth method success return', async () => {
        const healthResponse = await testServerRWeb3Instance.rigo.health();
        // eslint-disable-next-line no-null/no-null
        expect(healthResponse).toEqual(null);
    });
});
