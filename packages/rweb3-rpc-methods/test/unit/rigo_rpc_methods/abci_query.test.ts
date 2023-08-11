import {RWeb3RequestManager} from 'rweb3-core';


import {rigoRpcMethods} from '../../../src/index';
import {testData} from "./fixtures/abci_query";
import {getDevServer} from "../e2e_utils";

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
                prove: prove
            },
        });
    });
});


describe('abciQuery develop server call', () => {

    let requestManager: RWeb3RequestManager;

    beforeAll(() => {
        requestManager = new RWeb3RequestManager(getDevServer());
    });

    it.each(testData)(
        'abciQuery should call success return',
        async (_parameter, _response) => {

            let returnValue = await rigoRpcMethods.abciQuery(requestManager, _parameter.path, _parameter.data, _parameter.height, _parameter.prove);
            console.log(JSON.stringify(returnValue));
        }
    );
});