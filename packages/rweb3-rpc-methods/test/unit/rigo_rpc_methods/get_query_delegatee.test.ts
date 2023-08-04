import {RWeb3RequestManager} from 'rweb3-core';

import {rigoRpcMethods} from '../../../src/index';

describe('queryDelegatee', () => {

    let requestManagerSendSpy: jest.Mock;
    let requestManager: RWeb3RequestManager;

    beforeAll(() => {
        requestManager = new RWeb3RequestManager('http://127.0.0.1:8545');
        requestManagerSendSpy = jest.fn();
        requestManager.send = requestManagerSendSpy;
    });

    it('should call requestManager.send with queryDelegatee method', async () => {

        const addr = '0x1234';

        await rigoRpcMethods.queryDelegatee(requestManager, addr);

        expect(requestManagerSendSpy).toHaveBeenCalledWith({
            method: 'delegatee',
            params: {addr: addr},
        });
    });
});
