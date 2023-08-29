import { RWeb3 } from '../../../src';
import {
    getDevAccountAddress,
    getDevServer,
    getTestAccountAddress,
    getTestWsServer,
} from '../e2e_utils';
import { AccountResponse } from 'rweb3-types';

describe('account check ', () => {
    let devServerRWeb3Instance: RWeb3;
    let testWebsocketRWeb3Instance: RWeb3;

    beforeAll(() => {
        devServerRWeb3Instance = new RWeb3(getDevServer());
        testWebsocketRWeb3Instance = new RWeb3(getTestWsServer());
    });

    it('should call rweb3 with devServerRWeb3Instance.account method success return', async () => {
        let devAccountAddress = getDevAccountAddress();

        let devAccountResponse: AccountResponse = await devServerRWeb3Instance.rigo.account(
            devAccountAddress,
        );

        console.log(JSON.stringify(devAccountResponse));
    });

    it('should call rweb3 with testWebsocketRWeb3Instance.account method success return', async () => {
        let testAccountAddress = getTestAccountAddress();
        let testAccountResponse: AccountResponse = await testWebsocketRWeb3Instance.rigo.account(
            testAccountAddress,
        );

        console.log(JSON.stringify(testAccountResponse));
    });
});
