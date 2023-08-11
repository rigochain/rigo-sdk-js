import {RWeb3RequestManager} from 'rweb3-core';

import {rigoRpcMethods} from '../../../src/index';
import {testData} from "./fixtures/account";
import {AddressBase, HexString} from "rweb3-types/lib/types";
import {getDevServer} from "../e2e_utils";

describe('account', () => {

    let requestManagerSendSpy: jest.Mock;
    let requestManager: RWeb3RequestManager;

    beforeAll(() => {
        requestManager = new RWeb3RequestManager('http://127.0.0.1:8545');
        requestManagerSendSpy = jest.fn();
        requestManager.send = requestManagerSendSpy;
    });

    it('should call requestManager.send with account method', async () => {

        const addr = 'DF976A96545DAD0E0B14FED615587A89BA980B84';

        await rigoRpcMethods.account(requestManager, addr);

        expect(requestManagerSendSpy).toHaveBeenCalledWith({
            method: 'account',
            params: {
                addr: addr,
            },
        });
    });
});


describe('abciQuery develop server call', () => {

    let requestManager: RWeb3RequestManager;

    beforeAll(() => {
        requestManager = new RWeb3RequestManager(getDevServer());
    });

    it.each(testData)(
        'abciQuery should call success return',
        async (_address, _response) => {

            let returnValue = await rigoRpcMethods.account(requestManager, _address);

            expect(isResponseAccount(returnValue)).toBeTruthy();

            // 해당 주소의 값은 바뀔 수 있음..
            expect(returnValue).toEqual(
                _response
            )
        }
    );
});

function isResponseAccount(obj: any): obj is AddressBase<HexString> {
    return typeof obj.key === 'string' &&
        typeof obj.value.address === 'string' &&
        typeof obj.value.nonce === 'string' &&
        typeof obj.value.balance === 'string';
}