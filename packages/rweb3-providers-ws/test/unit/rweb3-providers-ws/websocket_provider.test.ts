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
