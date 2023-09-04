import { RWeb3 } from '../../../src';
import { getTestWsServer } from '../e2e_utils';
import { BlockResponse } from 'rweb3-types';
import { hexStringToUint8Array } from 'rweb3-utils';

describe('blockByHash check ', () => {
    let testWebsocketRWeb3Instance: RWeb3;

    beforeAll(() => {
        testWebsocketRWeb3Instance = new RWeb3(getTestWsServer());
    });

    it('should call rweb3 with testWebsocketRWeb3Instance.blockByHash(AA04B4AAE915679B72CBB6A3BA83078F6120E9035A1634A7DBD3BD2A29A573F9) method success return', async () => {
        let testBlockResponse: BlockResponse = await testWebsocketRWeb3Instance.rigo.blockByHash(
            'AA04B4AAE915679B72CBB6A3BA83078F6120E9035A1634A7DBD3BD2A29A573F9',
        );

        console.log(JSON.stringify(testBlockResponse));

        expect(testBlockResponse.block.header.height == 5098348).toBe(true);
    });
});
