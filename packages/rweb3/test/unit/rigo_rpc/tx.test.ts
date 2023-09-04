import { RWeb3 } from '../../../src';
import { getTestWsServer } from '../e2e_utils';
import { TxResponse } from 'rweb3-types';

describe('txSearch check ', () => {
    let testWebsocketRWeb3Instance: RWeb3;

    beforeAll(() => {
        testWebsocketRWeb3Instance = new RWeb3(getTestWsServer());
    });

    it('should call rweb3 with testWebsocketRWeb3Instance.txSearch method success return', async () => {
        let testTxResponse: TxResponse = await testWebsocketRWeb3Instance.rigo.tx(
            'fd8341ee700bae1f3fc95662485dcdb16a855c6793b4226d45b5cf4e5ce94d3c',
        );

        console.log(JSON.stringify(testTxResponse));
    });
});
