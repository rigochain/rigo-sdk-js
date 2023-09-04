import { RWeb3 } from '../../../src';
import { getTestWsServer } from '../e2e_utils';
import { BlockchainResponse } from 'rweb3-types';

describe('blockchain check ', () => {
    let testWebsocketRWeb3Instance: RWeb3;

    beforeAll(() => {
        testWebsocketRWeb3Instance = new RWeb3(getTestWsServer());
    });

    it('should call rweb3 with testWebsocketRWeb3Instance.blockchain method success return', async () => {
        let testWebsocketBlockchainResponse: BlockchainResponse =
            await testWebsocketRWeb3Instance.rigo.blockchain();

        console.log(JSON.stringify(testWebsocketBlockchainResponse));

        expect(testWebsocketBlockchainResponse.last_height > 0).toBe(true);
    });

    it('should call rweb3 with testWebsocketRWeb3Instance.blockchain(10000, 10001) method success return', async () => {
        let testWebsocketBlockchainResponse: BlockchainResponse =
            await testWebsocketRWeb3Instance.rigo.blockchain(10000, 10001);

        console.log(JSON.stringify(testWebsocketBlockchainResponse));

        expect(testWebsocketBlockchainResponse.last_height > 0).toBe(true);
    });
});
