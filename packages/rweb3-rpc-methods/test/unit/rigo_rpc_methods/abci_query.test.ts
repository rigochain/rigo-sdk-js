import { RWeb3RequestManager } from 'rweb3-core';

import { rigoRpcMethods } from '../../../src/index';

describe('abciQuery', () => {
    let requestManagerSendSpy: jest.Mock;

    let requestManager: RWeb3RequestManager;

    beforeAll(() => {
        requestManager = new RWeb3RequestManager('http://127.0.0.1:8545');
        requestManagerSendSpy = jest.fn();
        requestManager.send = requestManagerSendSpy;
    });

    it('should call requestManager.send with abciQuery method', async () => {
        let path = 'abci_info';
        let data = '';
        let height = '5000';
        let prove = true;

        await rigoRpcMethods.abciQuery(requestManager, path, data, height, prove);

        expect(requestManagerSendSpy).toHaveBeenCalledWith({
            method: 'abci_query',
            params: {
                path: path,
                data: data,
                height: height,
                prove: prove,
            },
        });
    });
});
