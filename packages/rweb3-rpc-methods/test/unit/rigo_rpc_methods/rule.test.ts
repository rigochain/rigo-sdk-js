import {RWeb3RequestManager} from 'rweb3-core';

import {rigoRpcMethods} from '../../../src/index';
import {testData} from "./fixtures/rule";
import {getDevServer} from "../e2e_utils";

describe('rule', () => {

    let requestManagerSendSpy: jest.Mock;
    let requestManager: RWeb3RequestManager;

    beforeAll(() => {
        requestManager = new RWeb3RequestManager('http://127.0.0.1:8545');
        requestManagerSendSpy = jest.fn();
        requestManager.send = requestManagerSendSpy;
    });

    it('should call requestManager.send with rule method', async () => {

        await rigoRpcMethods.rule(requestManager);

        expect(requestManagerSendSpy).toHaveBeenCalledWith({
            method: 'rule',
            params: {},
        });
    });
});



describe('rule develop server call', () => {

    let requestManager: RWeb3RequestManager;

    beforeAll(() => {
        requestManager = new RWeb3RequestManager(getDevServer());
    });

    it.each(testData)(
        'rule should call success return',
        async (_parameter, _response) => {

            let returnValue = await rigoRpcMethods.rule(requestManager);
            console.log("rule", JSON.stringify(returnValue));

            expect(returnValue).toEqual(
                _response
            )
        }
    );
});