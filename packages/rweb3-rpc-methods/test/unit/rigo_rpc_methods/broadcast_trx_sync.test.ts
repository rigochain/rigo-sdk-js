import { RWeb3RequestManager } from 'rweb3-core';

import { rigoRpcMethods } from '../../../src/index';
import { TrxProtoUtils } from 'rweb3-accounts';
import { TrxProto } from 'rweb3-types';

describe('broadcastTrxSync', () => {
    let requestManagerSendSpy: jest.Mock;
    let requestManager: RWeb3RequestManager;

    beforeAll(() => {
        requestManager = new RWeb3RequestManager('http://127.0.0.1:8545');
        requestManagerSendSpy = jest.fn();
        requestManager.send = requestManagerSendSpy;
    });

    it('should call requestManager.send with broadcastTrxSync method', async () => {
        const tx: TrxProto = TrxProtoUtils.fromJSON({});
        const wr = TrxProtoUtils.encode(tx);
        const txbz = wr.finish();

        await rigoRpcMethods.broadcastTxSync(requestManager, tx);

        expect(requestManagerSendSpy).toHaveBeenCalledWith({
            method: 'broadcast_tx_sync',
            params: { tx: Buffer.from(txbz).toString('base64') },
        });
    });
});
