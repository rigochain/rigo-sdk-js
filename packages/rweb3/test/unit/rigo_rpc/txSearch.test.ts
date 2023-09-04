import { RWeb3 } from '../../../src';
import { getTestWsServer } from '../e2e_utils';
import { TxSearchResponse } from 'rweb3-types';

describe('txSearch check ', () => {
    let testWebsocketRWeb3Instance: RWeb3;

    beforeAll(() => {
        testWebsocketRWeb3Instance = new RWeb3(getTestWsServer());
    });

    it('should call rweb3 with testWebsocketRWeb3Instance.txSearch method success return', async () => {
        let testTxSearchResponse: TxSearchResponse = await testWebsocketRWeb3Instance.rigo.txSearch(
            'tx.height=1',
        );

        console.log(JSON.stringify(testTxSearchResponse));
    });
});
