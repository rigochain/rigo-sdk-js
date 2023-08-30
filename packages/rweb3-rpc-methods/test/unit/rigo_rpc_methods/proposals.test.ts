import { RWeb3RequestManager } from 'rweb3-core';

import { rigoRpcMethods } from '../../../src/index';

describe('proposals', () => {
    let requestManagerSendSpy: jest.Mock;
    let requestManager: RWeb3RequestManager;

    beforeAll(() => {
        requestManager = new RWeb3RequestManager('http://127.0.0.1:8545');
        requestManagerSendSpy = jest.fn();
        requestManager.send = requestManagerSendSpy;
    });

    it('should call requestManager.send with proposals method', async () => {
        let txHash = '0x1234567890123456789012345678901234567890123456789012345678901234';

        await rigoRpcMethods.proposals(requestManager, txHash);

        expect(requestManagerSendSpy).toHaveBeenCalledWith({
            method: 'proposals',
            params: {
                txhash: Buffer.from(txHash).toString('base64'),
            },
        });
    });
});
