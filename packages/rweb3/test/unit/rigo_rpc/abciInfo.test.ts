import { RWeb3 } from '../../../src';
import { getDevServer, getTestWsServer } from '../e2e_utils';
import { AbciInfoResponse } from 'rweb3-types';

describe('abciInfo check ', () => {
    let devServerRWeb3Instance: RWeb3;
    let testWebsocketRWeb3Instance: RWeb3;

    beforeAll(() => {
        devServerRWeb3Instance = new RWeb3(getDevServer());
        testWebsocketRWeb3Instance = new RWeb3(getTestWsServer());
    });

    it('should call rweb3 with devServerRWeb3Instance.abciInfo method success return', async () => {
        let abciInfoResponse: AbciInfoResponse = await devServerRWeb3Instance.rigo.abciInfo();

        console.log(JSON.stringify(abciInfoResponse));

        // TODO : RESPONSE 형 변환 필요해 보임.
        expect(Number(abciInfoResponse.response.last_block_height)).toBeGreaterThan(0);
    });

    it('should call rweb3 with testWebsocketRWeb3Instance.abciInfo method success return', async () => {
        let websocketAbciInfoResponse: AbciInfoResponse =
            await testWebsocketRWeb3Instance.rigo.abciInfo();
        console.log(JSON.stringify(websocketAbciInfoResponse));
    });
});
