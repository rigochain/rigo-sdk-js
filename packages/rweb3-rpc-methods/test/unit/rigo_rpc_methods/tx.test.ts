import {RWeb3RequestManager} from 'rweb3-core';

import {rigoRpcMethods} from '../../../src/index';
import {testData} from "./fixtures/tx";
import {getDevServer} from "../e2e_utils";

describe('tx', () => {

    let requestManagerSendSpy: jest.Mock;
    let requestManager: RWeb3RequestManager;

    beforeAll(() => {
        requestManager = new RWeb3RequestManager('http://127.0.0.1:8545');
        requestManagerSendSpy = jest.fn();
        requestManager.send = requestManagerSendSpy;
    });

    it('should call requestManager.send with tx method', async () => {

        const txHash = "txhash";

        await rigoRpcMethods.tx(requestManager, txHash);

        expect(requestManagerSendSpy).toHaveBeenCalledWith({
            method: 'tx',
            params: { hash: Buffer.from(txHash).toString('base64'), prove: true },
        });
    });
});


describe('tx develop server call', () => {

    let requestManager: RWeb3RequestManager;

    beforeAll(() => {
        requestManager = new RWeb3RequestManager(getDevServer());
    });

    it.each(testData)(
        'tx should call success return',
        async (_parameter, _response) => {

            let returnValue = await rigoRpcMethods.tx(requestManager, _parameter.tx);
            console.log("tx response value", JSON.stringify(returnValue));

            expect(returnValue).toEqual(
                _response
            )
        }
    );
});
