import {RWeb3RequestManager} from 'rweb3-core';

import {rigoRpcMethods} from '../../../src/index';
import {Bytes} from "rweb3-utils";
import {testData} from "./fixtures/block_by_hash";
import {getDevServer} from "../e2e_utils";
import {BlockResponse} from "rweb3-types";

describe('blockByHash', () => {
    let requestManagerSendSpy: jest.Mock;

    let requestManager: RWeb3RequestManager;

    beforeAll(() => {
        requestManager = new RWeb3RequestManager('http://127.0.0.1:8545');
        requestManagerSendSpy = jest.fn();
        requestManager.send = requestManagerSendSpy;
    });

    it('should call requestManager.send with blockByHash method', async () => {

        const hash = Bytes.fromHex("0x1234");

        await rigoRpcMethods.blockByHash(requestManager, hash);

        expect(requestManagerSendSpy).toHaveBeenCalledWith({
            method: 'block_by_hash',
            params: {hash: Buffer.from(hash).toString('base64')},
        });
    });
});


describe('blockByHash Develop Server Call ', () => {

    let requestManager: RWeb3RequestManager;

    beforeAll(() => {
        requestManager = new RWeb3RequestManager(getDevServer());
    });

    it.each(testData)(
        'blockByHash should call success return',
        async (_hash, _response) => {

            const hash = Bytes.fromHex(_hash);

            let returnValue: BlockResponse = await rigoRpcMethods.blockByHash(requestManager, hash);


            console.log("blockByHash return", returnValue)

            // returnValue 의 모든 값이 undefined 가 아닌지 확인
            Object.values(returnValue).forEach(value => {
                expect(value).not.toBeUndefined();
            });
        }
    );
});


