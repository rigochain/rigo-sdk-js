import { RWeb3 } from '../../../src';
import { getTestWsServer } from '../e2e_utils';
import { UnconfirmedTxsResponse } from 'rweb3-types';

describe('unconfirmedTxs check ', () => {
    let testWebsocketRWeb3Instance: RWeb3;

    beforeAll(() => {
        testWebsocketRWeb3Instance = new RWeb3(getTestWsServer());
    });

    it('should call rweb3 with testWebsocketRWeb3Instance.getunconfirmedTxs method success return', async () => {
        let websocketUnconfirmedTxsResponse: UnconfirmedTxsResponse =
            await testWebsocketRWeb3Instance.rigo.unconfirmedTxs(10);
        console.log(JSON.stringify(websocketUnconfirmedTxsResponse));
    });
});
