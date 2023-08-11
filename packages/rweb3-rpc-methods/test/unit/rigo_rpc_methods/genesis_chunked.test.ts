import {RWeb3RequestManager} from 'rweb3-core';

import {rigoRpcMethods} from '../../../src/index';
import {testData} from "./fixtures/genesis_chunked";
import {getDevServer} from "../e2e_utils";

describe('genesisChunked', () => {

    let requestManagerSendSpy: jest.Mock;
    let requestManager: RWeb3RequestManager;

    beforeAll(() => {
        requestManager = new RWeb3RequestManager('http://127.0.0.1:8545');
        requestManagerSendSpy = jest.fn();
        requestManager.send = requestManagerSendSpy;
    });

    it('should call requestManager.send with genesisChunked method', async () => {

        let chunk = 1

        await rigoRpcMethods.genesisChunked(requestManager, chunk);

        expect(requestManagerSendSpy).toHaveBeenCalledWith({
            method: 'genesis_chunked',
            params: {
                chunk: chunk.toString(10)
            },
        });
    });
});


describe('genesisChunked develop server call', () => {

    let requestManager: RWeb3RequestManager;

    beforeAll(() => {
        requestManager = new RWeb3RequestManager(getDevServer());
    });

    it.each(testData)(
        'genesisChunked should call success return',
        async (_parameter, _response) => {

            let returnValue = await rigoRpcMethods.genesisChunked(requestManager, _parameter.chunk);

            console.log("genesisChunked", JSON.stringify(returnValue));

            expect(returnValue).toEqual(
                _response
            )
        }
    );
});