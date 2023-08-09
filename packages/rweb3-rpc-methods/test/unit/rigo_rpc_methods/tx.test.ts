import {RWeb3RequestManager} from 'rweb3-core';

import {rigoRpcMethods} from '../../../src/index';

describe('tx', () => {

    let requestManagerSendSpy: jest.Mock;
    let requestManager: RWeb3RequestManager;

    beforeAll(() => {
        requestManager = new RWeb3RequestManager('http://127.0.0.1:8545');
        requestManagerSendSpy = jest.fn();
        requestManager.send = requestManagerSendSpy;
    });

    it('should call requestManager.send with tx method', async () => {

        const txHash = "";

        await rigoRpcMethods.tx(requestManager, txHash);

        expect(requestManagerSendSpy).toHaveBeenCalledWith({
            method: 'tx',
            params: { hash: Buffer.from(txHash).toString('base64'), prove: true },
        });
    });
});