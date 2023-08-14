import {RWeb3RequestManager} from 'rweb3-core';

import {rigoRpcMethods} from '../../../src/index';
import {getDevServer} from "../e2e_utils";
import {testData} from "./fixtures/validators";
import {ValidatorsResponse} from "rweb3-types/lib/types";

describe('validators', () => {

    let requestManagerSendSpy: jest.Mock;
    let requestManager: RWeb3RequestManager;

    beforeAll(() => {
        requestManager = new RWeb3RequestManager('http://127.0.0.1:8545');
        requestManagerSendSpy = jest.fn();
        requestManager.send = requestManagerSendSpy;
    });

    it('should call requestManager.send with validators method', async () => {

        const height = 1;
        const page = 2;
        const per_page = 3;

        await rigoRpcMethods.validators(requestManager, height, page, per_page);

        expect(requestManagerSendSpy).toHaveBeenCalledWith({
            method: 'validators',
            params: {
                height: height.toString(10),
                page: page.toString(10),
                per_page: per_page.toString(10),
            },
        });
    });
});


describe('validators develop server call', () => {

    let requestManager: RWeb3RequestManager;

    beforeAll(() => {
        requestManager = new RWeb3RequestManager(getDevServer());
    });

    it.each(testData)(
        'validators should call success return',
        async (_parameter, _response) => {

            // TODO : 여기 에러 남
            let returnValue: ValidatorsResponse = await rigoRpcMethods.validators(requestManager, _parameter.height, _parameter.page, _parameter.per_page);

            console.log("validators return", JSON.stringify(returnValue));

        }
    );
});
