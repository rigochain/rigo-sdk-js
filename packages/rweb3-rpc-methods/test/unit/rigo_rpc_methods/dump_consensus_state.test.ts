import { RWeb3RequestManager } from 'rweb3-core';

import { rigoRpcMethods } from '../../../src/index';

describe('dumpConsensusState', () => {
    let requestManagerSendSpy: jest.Mock;
    let requestManager: RWeb3RequestManager;

    beforeAll(() => {
        requestManager = new RWeb3RequestManager('http://127.0.0.1:8545');
        requestManagerSendSpy = jest.fn();
        requestManager.send = requestManagerSendSpy;
    });

    it('should call requestManager.send with dumpConsensusState method', async () => {
        await rigoRpcMethods.dumpConsensusState(requestManager);

        expect(requestManagerSendSpy).toHaveBeenCalledWith({
            method: 'dump_consensus_state',
            params: {},
        });
    });
});
