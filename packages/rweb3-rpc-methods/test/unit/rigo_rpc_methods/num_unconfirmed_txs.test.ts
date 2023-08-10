import {RWeb3RequestManager} from 'rweb3-core';

import {rigoRpcMethods} from '../../../src/index';
import {DEV_SERVER} from "./fixtures/test_constant";
import {testData} from "./fixtures/num_unconfirmed_txs";

describe('numUnconfirmedTxs', () => {

    let requestManagerSendSpy: jest.Mock;
    let requestManager: RWeb3RequestManager;

    beforeAll(() => {
        requestManager = new RWeb3RequestManager('http://127.0.0.1:8545');
        requestManagerSendSpy = jest.fn();
        requestManager.send = requestManagerSendSpy;
    });

    it('should call requestManager.send with numUnconfirmedTxs method', async () => {


        await rigoRpcMethods.numUnconfirmedTxs(requestManager);

        expect(requestManagerSendSpy).toHaveBeenCalledWith({
            method: 'num_unconfirmed_txs',
            params: {},
        });
    });
});


describe('numUnconfirmedTxs develop server call', () => {

    let requestManager: RWeb3RequestManager;

    beforeAll(() => {
        requestManager = new RWeb3RequestManager(DEV_SERVER);
    });

    it.each(testData)(
        'numUnconfirmedTxs should call success return',
        async (_parameter, _response) => {

            let returnValue = await rigoRpcMethods.numUnconfirmedTxs(requestManager);

            console.log("numUnconfirmedTxs", JSON.stringify(returnValue));

            expect(returnValue).toEqual(
                _response
            )
        }
    );
});