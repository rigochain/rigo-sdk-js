import { RWeb3RequestManager } from 'rweb3-core';

import { rigoRpcMethods } from '../../../src/index';
import { testData } from './fixtures/abci_info';
import { getDevServer } from '../e2e_utils';

describe('abciInfo', () => {
    let requestManagerSendSpy: jest.Mock;

    let requestManager: RWeb3RequestManager;

    beforeAll(() => {
        requestManager = new RWeb3RequestManager('http://127.0.0.1:8545');
        requestManagerSendSpy = jest.fn();
        requestManager.send = requestManagerSendSpy;
    });

    it('should call requestManager.send with getAbciInfo method', async () => {
        await rigoRpcMethods.abciInfo(requestManager);

        expect(requestManagerSendSpy).toHaveBeenCalledWith({
            method: 'abci_info',
            params: {},
        });
    });
});

describe('abciInfo develop server call', () => {
    let requestManager: RWeb3RequestManager;

    beforeAll(() => {
        requestManager = new RWeb3RequestManager(getDevServer());
    });

    it.each(testData)('abciInfo should call success return', async (_return) => {
        let returnValue = await rigoRpcMethods.abciInfo(requestManager);
        console.log(JSON.stringify(returnValue));
    });
});
