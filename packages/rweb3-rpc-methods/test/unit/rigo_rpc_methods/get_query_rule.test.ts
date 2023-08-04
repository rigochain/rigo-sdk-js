import {RWeb3RequestManager} from 'rweb3-core';

import {rigoRpcMethods} from '../../../src/index';

describe('queryRule', () => {

    let requestManagerSendSpy: jest.Mock;
    let requestManager: RWeb3RequestManager;

    beforeAll(() => {
        requestManager = new RWeb3RequestManager('http://127.0.0.1:8545');
        requestManagerSendSpy = jest.fn();
        requestManager.send = requestManagerSendSpy;
    });

    it('should call requestManager.send with queryRule method', async () => {

        await rigoRpcMethods.queryRule(requestManager);

        expect(requestManagerSendSpy).toHaveBeenCalledWith({
            method: 'rule',
            params: {},
        });
    });
});