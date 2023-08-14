import {RWeb3RequestManager} from 'rweb3-core';

import {rigoRpcMethods} from '../../../src/index';
import {testData} from "./fixtures/blockchain";
import {getDevServer} from "../e2e_utils";
import {BlockchainResponse} from "rweb3-types/lib/types";

describe('blockchain', () => {
    let requestManagerSendSpy: jest.Mock;

    let requestManager: RWeb3RequestManager;

    beforeAll(() => {
        requestManager = new RWeb3RequestManager('http://127.0.0.1:8545');
        requestManagerSendSpy = jest.fn();
        requestManager.send = requestManagerSendSpy;
    });

    it('should call requestManager.send with blockchain method', async () => {

        let minHeight = 1234;
        let maxHeight = 1234;


        await rigoRpcMethods.blockchain(requestManager, minHeight, maxHeight);

        expect(requestManagerSendSpy).toHaveBeenCalledWith({
            method: 'blockchain',
            params: {
                minHeight: minHeight.toString(10),
                maxHeight: maxHeight.toString(10)
            }
        });
    });
});


describe('blockchain Develop Server Call ', () => {

    let requestManager: RWeb3RequestManager;

    beforeAll(() => {
        requestManager = new RWeb3RequestManager(getDevServer());
    });

    it.each(testData)(
        'blockchain should call success return',
        async (_parameter, _return) => {

            let returnValue: BlockchainResponse = await rigoRpcMethods.blockchain(requestManager, _parameter.minHeight, _parameter.maxHeight);

            console.log("blockchain return", returnValue)

            // returnValue 의 모든 값이 undefined 가 아닌지 확인
            Object.values(returnValue).forEach(value => {
                expect(value).not.toBeUndefined();
            });

        },
    );
});


