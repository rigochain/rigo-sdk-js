import {RWeb3RequestManager} from 'rweb3-core';


import {rigoRpcMethods} from '../../../src/index';
import {DEV_SERVER} from "./fixtures/test_constant";

describe('health', () => {
    let requestManagerSendSpy: jest.Mock;

    let requestManager: RWeb3RequestManager;

    beforeAll(() => {
        requestManager = new RWeb3RequestManager('http://127.0.0.1:8545');
        requestManagerSendSpy = jest.fn();
        requestManager.send = requestManagerSendSpy;
    });

    it('should call requestManager.send with getHealth method', async () => {

        await rigoRpcMethods.health(requestManager);

        expect(requestManagerSendSpy).toHaveBeenCalledWith({
            method: 'health',
            params: {}
        });
    });
});


describe('health develop server call', () => {

    let requestManager: RWeb3RequestManager;

    beforeAll(() => {
        requestManager = new RWeb3RequestManager(DEV_SERVER);
    });


    it('getHealth should call success return', async () => {
        let returnValue = await rigoRpcMethods.health(requestManager);
        expect(returnValue).toEqual(
            {}
        );
    });
});
