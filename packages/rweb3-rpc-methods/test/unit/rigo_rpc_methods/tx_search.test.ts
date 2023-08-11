import {RWeb3RequestManager} from 'rweb3-core';

import {rigoRpcMethods} from '../../../src/index';
import {testData} from "./fixtures/tx_search";
import {getDevServer} from "../e2e_utils";

describe('txSearch', () => {

    let requestManagerSendSpy: jest.Mock;
    let requestManager: RWeb3RequestManager;

    beforeAll(() => {
        requestManager = new RWeb3RequestManager('http://127.0.0.1:8545');
        requestManagerSendSpy = jest.fn();
        requestManager.send = requestManagerSendSpy;
    });

    it('should call requestManager.send with txSearch method', async () => {

        let query = "query";
        let prove = false;
        let page = 1;
        let per_page = 10;
        let order_by = "asc";

        await rigoRpcMethods.txSearch(requestManager, query, prove, page, per_page, order_by);

        expect(requestManagerSendSpy).toHaveBeenCalledWith({
            method: 'tx_search',
            params: {
                query: query,
                prove: prove,
                page: page.toString(10),
                per_page: per_page.toString(10),
                order_by: order_by
            }
        });
    });
});


describe('txSearch develop server call', () => {

    let requestManager: RWeb3RequestManager;

    beforeAll(() => {
        requestManager = new RWeb3RequestManager(getDevServer());
    });

    it.each(testData)(
        'txSearch should call success return',
        async (_parameter, _response) => {

            let returnValue = await rigoRpcMethods.txSearch(requestManager, _parameter.query, _parameter.prove, _parameter.page, _parameter.per_page, _parameter.order_by);

            console.log("txSearch", JSON.stringify(returnValue));

            expect(returnValue).toEqual(
                _response
            )
        }
    );
});
