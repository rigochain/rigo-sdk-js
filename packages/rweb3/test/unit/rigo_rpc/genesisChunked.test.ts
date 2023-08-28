import { RWeb3 } from '../../../src';
import { getDevServer, getTestWsServer } from '../e2e_utils';
import { GenesisChunkedResponse } from 'rweb3-types';

describe('genesisChunked check ', () => {
    let devServerRWeb3Instance: RWeb3;
    let testWebsocketRWeb3Instance: RWeb3;

    beforeAll(() => {
        devServerRWeb3Instance = new RWeb3(getDevServer());
        testWebsocketRWeb3Instance = new RWeb3(getTestWsServer());
    });

    it('should call rweb3 with devServerRWeb3Instance.genesisChunked method success return', async () => {
        let genesisChunkedResponse: GenesisChunkedResponse =
            await devServerRWeb3Instance.rigo.genesisChunked(0);
        console.log(JSON.stringify(genesisChunkedResponse));
    });

    it('should call rweb3 with testWebsocketRWeb3Instance.genesisChunked method success return', async () => {
        let testWebsocketGenesisChunkedResponse: GenesisChunkedResponse =
            await testWebsocketRWeb3Instance.rigo.genesisChunked(0);

        console.log(testWebsocketGenesisChunkedResponse);
    });
});
