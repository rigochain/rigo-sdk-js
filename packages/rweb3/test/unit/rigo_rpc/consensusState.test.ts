import { RWeb3 } from '../../../src';
import { getDevServer, getTestWsServer } from '../e2e_utils';
import { ConsensusStateResponse } from 'rweb3-types';

describe('consensusState check ', () => {
    let devServerRWeb3Instance: RWeb3;
    let testWebsocketRWeb3Instance: RWeb3;

    beforeAll(() => {
        devServerRWeb3Instance = new RWeb3(getDevServer());
        testWebsocketRWeb3Instance = new RWeb3(getTestWsServer());
    });

    it('should call rweb3 with devServerRWeb3Instance.consensusState method success return', async () => {
        let consensusStateResponse: ConsensusStateResponse =
            await devServerRWeb3Instance.rigo.consensusState();

        console.log(JSON.stringify(consensusStateResponse));
    });

    it('should call rweb3 with testWebsocketRWeb3Instance.consensusState method success return', async () => {
        let testConsensusStateResponse: ConsensusStateResponse =
            await testWebsocketRWeb3Instance.rigo.consensusState();

        console.log(JSON.stringify(testConsensusStateResponse));
    });
});
