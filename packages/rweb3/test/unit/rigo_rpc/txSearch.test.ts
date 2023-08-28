import { RWeb3 } from '../../../src';
import { getDevServer, getTestWsServer } from '../e2e_utils';
import { TxSearchResponse } from 'rweb3-types';

describe('txSearch check ', () => {
    let devServerRWeb3Instance: RWeb3;
    let testWebsocketRWeb3Instance: RWeb3;

    beforeAll(() => {
        devServerRWeb3Instance = new RWeb3(getDevServer());
        testWebsocketRWeb3Instance = new RWeb3(getTestWsServer());
    });

    it('should call rweb3 with devServerRWeb3Instance.txSearch method success return', async () => {
        let txSearchResponse: TxSearchResponse = await devServerRWeb3Instance.rigo.txSearch(
            'tx.height=602494',
        );

        console.log(JSON.stringify(txSearchResponse));
    });

    it('should call rweb3 with testWebsocketRWeb3Instance.txSearch method success return', async () => {
        let testTxSearchResponse: TxSearchResponse = await testWebsocketRWeb3Instance.rigo.txSearch(
            'tx.height=1',
        );

        console.log(JSON.stringify(testTxSearchResponse));
    });
});
