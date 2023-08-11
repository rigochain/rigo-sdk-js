import {RWeb3RequestManager} from 'rweb3-core';

import {rigoRpcMethods} from '../../../src/index';
import {testData} from "./fixtures/block";
import {getDevServer} from "../e2e_utils";

describe('block', () => {

    let requestManagerSendSpy: jest.Mock;
    let requestManager: RWeb3RequestManager;

    beforeAll(() => {
        requestManager = new RWeb3RequestManager('http://127.0.0.1:8545');
        requestManagerSendSpy = jest.fn();
        requestManager.send = requestManagerSendSpy;
    });

    it('should call requestManager.send with block method', async () => {

        let height = 1;

        await rigoRpcMethods.block(requestManager, height);


        // call number 1 of requestManagerSendSpy
        expect(requestManagerSendSpy).toHaveBeenCalledWith({
            method: 'block',
            params: {height: height.toString(10)},
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
        async (height, _return) => {

            let returnValue: reponses.BlockResponse = await rigoRpcMethods.block(requestManager, height);

            expect(returnValue).toEqual(
                _return
            )
        },
    );
});