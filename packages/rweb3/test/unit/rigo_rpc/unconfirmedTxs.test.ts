import { RWeb3 } from '../../../src';
import { getDevServer, getTestWsServer } from '../e2e_utils';
import { UnconfirmedTxsResponse } from 'rweb3-types';

describe('unconfirmedTxs check ', () => {
    let devServerRWeb3Instance: RWeb3;
    let testWebsocketRWeb3Instance: RWeb3;

    beforeAll(() => {
        devServerRWeb3Instance = new RWeb3(getDevServer());
        testWebsocketRWeb3Instance = new RWeb3(getTestWsServer());
    });

    it('should call rweb3 with devServerRWeb3Instance.getunconfirmedTxs method success return', async () => {
        let unconfirmedTxsResponse: UnconfirmedTxsResponse =
            await devServerRWeb3Instance.rigo.unconfirmedTxs(10);

        console.log(JSON.stringify(unconfirmedTxsResponse));
    });

    it('should call rweb3 with testWebsocketRWeb3Instance.getunconfirmedTxs method success return', async () => {
        let websocketUnconfirmedTxsResponse: UnconfirmedTxsResponse =
            await testWebsocketRWeb3Instance.rigo.unconfirmedTxs(10);
        console.log(JSON.stringify(websocketUnconfirmedTxsResponse));
    });
});
