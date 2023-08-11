import {RWeb3RequestManager} from 'rweb3-core';

import {rigoRpcMethods} from '../../../src/index';
import {testData} from "./fixtures/stakes";
import {getDevServer} from "../e2e_utils";

describe('stakes', () => {

    let requestManagerSendSpy: jest.Mock;
    let requestManager: RWeb3RequestManager;

    beforeAll(() => {
        requestManager = new RWeb3RequestManager('http://127.0.0.1:8545');
        requestManagerSendSpy = jest.fn();
        requestManager.send = requestManagerSendSpy;
    });

    it('should call requestManager.send with queryStakes method', async () => {

        const addr = '0x1234';

        await rigoRpcMethods.stakes(requestManager, addr);

        expect(requestManagerSendSpy).toHaveBeenCalledWith({
            method: 'stakes',
            params: {addr: addr},
        });
    });
});



describe('stakes develop server call', () => {

    let requestManager: RWeb3RequestManager;

    beforeAll(() => {
        requestManager = new RWeb3RequestManager(getDevServer());
    });

    it.each(testData)(
        'stakes should call success return',
        async (_parameter, _response) => {

            let returnValue = await rigoRpcMethods.stakes(requestManager, _parameter.addr);
            console.log("stakes", JSON.stringify(returnValue));

            expect(returnValue).toEqual(
                _response
            )
        }
    );
});
