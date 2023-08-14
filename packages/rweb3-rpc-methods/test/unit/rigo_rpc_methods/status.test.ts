import {RWeb3RequestManager} from 'rweb3-core';

import {rigoRpcMethods} from '../../../src/index';
import {testData} from "./fixtures/status";
import {getDevServer} from "../e2e_utils";
import {StatusResponse} from "rweb3-types";
describe('status', () => {

    let requestManagerSendSpy: jest.Mock;
    let requestManager: RWeb3RequestManager;

    beforeAll(() => {
        requestManager = new RWeb3RequestManager('http://127.0.0.1:8545');
        requestManagerSendSpy = jest.fn();
        requestManager.send = requestManagerSendSpy;
    });

    it('should call requestManager.send with status method', async () => {

        await rigoRpcMethods.status(requestManager);


        // call number 1 of requestManagerSendSpy
        expect(requestManagerSendSpy).toHaveBeenCalledWith({
            method: 'status',
            params: {},
        });
    });
});


describe('block develop server call', () => {

    let requestManager: RWeb3RequestManager;

    beforeAll(() => {
        requestManager = new RWeb3RequestManager(getDevServer());
    });

    it.each(testData)(
        'block should call success return',
        async (_parameter, _return) => {

            let returnValue: StatusResponse = await rigoRpcMethods.status(requestManager);

            console.log("status return", returnValue)

            // returnValue 의 모든 값이 undefined 가 아닌지 확인
            Object.values(returnValue).forEach(value => {
                expect(value).not.toBeUndefined();
            });
        },
    );
});