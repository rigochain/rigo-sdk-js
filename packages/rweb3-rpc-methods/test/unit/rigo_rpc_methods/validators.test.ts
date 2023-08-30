import { RWeb3RequestManager } from 'rweb3-core';

import { rigoRpcMethods } from '../../../src/index';

describe('validators', () => {
    let requestManagerSendSpy: jest.Mock;
    let requestManager: RWeb3RequestManager;

    beforeAll(() => {
        requestManager = new RWeb3RequestManager('http://127.0.0.1:8545');
        requestManagerSendSpy = jest.fn();
        requestManager.send = requestManagerSendSpy;
    });

    it('should call requestManager.send with validators method', async () => {
        const height = 1;
        const page = 2;
        const per_page = 3;

        await rigoRpcMethods.validators(requestManager, height, page, per_page);

        expect(requestManagerSendSpy).toHaveBeenCalledWith({
            method: 'validators',
            params: {
                height: height.toString(10),
                page: page.toString(10),
                per_page: per_page.toString(10),
            },
        });
    });
});
