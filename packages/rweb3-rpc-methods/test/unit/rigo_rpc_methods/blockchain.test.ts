import { RWeb3RequestManager } from 'rweb3-core';

import { rigoRpcMethods } from '../../../src/index';

describe('blockchain', () => {
    let requestManagerSendSpy: jest.Mock;

    let requestManager: RWeb3RequestManager;

    beforeAll(() => {
        requestManager = new RWeb3RequestManager('http://127.0.0.1:8545');
        requestManagerSendSpy = jest.fn();
        requestManager.send = requestManagerSendSpy;
    });

    it('should call requestManager.send with blockchain method', async () => {
        let minHeight = 1234;
        let maxHeight = 1234;

        await rigoRpcMethods.blockchain(requestManager, minHeight, maxHeight);

        expect(requestManagerSendSpy).toHaveBeenCalledWith({
            method: 'blockchain',
            params: {
                minHeight: minHeight.toString(10),
                maxHeight: maxHeight.toString(10),
            },
        });
    });
});
