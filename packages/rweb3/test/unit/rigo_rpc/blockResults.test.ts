import { RWeb3 } from '../../../src';
import { getDevServer, getTestWsServer } from '../e2e_utils';
import { BlockResultsResponse } from 'rweb3-types';

describe('blockResults check ', () => {
    let devServerRWeb3Instance: RWeb3;
    let testWebsocketRWeb3Instance: RWeb3;

    beforeAll(() => {
        devServerRWeb3Instance = new RWeb3(getDevServer());
        testWebsocketRWeb3Instance = new RWeb3(getTestWsServer());
    });

    it('should call rweb3 with devServerRWeb3Instance.blockResults method success return', async () => {
        let devBlockResultsResponse: BlockResultsResponse =
            await devServerRWeb3Instance.rigo.blockResults(602494);

        console.log(JSON.stringify(devBlockResultsResponse));
    });

    it('should call rweb3 with testWebsocketRWeb3Instance.blockResults(AA04B4AAE915679B72CBB6A3BA83078F6120E9035A1634A7DBD3BD2A29A573F9) method success return', async () => {
        let testBlockResultsResponse: BlockResultsResponse =
            await testWebsocketRWeb3Instance.rigo.blockResults(10000);

        console.log(JSON.stringify(testBlockResultsResponse));
    });
});
