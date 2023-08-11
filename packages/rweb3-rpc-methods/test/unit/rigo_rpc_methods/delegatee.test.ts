import {RWeb3RequestManager} from 'rweb3-core';

import {rigoRpcMethods} from '../../../src/index';
import {testData} from "./fixtures/delegatee";
import {getDevServer} from "../e2e_utils";

describe('delegatee', () => {

    let requestManagerSendSpy: jest.Mock;
    let requestManager: RWeb3RequestManager;

    beforeAll(() => {
        requestManager = new RWeb3RequestManager('http://127.0.0.1:8545');
        requestManagerSendSpy = jest.fn();
        requestManager.send = requestManagerSendSpy;
    });

    it('should call requestManager.send with delegatee method', async () => {

        const addr = '0x1234';

        await rigoRpcMethods.delegatee(requestManager, addr);

        expect(requestManagerSendSpy).toHaveBeenCalledWith({
            method: 'delegatee',
            params: {addr: addr},
        });
    });
});


describe('delegatee develop server call', () => {

    let requestManager: RWeb3RequestManager;

    beforeAll(() => {
        requestManager = new RWeb3RequestManager(getDevServer());
    });

    it.each(testData)(
        'delegatee should call success return',
        async (_parameter, _response) => {

            let returnValue = await rigoRpcMethods.delegatee(requestManager, _parameter.addr);

            expect(returnValue).toEqual(
                _response
            )
        }
    );
});