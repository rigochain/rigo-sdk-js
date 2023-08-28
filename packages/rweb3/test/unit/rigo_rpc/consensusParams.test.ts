import { RWeb3 } from '../../../src';
import { getDevServer, getTestWsServer } from '../e2e_utils';
import { ConsensusParamsResponse } from 'rweb3-types';

describe('consensusParams check ', () => {
    let devServerRWeb3Instance: RWeb3;
    let testWebsocketRWeb3Instance: RWeb3;

    beforeAll(() => {
        devServerRWeb3Instance = new RWeb3(getDevServer());
        testWebsocketRWeb3Instance = new RWeb3(getTestWsServer());
    });

    it('should call rweb3 with devServerRWeb3Instance.consensusParams method success return', async () => {
        let consensusParamsResponse: ConsensusParamsResponse =
            await devServerRWeb3Instance.rigo.consensusParams();

        console.log(JSON.stringify(consensusParamsResponse));
    });

    it('should call rweb3 with testWebsocketRWeb3Instance.consensusParams method success return', async () => {
        let testConsensusParamsResponse: ConsensusParamsResponse =
            await testWebsocketRWeb3Instance.rigo.consensusParams();

        console.log(JSON.stringify(testConsensusParamsResponse));
    });

    it('should call rweb3 with testWebsocketRWeb3Instance.consensusParams(10000) method success return', async () => {
        let testConsensusParamsResponse2: ConsensusParamsResponse =
            await testWebsocketRWeb3Instance.rigo.consensusParams(10000);

        console.log(JSON.stringify(testConsensusParamsResponse2));
    });
});
