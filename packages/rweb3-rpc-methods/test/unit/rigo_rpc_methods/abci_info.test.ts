import {RWeb3RequestManager} from 'rweb3-core';
import {AbciInfo, ResponseData} from 'rweb3-types';


import {rigoRpcMethods} from '../../../src/index';
import {DEV_SERVER} from "./fixtures/test_constant";
import {testData} from "./fixtures/abci_info";

describe('abciInfo', () => {
    let requestManagerSendSpy: jest.Mock;

    let requestManager: RWeb3RequestManager;

    beforeAll(() => {
        requestManager = new RWeb3RequestManager('http://127.0.0.1:8545');
        requestManagerSendSpy = jest.fn();
        requestManager.send = requestManagerSendSpy;
    });

    it('should call requestManager.send with getAbciInfo method', async () => {

        await rigoRpcMethods.abciInfo(requestManager);

        expect(requestManagerSendSpy).toHaveBeenCalledWith({
            method: 'abci_info',
            params: {}
        });
    });
});


describe('abciInfo develop server call', () => {

    let requestManager: RWeb3RequestManager;

    beforeAll(() => {
        requestManager = new RWeb3RequestManager(DEV_SERVER);
    });

    it.each(testData)(
        'abciInfo should call success return',
        async (_return) => {

            let returnValue = await rigoRpcMethods.abciInfo(requestManager);
            console.log(JSON.stringify(returnValue));

            expect(isResponseAbciInfo(returnValue)).toBeTruthy();
        }
    );
});

function isResponseAbciInfo(obj: any): obj is ResponseData<AbciInfo> {
    return typeof obj.response.version === 'string' &&
        typeof obj.response.app_version === 'string' &&
        typeof obj.response.last_block_height === 'string' &&
        typeof obj.response.last_block_app_hash === 'string';
}