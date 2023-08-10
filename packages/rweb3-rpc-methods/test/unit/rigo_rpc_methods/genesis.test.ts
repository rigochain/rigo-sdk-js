import {RWeb3RequestManager} from 'rweb3-core';

import {rigoRpcMethods} from '../../../src/index';
import {DEV_SERVER} from "./fixtures/test_constant";
import {testData} from "./fixtures/genesis";

describe('genesis', () => {

    let requestManagerSendSpy: jest.Mock;
    let requestManager: RWeb3RequestManager;

    beforeAll(() => {
        requestManager = new RWeb3RequestManager('http://127.0.0.1:8545');
        requestManagerSendSpy = jest.fn();
        requestManager.send = requestManagerSendSpy;
    });

    it('should call requestManager.send with genesis method', async () => {

        await rigoRpcMethods.genesis(requestManager);

        expect(requestManagerSendSpy).toHaveBeenCalledWith({
            method: 'genesis',
            params: {},
        });
    });
});


describe('genesis develop server call', () => {

    let requestManager: RWeb3RequestManager;

    beforeAll(() => {
        requestManager = new RWeb3RequestManager(DEV_SERVER);
    });

    it.each(testData)(
        'genesis should call success return',
        async (_parameter, _response) => {

            let returnValue = await rigoRpcMethods.genesis(requestManager);

            console.log("genesis", JSON.stringify(returnValue));

            expect(returnValue).toEqual(
                _response
            )
        }
    );
});