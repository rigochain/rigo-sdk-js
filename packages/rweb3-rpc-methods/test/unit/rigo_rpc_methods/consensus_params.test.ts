import {RWeb3RequestManager} from 'rweb3-core';

import {rigoRpcMethods} from '../../../src/index';
import {testData} from "./fixtures/consensus_params";
import {getDevServer} from "../e2e_utils";

describe('consensusParams', () => {

    let requestManagerSendSpy: jest.Mock;
    let requestManager: RWeb3RequestManager;

    beforeAll(() => {
        requestManager = new RWeb3RequestManager('http://127.0.0.1:8545');
        requestManagerSendSpy = jest.fn();
        requestManager.send = requestManagerSendSpy;
    });

    it('should call requestManager.send with commit method', async () => {

        let height = 1;

        await rigoRpcMethods.consensusParams(requestManager, height);

        // call number 1 of requestManagerSendSpy
        expect(requestManagerSendSpy).toHaveBeenCalledWith({
            method: 'consensus_params',
            params: {height: height.toString(10)},
        });
    });
});


describe('consensusParams develop server call', () => {

    let requestManager: RWeb3RequestManager;

    beforeAll(() => {
        requestManager = new RWeb3RequestManager(getDevServer());
    });

    it.each(testData)(
        'consensusParams should call success return',
        async (_parameter, _response) => {

            let returnValue = await rigoRpcMethods.consensusParams(requestManager, _parameter.height);
            console.log("consensusParams", JSON.stringify(returnValue));

            expect(returnValue).toEqual(
                _response
            )
        }
    );
});