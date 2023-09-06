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
import { getDevWsServer } from '../e2e_utils';
import WebsocketProvider from '../../../src/index';
import { JsonRpcRequest } from 'rweb3-types';
import { uuidV4 } from 'rweb3-utils';
export function createJsonRpcRequest(method: string, params?: {}): JsonRpcRequest<any> {
    const paramsCopy = params ? { ...params } : {};
    return {
        jsonrpc: '2.0',
        id: uuidV4(),
        method: method,
        params: paramsCopy,
    };
}

describe('WebsocketClient', () => {
    it('can make a simple call', async () => {
        const provider = new WebsocketProvider(getDevWsServer());
        console.log(provider);

        const healthResponse = await provider.request(createJsonRpcRequest('status'));

        console.log('healthResponse', healthResponse);

        const healthResponse2 = await provider.execute(createJsonRpcRequest('health'));
        expect(healthResponse2.result).toEqual({});

        const statusResponse = await provider.execute(createJsonRpcRequest('status'));
        expect(statusResponse.result).toBeTruthy();
    });
});
