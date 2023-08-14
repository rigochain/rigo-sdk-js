import {RWeb3RequestManager} from 'rweb3-core';

import {rigoRpcMethods} from '../../../src/index';
import {testData} from "./fixtures/commit";
import {getDevServer} from "../e2e_utils";
import {CommitResponse} from "rweb3-types";

describe('commit', () => {

    let requestManagerSendSpy: jest.Mock;
    let requestManager: RWeb3RequestManager;

    beforeAll(() => {
        requestManager = new RWeb3RequestManager('http://127.0.0.1:8545');
        requestManagerSendSpy = jest.fn();
        requestManager.send = requestManagerSendSpy;
    });

    it('should call requestManager.send with commit method', async () => {

        let height = 1;

        await rigoRpcMethods.commit(requestManager, height);

        // call number 1 of requestManagerSendSpy
        expect(requestManagerSendSpy).toHaveBeenCalledWith({
            method: 'commit',
            params: {height: height.toString(10)},
        });
    });
});


describe('commit develop server call', () => {

    let requestManager: RWeb3RequestManager;

    beforeAll(() => {
        requestManager = new RWeb3RequestManager(getDevServer());
    });

    it.each(testData)(
        'commit should call success return',
        async (_parameter, _response) => {

            let returnValue: CommitResponse = await rigoRpcMethods.commit(requestManager, _parameter.height);

            console.log("commit header height", JSON.stringify(returnValue.signed_header.header.height));

        }
    );
});
