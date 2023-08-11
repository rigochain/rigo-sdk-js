import {RWeb3RequestManager} from 'rweb3-core';

import {rigoRpcMethods} from '../../../src/index';

describe('broadcastEvidence', () => {

    let requestManagerSendSpy: jest.Mock;
    let requestManager: RWeb3RequestManager;

    beforeAll(() => {
        requestManager = new RWeb3RequestManager('http://127.0.0.1:8545');
        requestManagerSendSpy = jest.fn();
        requestManager.send = requestManagerSendSpy;
    });

    it('should call requestManager.send with broadcastEvidence method', async () => {

        let evidence = "JSON_EVIDENCE_encoded";

        await rigoRpcMethods.broadcastEvidence(requestManager, evidence);

        expect(requestManagerSendSpy).toHaveBeenCalledWith({
            method: 'broadcast_evidence',
            params: {evidence: evidence},
        });
    });
});

