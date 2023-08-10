import {RWeb3RequestManager} from 'rweb3-core';

import {rigoRpcMethods} from '../../../src/index';
import {DEV_SERVER} from "./fixtures/test_constant";
import {testData} from "./fixtures/dump_consensus_state";

describe('dumpConsensusState', () => {

    let requestManagerSendSpy: jest.Mock;
    let requestManager: RWeb3RequestManager;

    beforeAll(() => {
        requestManager = new RWeb3RequestManager('http://127.0.0.1:8545');
        requestManagerSendSpy = jest.fn();
        requestManager.send = requestManagerSendSpy;
    });

    it('should call requestManager.send with dumpConsensusState method', async () => {

        await rigoRpcMethods.dumpConsensusState(requestManager);

        expect(requestManagerSendSpy).toHaveBeenCalledWith({
            method: 'dump_consensus_state',
            params: {},
        });
    });
});


describe('dumpConsensusState develop server call', () => {

    let requestManager: RWeb3RequestManager;

    beforeAll(() => {
        requestManager = new RWeb3RequestManager(DEV_SERVER);
    });

    it.each(testData)(
        'dumpConsensusState should call success return',
        async (_parameter, _response) => {

            let returnValue = await rigoRpcMethods.dumpConsensusState(requestManager);

            console.log("dumpConsensusState", JSON.stringify(returnValue));

            expect(returnValue).toEqual(
                _response
            )
        }
    );
});