import {RWeb3RequestManager} from 'rweb3-core';

import {rigoRpcMethods} from '../../../src/index';
import {DEV_SERVER} from "./fixtures/test_constant";
import {testData} from "./fixtures/broadcast_tx_commit";
import {TrxProto} from "rweb3-utils";

describe('broadcastTxCommit', () => {

    let requestManagerSendSpy: jest.Mock;
    let requestManager: RWeb3RequestManager;

    beforeAll(() => {
        requestManager = new RWeb3RequestManager('http://127.0.0.1:8545');
        requestManagerSendSpy = jest.fn();
        requestManager.send = requestManagerSendSpy;
    });

    it('should call requestManager.send with broadcastTxCommit method', async () => {


        const tx = TrxProto.fromJSON({
            version: 0,
            time: new Date().getTime(),
            nonce: 0,
            from: new Uint8Array(0),
            to: new Uint8Array(0),
            Amount: new Uint8Array(0),
            Gas: new Uint8Array(0),
            type: 0,
            Payload: new Uint8Array(0),
            sig: new Uint8Array(0)
        });

        const wr = TrxProto.encode(tx);
        const txbz = wr.finish();

        await rigoRpcMethods.broadcastTxCommit(requestManager, Buffer.from(txbz).toString('base64'));

        expect(requestManagerSendSpy).toHaveBeenCalledWith({
            method: 'broadcast_tx_commit',
            params: {tx: Buffer.from(txbz).toString('base64')},
        });
    });
});




describe('broadcastTxCommit develop server call', () => {

    let requestManager: RWeb3RequestManager;

    beforeAll(() => {
        requestManager = new RWeb3RequestManager(DEV_SERVER);
    });

    it.each(testData)(
        'broadcastTxCommit should call success return',
        async (_parameter, _response) => {
            let returnValue = await rigoRpcMethods.broadcastTxCommit(requestManager, _parameter.tx);
            console.log(JSON.stringify(returnValue));
        }
    );
});


