import {RWeb3RequestManager} from 'rweb3-core';

import {rigoRpcMethods} from '../../../src/index';

describe('queryStakes', () => {

    let requestManagerSendSpy: jest.Mock;
    let requestManager: RWeb3RequestManager;

    beforeAll(() => {
        requestManager = new RWeb3RequestManager('http://127.0.0.1:8545');
        requestManagerSendSpy = jest.fn();
        requestManager.send = requestManagerSendSpy;
    });

    it('should call requestManager.send with queryStakes method', async () => {

        const addr = '0x1234';

        await rigoRpcMethods.queryStakes(requestManager, addr);

        expect(requestManagerSendSpy).toHaveBeenCalledWith({
            method: 'stakes',
            params: {addr: addr},
        });
    });
});
