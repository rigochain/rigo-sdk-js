import {RWeb3RequestManager} from 'rweb3-core';

import {rigoRpcMethods} from '../../../src/index';

describe('validators', () => {

    let requestManagerSendSpy: jest.Mock;
    let requestManager: RWeb3RequestManager;

    beforeAll(() => {
        requestManager = new RWeb3RequestManager('http://127.0.0.1:8545');
        requestManagerSendSpy = jest.fn();
        requestManager.send = requestManagerSendSpy;
    });

    it('should call requestManager.send with validators method', async () => {

        const height = '0x1234';

        await rigoRpcMethods.validators(requestManager, height);

        expect(requestManagerSendSpy).toHaveBeenCalledWith({
            method: 'validators',
            params: {height: height},
        });
    });
});
