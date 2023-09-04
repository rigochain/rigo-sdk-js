import { RWeb3 } from '../../../src';
import { getTestWsServer } from '../e2e_utils';
import { CommitResponse } from 'rweb3-types';

describe('commit check ', () => {
    let testWebsocketRWeb3Instance: RWeb3;

    beforeAll(() => {
        testWebsocketRWeb3Instance = new RWeb3(getTestWsServer());
    });

    it('should call rweb3 with testWebsocketRWeb3Instance.commit method success return', async () => {
        let testCommitResponse: CommitResponse = await testWebsocketRWeb3Instance.rigo.commit(
            10000,
        );

        console.log(JSON.stringify(testCommitResponse));
    });
});
