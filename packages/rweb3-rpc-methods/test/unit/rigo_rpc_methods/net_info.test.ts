import {RWeb3RequestManager} from 'rweb3-core';

import {rigoRpcMethods} from '../../../src/index';
import {testData} from "./fixtures/net_info";
import {getDevServer} from "../e2e_utils";
import {NetInfoResponse} from "rweb3-types/lib/types";

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
        requestManager = new RWeb3RequestManager(getDevServer());
    });

    it.each(testData)(
        'netInfo should call success return',
        async (_parameter, _response) => {

            let returnValue: NetInfoResponse = await rigoRpcMethods.netInfo(requestManager);

            console.log("netInfo", JSON.stringify(returnValue));
            
            // returnValue 의 모든 값이 undefined 가 아닌지 확인
            Object.values(returnValue).forEach(value => {
                expect(value).not.toBeUndefined();
            });
        }
    );
});