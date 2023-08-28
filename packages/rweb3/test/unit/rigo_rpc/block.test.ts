import { RWeb3 } from '../../../src';
import { getDevServer, getTestWsServer } from '../e2e_utils';
import { BlockResponse } from 'rweb3-types';

describe('blockchain check ', () => {
    let devServerRWeb3Instance: RWeb3;
    let testWebsocketRWeb3Instance: RWeb3;

    beforeAll(() => {
        devServerRWeb3Instance = new RWeb3(getDevServer());
        testWebsocketRWeb3Instance = new RWeb3(getTestWsServer());
    });

    it('should call rweb3 with devServerRWeb3Instance.block method success return', async () => {
        let devBlockResponse: BlockResponse = await devServerRWeb3Instance.rigo.block();

        console.log(JSON.stringify(devBlockResponse));

        expect(devBlockResponse.block.header.height > 0).toBe(true);
    });

    it('should call rweb3 with testWebsocketRWeb3Instance.block method success return', async () => {
        let testBlockResponse: BlockResponse = await testWebsocketRWeb3Instance.rigo.block();

        console.log(JSON.stringify(testBlockResponse));

        expect(testBlockResponse.block.header.height > 0).toBe(true);
    });

    it('should call rweb3 with testWebsocketRWeb3Instance.block(10000) method success return', async () => {
        let testBlockResponse: BlockResponse = await testWebsocketRWeb3Instance.rigo.block(10000);

        console.log(JSON.stringify(testBlockResponse));
        console.log(testBlockResponse.block.header.height);
        console.log(typeof testBlockResponse.block.header.height);

        expect(testBlockResponse.block.header.height == 10000).toBe(true);
    });
});
