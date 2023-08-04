import {RWeb3RequestManager} from 'rweb3-core';

import {rigoRpcMethods} from '../../../src/index';
import {TrxProto} from "rweb3-utils";
import {DEV_SERVER} from "./fixtures/test_constant";
import {testData} from "./fixtures/get_broadcast_trx_sync";

describe('broadcastTrxSync', () => {

    let requestManagerSendSpy: jest.Mock;
    let requestManager: RWeb3RequestManager;

    beforeAll(() => {
        requestManager = new RWeb3RequestManager('http://127.0.0.1:8545');
        requestManagerSendSpy = jest.fn();
        requestManager.send = requestManagerSendSpy;
    });

    it('should call requestManager.send with broadcastTrxSync method', async () => {

        const tx: TrxProto = TrxProto.fromJSON({});
        const wr = TrxProto.encode(tx);
        const txbz = wr.finish();

        await rigoRpcMethods.broadcastTrxSync(requestManager, tx);

        expect(requestManagerSendSpy).toHaveBeenCalledWith({
            method: 'broadcast_tx_sync',
            params: {tx: Buffer.from(txbz).toString('base64')},
        });
    });
});



describe('broadcastTrxSync develop server call', () => {

    let requestManager: RWeb3RequestManager;

    beforeAll(() => {
        requestManager = new RWeb3RequestManager(DEV_SERVER);
    });

    it.each(testData)(
        'broadcastTrxSync should call success return',
        async (tx, _return) => {

            // TODO : 여기도 찾아야 됨
            let returnValue = await rigoRpcMethods.broadcastTrxSync(requestManager, tx);
            console.log(JSON.stringify(returnValue));
            expect(returnValue).toEqual(
                _return
            )
        },
    );
});
