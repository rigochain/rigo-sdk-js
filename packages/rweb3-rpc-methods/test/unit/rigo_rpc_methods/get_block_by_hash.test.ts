import {RWeb3RequestManager} from 'rweb3-core';

import {rigoRpcMethods} from '../../../src/index';
import {Bytes} from "rweb3-utils";

describe('queryBlockByHash', () => {

    let requestManagerSendSpy: jest.Mock;
    let requestManager: RWeb3RequestManager;

    beforeAll(() => {
        requestManager = new RWeb3RequestManager('http://127.0.0.1:8545');
        requestManagerSendSpy = jest.fn();
        requestManager.send = requestManagerSendSpy;
    });

    it('should call requestManager.send with queryBlockByHash method', async () => {

        const hash = Bytes.fromHex("0x1234");

        await rigoRpcMethods.queryBlockByHash(requestManager, hash);

        expect(requestManagerSendSpy).toHaveBeenCalledWith({
            method: 'block_by_hash',
            params: {hash: Buffer.from(hash).toString('base64')},
        });
    });
});