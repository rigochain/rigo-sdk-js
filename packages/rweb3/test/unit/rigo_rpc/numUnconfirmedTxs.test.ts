import { RWeb3 } from '../../../src';
import { getDevServer, getTestWsServer } from '../e2e_utils';
import { NumUnconfirmedTxsResponse } from 'rweb3-types';

describe('numUnconfirmedTxs check ', () => {
    let devServerRWeb3Instance: RWeb3;
    let testWebsocketRWeb3Instance: RWeb3;

    beforeAll(() => {
        devServerRWeb3Instance = new RWeb3(getDevServer());
        testWebsocketRWeb3Instance = new RWeb3(getTestWsServer());
    });

    it('should call rweb3 with devServerRWeb3Instance.numUnconfirmedTxs method success return', async () => {
        let numUnconfirmedTxsResponse: NumUnconfirmedTxsResponse =
            await devServerRWeb3Instance.rigo.numUnconfirmedTxs();

        console.log(JSON.stringify(numUnconfirmedTxsResponse));
    });

    it('should call rweb3 with testWebsocketRWeb3Instance.numUnconfirmedTxs() method success return', async () => {
        let testNumUnconfirmedTxsResponse: NumUnconfirmedTxsResponse =
            await testWebsocketRWeb3Instance.rigo.numUnconfirmedTxs();

        console.log(JSON.stringify(testNumUnconfirmedTxsResponse));
    });
});
