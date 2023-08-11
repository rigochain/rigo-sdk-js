import {RWeb3RequestManager} from 'rweb3-core';

import {rigoRpcMethods} from '../../../src/index';
import {testData} from "./fixtures/consensus_state";
import {getDevServer} from "../e2e_utils";

describe('consensusState', () => {

    let requestManagerSendSpy: jest.Mock;
    let requestManager: RWeb3RequestManager;

    beforeAll(() => {
        requestManager = new RWeb3RequestManager('http://127.0.0.1:8545');
        requestManagerSendSpy = jest.fn();
        requestManager.send = requestManagerSendSpy;
    });

    it('should call requestManager.send with consensusState method', async () => {

        await rigoRpcMethods.consensusState(requestManager);

        // call number 1 of requestManagerSendSpy
        expect(requestManagerSendSpy).toHaveBeenCalledWith({
            method: 'consensus_state',
            params: {}
        });
    });
});



describe('consensusState develop server call', () => {

    let requestManager: RWeb3RequestManager;

    beforeAll(() => {
        requestManager = new RWeb3RequestManager(getDevServer());
    });

    it.each(testData)(
        'consensusState should call success return',
        async (_parameter, _response) => {

            let returnValue = await rigoRpcMethods.consensusState(requestManager);
            console.log("consensusState", JSON.stringify(returnValue));

            // 값 비교 불가 -> 계속 변경 됨.
            // expect(returnValue).toEqual(
            //     _response
            // )
        }
    );
});