import { RWeb3 } from '../../../src';
import { getTestWsServer } from '../e2e_utils';
import { BlockResultsResponse } from 'rweb3-types';

describe('blockResults check ', () => {
    let testWebsocketRWeb3Instance: RWeb3;

    beforeAll(() => {
        testWebsocketRWeb3Instance = new RWeb3(getTestWsServer());
    });

    it('should call rweb3 with testWebsocketRWeb3Instance.blockResults(AA04B4AAE915679B72CBB6A3BA83078F6120E9035A1634A7DBD3BD2A29A573F9) method success return', async () => {
        let testBlockResultsResponse: BlockResultsResponse =
            await testWebsocketRWeb3Instance.rigo.blockResults(10000);

        console.log(JSON.stringify(testBlockResultsResponse));
    });
});
