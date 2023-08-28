import { RWeb3 } from '../../../src';
import { getDevServer, getTestWsServer } from '../e2e_utils';
import { TxResponse } from 'rweb3-types';

describe('txSearch check ', () => {
    let devServerRWeb3Instance: RWeb3;
    let testWebsocketRWeb3Instance: RWeb3;

    beforeAll(() => {
        devServerRWeb3Instance = new RWeb3(getDevServer());
        testWebsocketRWeb3Instance = new RWeb3(getTestWsServer());
    });

    it('should call rweb3 with devServerRWeb3Instance.txSearch method success return', async () => {
        let txResponse: TxResponse = await devServerRWeb3Instance.rigo.tx(
            'e9125ac8b3b334a1190d1171b88fde6f2425c73e818fe33f9f463884b642cc28',
        );

        console.log(JSON.stringify(txResponse));
    });

    it('should call rweb3 with testWebsocketRWeb3Instance.txSearch method success return', async () => {
        let testTxResponse: TxResponse = await testWebsocketRWeb3Instance.rigo.tx(
            'fd8341ee700bae1f3fc95662485dcdb16a855c6793b4226d45b5cf4e5ce94d3c',
        );

        console.log(JSON.stringify(testTxResponse));
    });
});
