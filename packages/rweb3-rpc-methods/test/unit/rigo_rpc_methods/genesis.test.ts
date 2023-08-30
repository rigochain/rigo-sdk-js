import { RWeb3RequestManager } from 'rweb3-core';

import { rigoRpcMethods } from '../../../src/index';
describe('genesis', () => {
    let requestManagerSendSpy: jest.Mock;
    let requestManager: RWeb3RequestManager;

    beforeAll(() => {
        requestManager = new RWeb3RequestManager('http://127.0.0.1:8545');
        requestManagerSendSpy = jest.fn();
        requestManager.send = requestManagerSendSpy;
    });

    it('should call requestManager.send with genesis method', async () => {
        await rigoRpcMethods.genesis(requestManager);

        expect(requestManagerSendSpy).toHaveBeenCalledWith({
            method: 'genesis',
            params: {},
        });
    });
});
