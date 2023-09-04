import { RWeb3 } from '../../../src';
import { getTestWsServer } from '../e2e_utils';
import { DumpConsensusStateResponse } from 'rweb3-types';

describe('dumpConsensusState check ', () => {
    let testWebsocketRWeb3Instance: RWeb3;

    beforeAll(() => {
        testWebsocketRWeb3Instance = new RWeb3(getTestWsServer());
    });

    it('should call rweb3 with testWebsocketRWeb3Instance.dumpConsensusState method success return', async () => {
        let testdumpConsensusStateResponse: DumpConsensusStateResponse =
            await testWebsocketRWeb3Instance.rigo.dumpConsensusState();

        console.log(JSON.stringify(testdumpConsensusStateResponse));
    });
});
