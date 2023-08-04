import {RWeb3RequestManager} from 'rweb3-core';

import {rigoRpcMethods} from '../../../src/index';
import {testData} from "./fixtures/get_block_by_height";
import {DEV_SERVER} from "./fixtures/test_constant";

describe('queryBlockByHeight', () => {

    let requestManagerSendSpy: jest.Mock;
    let requestManager: RWeb3RequestManager;

    beforeAll(() => {
        requestManager = new RWeb3RequestManager('http://127.0.0.1:8545');
        requestManagerSendSpy = jest.fn();
        requestManager.send = requestManagerSendSpy;
    });

    it('should call requestManager.send with queryBlockByHeight method', async () => {

        let height = 1;

        await rigoRpcMethods.queryBlockByHeight(requestManager, height);


        // call number 1 of requestManagerSendSpy
        expect(requestManagerSendSpy).toHaveBeenCalledWith({
            method: 'block',
            params: {height: height.toString(10)},
        });
    });
});


describe('queryBlockByHeight develop server call', () => {

    let requestManager: RWeb3RequestManager;

    beforeAll(() => {
        requestManager = new RWeb3RequestManager(DEV_SERVER);
    });

    it.each(testData)(
        'queryBlockByHeight should call success return',
        async (height, _return) => {

            let returnValue = await rigoRpcMethods.queryBlockByHeight(requestManager, height);
            console.log(JSON.stringify(returnValue));
            expect(returnValue).toEqual(
                _return
            )
        },
    );
});

