import {RWeb3RequestManager} from 'rweb3-core';

import {rigoRpcMethods} from '../../../src/index';
import {testData} from "./fixtures/broadcast_tx_commit";
import {getDevServer} from "../e2e_utils";

describe('checkTx', () => {

    let requestManagerSendSpy: jest.Mock;
    let requestManager: RWeb3RequestManager;

    beforeAll(() => {
        requestManager = new RWeb3RequestManager('http://127.0.0.1:8545');
        requestManagerSendSpy = jest.fn();
        requestManager.send = requestManagerSendSpy;
    });

    it('should call requestManager.send with checkTx method', async () => {

        let tx = "678e659b9de68984f7e8828c759351c25266dcc9980c9cf6ecbe9b6cc6b51748";

        await rigoRpcMethods.checkTx(requestManager, tx);

        let txhash = Buffer.from(tx).toString('base64');

        // call number 1 of requestManagerSendSpy
        expect(requestManagerSendSpy).toHaveBeenCalledWith({
            method: 'check_tx',
            params: {tx: txhash},
        });
    });
});


describe('checkTx develop server call', () => {

    let requestManager: RWeb3RequestManager;

    beforeAll(() => {
        requestManager = new RWeb3RequestManager(getDevServer());
    });

    it.each(testData)(
        'checkTx should call success return',
        async (_parameter, _response) => {


            let returnValue = await rigoRpcMethods.checkTx(requestManager, _parameter.tx);

            expect(returnValue).toEqual(
                _response
            )

        }
    );
});


