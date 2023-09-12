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
import { RWeb3, StatusResponse } from '../../../src';
import { getDevWsServer, getTestServer, getTestWsServer } from '../e2e_utils';
import { AbciInfoResponse } from 'rweb3-types';

function sleep(ms: number) {
    return new Promise((r) => setTimeout(r, ms));
}

describe('setProvider check ', () => {
    let rweb3_1: RWeb3;
    let rweb3_2: RWeb3;

    beforeAll(() => {
        rweb3_1 = new RWeb3(getTestWsServer());
        rweb3_2 = new RWeb3(getTestWsServer());
    });

    it('should call rweb3_1 & rweb3_1 call status success ', async () => {
        console.log('rweb3_1', rweb3_1);
        console.log('rweb3_2', rweb3_2);

        const websocketStatusResponse1: StatusResponse = await rweb3_1.rigo.status();
        console.log('websocketStatusResponse1', websocketStatusResponse1);

        const websocketStatusResponse2: StatusResponse = await rweb3_2.rigo.status();
        console.log('websocketStatusResponse2', websocketStatusResponse2);
    });
});
