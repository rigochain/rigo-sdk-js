import {RWeb3RequestManager} from 'rweb3-core';

import {rigoRpcMethods} from '../../../src/index';
import {DEV_SERVER} from "./fixtures/test_constant";
import {testData} from "./fixtures/net_info";

describe('netInfo', () => {

    let requestManagerSendSpy: jest.Mock;
    let requestManager: RWeb3RequestManager;

    beforeAll(() => {
        requestManager = new RWeb3RequestManager('http://127.0.0.1:8545');
        requestManagerSendSpy = jest.fn();
        requestManager.send = requestManagerSendSpy;
    });

    it('should call requestManager.send with netInfo method', async () => {


        await rigoRpcMethods.netInfo(requestManager);

        expect(requestManagerSendSpy).toHaveBeenCalledWith({
            method: 'net_info',
            params: {},
        });
    });
});


describe('netInfo develop server call', () => {

    let requestManager: RWeb3RequestManager;

    beforeAll(() => {
        requestManager = new RWeb3RequestManager(DEV_SERVER);
    });

    it.each(testData)(
        'netInfo should call success return',
        async (_parameter, _response) => {

            let returnValue = await rigoRpcMethods.netInfo(requestManager);

            console.log("netInfo", JSON.stringify(returnValue));

            // 값이 수시로 바뀜
            // expect(returnValue).toEqual(
            //     _response
            // )
        }
    );
});