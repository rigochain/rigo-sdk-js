import {RWeb3RequestManager} from 'rweb3-core';

import {rigoRpcMethods} from '../../../src/index';
import {Bytes} from "rweb3-utils";
import {DEV_SERVER} from "./fixtures/test_constant";

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


describe('queryBlockByHash Develop Server Call ', () => {

    let requestManager: RWeb3RequestManager;

    beforeAll(() => {
        requestManager = new RWeb3RequestManager(DEV_SERVER);
    });

    it('should call requestManager.send with queryBlockByHash method', async () => {

        const hash = Bytes.fromHex("830e8a07d553e67be7fd021ce1fab3aa5616f71f132bb1dd52d61cc6dd8bfa81");

        let returnValue = await rigoRpcMethods.queryBlockByHash(requestManager, hash);

        console.log(returnValue);

        // TODO : 여기 같으면 안됨 찾아 야됨
        expect(returnValue).toEqual(
            {block_id: {hash: '', parts: {total: 0, hash: ''}}, block: null}
        )

    });
});



