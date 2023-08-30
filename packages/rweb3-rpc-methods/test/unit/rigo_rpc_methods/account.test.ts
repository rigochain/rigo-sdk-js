import { RWeb3RequestManager } from 'rweb3-core';

import { rigoRpcMethods } from '../../../src/index';

describe('account', () => {
    let requestManagerSendSpy: jest.Mock;
    let requestManager: RWeb3RequestManager;

    beforeAll(() => {
        requestManager = new RWeb3RequestManager('http://127.0.0.1:8545');
        requestManagerSendSpy = jest.fn();
        requestManager.send = requestManagerSendSpy;
    });

    it('should call requestManager.send with account method', async () => {
        let addr = 'DF976A96545DAD0E0B14FED615587A89BA980B84';

        if (!addr.startsWith('0x')) {
            addr = '0x' + addr;
        }
        await rigoRpcMethods.account(requestManager, addr);

        expect(requestManagerSendSpy).toHaveBeenCalledWith({
            method: 'account',
            params: {
                addr: addr,
            },
        });
    });
});
