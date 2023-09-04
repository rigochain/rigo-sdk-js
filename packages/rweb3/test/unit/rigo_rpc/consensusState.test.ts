import { RWeb3 } from '../../../src';
import { getTestWsServer } from '../e2e_utils';
import { ConsensusStateResponse } from 'rweb3-types';

describe('consensusState check ', () => {
    let testWebsocketRWeb3Instance: RWeb3;

    beforeAll(() => {
        testWebsocketRWeb3Instance = new RWeb3(getTestWsServer());
    });

    it('should call rweb3 with testWebsocketRWeb3Instance.consensusState method success return', async () => {
        let testConsensusStateResponse: ConsensusStateResponse =
            await testWebsocketRWeb3Instance.rigo.consensusState();

        console.log(JSON.stringify(testConsensusStateResponse));
    });
});
