import { RWeb3 } from '../../../src';
import { getTestAccountAddress, getTestWsServer } from '../e2e_utils';
import { AccountResponse } from 'rweb3-types';

describe('account check ', () => {
    let testWebsocketRWeb3Instance: RWeb3;

    beforeAll(() => {
        testWebsocketRWeb3Instance = new RWeb3(getTestWsServer());
    });

    it('should call rweb3 with testWebsocketRWeb3Instance.account method success return', async () => {
        let testAccountAddress = getTestAccountAddress();
        let testAccountResponse: AccountResponse = await testWebsocketRWeb3Instance.rigo.account(
            testAccountAddress,
        );

        console.log(JSON.stringify(testAccountResponse));

        expect(testAccountResponse.key.toLowerCase()).toEqual(testAccountAddress.toLowerCase());
        expect(testAccountResponse.value.address.toLowerCase()).toEqual(
            testAccountAddress.toLowerCase(),
        );
        expect(testAccountResponse.value.nonce).toBeDefined();
        expect(testAccountResponse.value.balance).toBeDefined();
    });
});
