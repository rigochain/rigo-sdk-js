import { RWeb3RequestManager } from 'rweb3-core';

import { rigoRpcMethods } from '../../../src/index';

describe('unconfirmedTxs', () => {
    let requestManagerSendSpy: jest.Mock;
    let requestManager: RWeb3RequestManager;

    beforeAll(() => {
        requestManager = new RWeb3RequestManager('http://127.0.0.1:8545');
        requestManagerSendSpy = jest.fn();
        requestManager.send = requestManagerSendSpy;
    });

    it('should call requestManager.send with unconfirmedTxs method', async () => {
        let limit = 5;

        await rigoRpcMethods.unconfirmedTxs(requestManager, limit);

        expect(requestManagerSendSpy).toHaveBeenCalledWith({
            method: 'unconfirmed_txs',
            params: {
                limit: limit.toString(10),
            },
        });
    });
});
