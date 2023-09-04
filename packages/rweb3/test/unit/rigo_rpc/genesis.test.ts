import { RWeb3 } from '../../../src';
import { getTestWsServer } from '../e2e_utils';
import { GenesisResponse } from 'rweb3-types';

describe('genesis check ', () => {
    let testWebsocketRWeb3Instance: RWeb3;

    beforeAll(() => {
        testWebsocketRWeb3Instance = new RWeb3(getTestWsServer());
    });

    it('should call rweb3 with testWebsocketRWeb3Instance.genesis method success return', async () => {
        let testWebsocketGenesisResponse: GenesisResponse =
            await testWebsocketRWeb3Instance.rigo.genesis();

        console.log(testWebsocketGenesisResponse);
    });
});
