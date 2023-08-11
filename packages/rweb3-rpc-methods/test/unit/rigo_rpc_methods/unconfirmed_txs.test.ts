import {RWeb3RequestManager} from 'rweb3-core';

import {rigoRpcMethods} from '../../../src/index';
import {testData} from "./fixtures/tx_search";
import {getDevServer} from "../e2e_utils";

describe('unconfirmedTxs', () => {

    let requestManagerSendSpy: jest.Mock;
    let requestManager: RWeb3RequestManager;

    beforeAll(() => {
        requestManager = new RWeb3RequestManager('http://127.0.0.1:8545');
        requestManagerSendSpy = jest.fn();
        requestManager.send = requestManagerSendSpy;
    });

    it('should call requestManager.send with unconfirmedTxs method', async () => {

        let limit = 5

        await rigoRpcMethods.unconfirmedTxs(requestManager, limit);

        expect(requestManagerSendSpy).toHaveBeenCalledWith({
            method: 'unconfirmed_txs',
            params: {
                limit: limit.toString(10)
            }
        });
    });
});


describe('unconfirmedTxs develop server call', () => {

    let requestManager: RWeb3RequestManager;

    beforeAll(() => {
        requestManager = new RWeb3RequestManager(getDevServer());
    });

    it.each(testData)(
        'unconfirmedTxs should call success return',
        async (_parameter, _response) => {

            let returnValue = await rigoRpcMethods.unconfirmedTxs(requestManager, _parameter.limit);

            console.log("unconfirmedTxs", JSON.stringify(returnValue));

            // expect(returnValue).toEqual(
            //     _response
            // )
        }
    );
});
