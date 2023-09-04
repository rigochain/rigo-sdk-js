import { RWeb3 } from '../../../src';
import { getTestWsServer } from '../e2e_utils';
import { BlockResponse } from 'rweb3-types';

describe('blockchain check ', () => {
    let testWebsocketRWeb3Instance: RWeb3;

    beforeAll(() => {
        testWebsocketRWeb3Instance = new RWeb3(getTestWsServer());
    });

    it('should call rweb3 with testWebsocketRWeb3Instance.block method success return', async () => {
        let testBlockResponse: BlockResponse = await testWebsocketRWeb3Instance.rigo.block();

        console.log(JSON.stringify(testBlockResponse));

        expect(testBlockResponse.block_id.hash).toBeDefined();
        expect(testBlockResponse.block_id.parts.total > 0).toBe(true);
        expect(testBlockResponse.block.header.height > 0).toBe(true);
    });

    it('should call rweb3 with testWebsocketRWeb3Instance.block(10000) method success return', async () => {
        let test100BlockResponse: BlockResponse = await testWebsocketRWeb3Instance.rigo.block(
            10000,
        );

        console.log(JSON.stringify(test100BlockResponse));
        expect(test100BlockResponse.block_id.hash).toBeDefined();
        expect(test100BlockResponse.block_id.parts.total > 0).toBe(true);
        expect(test100BlockResponse.block.header.height == 10000).toBe(true);
    });
});
