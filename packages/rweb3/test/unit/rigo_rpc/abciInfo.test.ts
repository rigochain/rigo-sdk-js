import { RWeb3 } from '../../../src';
import { getDevServer, getTestWsServer } from '../e2e_utils';
import { AbciInfoResponse } from 'rweb3-types';

describe('abciInfo check ', () => {
    let testWebsocketRWeb3Instance: RWeb3;

    beforeAll(() => {
        testWebsocketRWeb3Instance = new RWeb3(getTestWsServer());
    });

    it('should call rweb3 with testWebsocketRWeb3Instance.abciInfo method success return', async () => {
        let websocketAbciInfoResponse: AbciInfoResponse =
            await testWebsocketRWeb3Instance.rigo.abciInfo();

        console.log(JSON.stringify(websocketAbciInfoResponse));

        expect(websocketAbciInfoResponse.response.version).toBeDefined();
        expect(websocketAbciInfoResponse.response.app_version).toBeDefined();
        expect(websocketAbciInfoResponse.response.last_block_height).toBeGreaterThan(0);
        expect(websocketAbciInfoResponse.response.last_block_app_hash).toBeDefined();
    });
});
