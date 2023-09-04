import { RWeb3 } from '../../../src';
import { getTestWsServer } from '../e2e_utils';
import { GenesisChunkedResponse } from 'rweb3-types';

describe('genesisChunked check ', () => {
    let testWebsocketRWeb3Instance: RWeb3;

    beforeAll(() => {
        testWebsocketRWeb3Instance = new RWeb3(getTestWsServer());
    });

    it('should call rweb3 with testWebsocketRWeb3Instance.genesisChunked method success return', async () => {
        let testWebsocketGenesisChunkedResponse: GenesisChunkedResponse =
            await testWebsocketRWeb3Instance.rigo.genesisChunked(0);

        console.log(testWebsocketGenesisChunkedResponse);
    });
});
