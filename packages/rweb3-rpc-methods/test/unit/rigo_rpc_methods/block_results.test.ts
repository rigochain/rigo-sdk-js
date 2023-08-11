import {RWeb3RequestManager} from 'rweb3-core';

import {rigoRpcMethods} from '../../../src/index';
import {testData} from "./fixtures/block_results";
import {getDevServer} from "../e2e_utils";

describe('blockResults', () => {
    let requestManagerSendSpy: jest.Mock;

    let requestManager: RWeb3RequestManager;

    beforeAll(() => {
        requestManager = new RWeb3RequestManager('http://127.0.0.1:8545');
        requestManagerSendSpy = jest.fn();
        requestManager.send = requestManagerSendSpy;
    });

    it('should call requestManager.send with blockResults method', async () => {

        let height = 1234;

        await rigoRpcMethods.blockResults(requestManager, height);

        expect(requestManagerSendSpy).toHaveBeenCalledWith({
            method: 'block_results',
            params: {height: height.toString(10)}
        });
    });
});


describe('blockResults Develop Server Call ', () => {

    let requestManager: RWeb3RequestManager;

    beforeAll(() => {
        requestManager = new RWeb3RequestManager(getDevServer());
    });

    it.each(testData)(
        'blockResults should call success return',
        async (height, _return) => {

            let returnValue = await rigoRpcMethods.blockResults(requestManager, height);
            console.log(returnValue)
            expect(returnValue).toEqual(
                _return
            )
        },
    );
});



