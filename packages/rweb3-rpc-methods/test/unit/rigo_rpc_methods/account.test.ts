import {RWeb3RequestManager} from 'rweb3-core';

import {rigoRpcMethods} from '../../../src/index';

describe('account', () => {

    let requestManagerSendSpy: jest.Mock;
    let requestManager: RWeb3RequestManager;

    beforeAll(() => {
        requestManager = new RWeb3RequestManager('http://127.0.0.1:8545');
        requestManagerSendSpy = jest.fn();
        requestManager.send = requestManagerSendSpy;
    });

    it('should call requestManager.send with account method', async () => {

        const addr = '0x1234';

        await rigoRpcMethods.account(requestManager, addr);

        expect(requestManagerSendSpy).toHaveBeenCalledWith({
            method: 'account',
            params: {
                addr: addr,
            },
        });
    });
});
