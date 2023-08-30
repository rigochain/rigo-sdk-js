import { RWeb3RequestManager } from 'rweb3-core';

import { rigoRpcMethods } from '../../../src/index';

describe('blockSearch', () => {
    let requestManagerSendSpy: jest.Mock;

    let requestManager: RWeb3RequestManager;

    beforeAll(() => {
        requestManager = new RWeb3RequestManager('http://127.0.0.1:8545');
        requestManagerSendSpy = jest.fn();
        requestManager.send = requestManagerSendSpy;
    });

    it('should call requestManager.send with blockResults method', async () => {
        let query = '0x1234';
        let page = 1;
        let per_page = 10;
        let order_by = 'asc';

        await rigoRpcMethods.blockSearch(requestManager, query, page, per_page, order_by);

        expect(requestManagerSendSpy).toHaveBeenCalledWith({
            method: 'block_search',
            params: {
                query: query,
                page: page.toString(10),
                per_page: per_page.toString(10),
                order_by: order_by,
            },
        });
    });
});
