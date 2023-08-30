import { RWeb3RequestManager } from 'rweb3-core';

import { rigoRpcMethods } from '../../../src/index';

describe('commit', () => {
    let requestManagerSendSpy: jest.Mock;
    let requestManager: RWeb3RequestManager;

    beforeAll(() => {
        requestManager = new RWeb3RequestManager('http://127.0.0.1:8545');
        requestManagerSendSpy = jest.fn();
        requestManager.send = requestManagerSendSpy;
    });

    it('should call requestManager.send with commit method', async () => {
        let height = 1;

        await rigoRpcMethods.commit(requestManager, height);

        // call number 1 of requestManagerSendSpy
        expect(requestManagerSendSpy).toHaveBeenCalledWith({
            method: 'commit',
            params: { height: height.toString(10) },
        });
    });
});
