import { RWeb3 } from '../../../src';
import { getDevServer, getTestWsServer } from '../e2e_utils';
import { GenesisResponse } from 'rweb3-types';

describe('genesis check ', () => {
    let devServerRWeb3Instance: RWeb3;
    let testWebsocketRWeb3Instance: RWeb3;

    beforeAll(() => {
        devServerRWeb3Instance = new RWeb3(getDevServer());
        testWebsocketRWeb3Instance = new RWeb3(getTestWsServer());
    });

    it('should call rweb3 with devServerRWeb3Instance.genesis method success return', async () => {
        let genesisResponse: GenesisResponse = await devServerRWeb3Instance.rigo.genesis();
        console.log(JSON.stringify(genesisResponse));
    });

    it('should call rweb3 with testWebsocketRWeb3Instance.genesis method success return', async () => {
        let testWebsocketGenesisResponse: GenesisResponse =
            await testWebsocketRWeb3Instance.rigo.genesis();

        console.log(testWebsocketGenesisResponse);
    });
});
