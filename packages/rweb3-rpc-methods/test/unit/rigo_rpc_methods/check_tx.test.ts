import { RWeb3RequestManager } from 'rweb3-core';

import { rigoRpcMethods } from '../../../src/index';
import { TrxProtoUtils } from 'rweb3-accounts';
describe('checkTx', () => {
    let requestManagerSendSpy: jest.Mock;
    let requestManager: RWeb3RequestManager;

    beforeAll(() => {
        requestManager = new RWeb3RequestManager('http://127.0.0.1:8545');
        requestManagerSendSpy = jest.fn();
        requestManager.send = requestManagerSendSpy;
    });

    it('should call requestManager.send with checkTx method', async () => {
        const tx = TrxProtoUtils.fromJSON({
            version: 0,
            time: new Date().getTime(),
            nonce: 0,
            from: new Uint8Array(0),
            to: new Uint8Array(0),
            Amount: new Uint8Array(0),
            Gas: new Uint8Array(0),
            type: 0,
            Payload: new Uint8Array(0),
            sig: new Uint8Array(0),
        });

        const wr = TrxProtoUtils.encode(tx);
        const txbz = wr.finish();

        await rigoRpcMethods.checkTx(requestManager, tx);

        let txhash = Buffer.from(txbz).toString('base64');

        // call number 1 of requestManagerSendSpy
        expect(requestManagerSendSpy).toHaveBeenCalledWith({
            method: 'check_tx',
            params: { tx: txhash },
        });
    });
});
