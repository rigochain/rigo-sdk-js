import { RWeb3 } from '../../../src';
import { getDevServer, getTestWsServer } from '../e2e_utils';
import { CommitResponse } from 'rweb3-types';

describe('commit check ', () => {
    let devServerRWeb3Instance: RWeb3;
    let testWebsocketRWeb3Instance: RWeb3;

    beforeAll(() => {
        devServerRWeb3Instance = new RWeb3(getDevServer());
        testWebsocketRWeb3Instance = new RWeb3(getTestWsServer());
    });

    it('should call rweb3 with devServerRWeb3Instance.commit method success return', async () => {
        let commitResponse: CommitResponse = await devServerRWeb3Instance.rigo.commit();

        console.log(JSON.stringify(commitResponse));
    });

    it('should call rweb3 with testWebsocketRWeb3Instance.commit method success return', async () => {
        let testCommitResponse: CommitResponse = await testWebsocketRWeb3Instance.rigo.commit(
            10000,
        );

        console.log(JSON.stringify(testCommitResponse));
    });
});
