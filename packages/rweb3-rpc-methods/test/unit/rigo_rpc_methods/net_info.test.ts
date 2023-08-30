import { RWeb3RequestManager } from 'rweb3-core';

import { rigoRpcMethods } from '../../../src/index';

describe('netInfo', () => {
    let requestManagerSendSpy: jest.Mock;
    let requestManager: RWeb3RequestManager;

    beforeAll(() => {
        requestManager = new RWeb3RequestManager('http://127.0.0.1:8545');
        requestManagerSendSpy = jest.fn();
        requestManager.send = requestManagerSendSpy;
    });

    it('should call requestManager.send with netInfo method', async () => {
        await rigoRpcMethods.netInfo(requestManager);

        expect(requestManagerSendSpy).toHaveBeenCalledWith({
            method: 'net_info',
            params: {},
        });
    });
});
