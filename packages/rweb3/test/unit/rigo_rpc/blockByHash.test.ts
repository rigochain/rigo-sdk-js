import { RWeb3 } from '../../../src';
import { getDevServer, getTestWsServer } from '../e2e_utils';
import { BlockResponse } from 'rweb3-types';
import { hexStringToUint8Array } from 'rweb3-utils';

describe('blockByHash check ', () => {
    let devServerRWeb3Instance: RWeb3;
    let testWebsocketRWeb3Instance: RWeb3;

    beforeAll(() => {
        devServerRWeb3Instance = new RWeb3(getDevServer());
        testWebsocketRWeb3Instance = new RWeb3(getTestWsServer());
    });

    it('should call rweb3 with devServerRWeb3Instance.blockByHash method success return', async () => {
        let devBlockResponse: BlockResponse = await devServerRWeb3Instance.rigo.blockByHash(
            '9f24862990377ff0834cc4102ea6d0172705d2bac996d0b8ffeeddf511d427e4',
        );

        console.log(JSON.stringify(devBlockResponse));

        expect(devBlockResponse.block.header.height > 0).toBe(true);
    });

    it('should call rweb3 with testWebsocketRWeb3Instance.blockByHash(AA04B4AAE915679B72CBB6A3BA83078F6120E9035A1634A7DBD3BD2A29A573F9) method success return', async () => {
        let testBlockResponse: BlockResponse = await testWebsocketRWeb3Instance.rigo.blockByHash(
            'AA04B4AAE915679B72CBB6A3BA83078F6120E9035A1634A7DBD3BD2A29A573F9',
        );

        console.log(JSON.stringify(testBlockResponse));
        console.log(testBlockResponse.block.header.validators_hash);

        expect(testBlockResponse.block.header.height == 5098348).toBe(true);
    });

    it('should call rweb3 with testWebsocketRWeb3Instance.block(10000) method success return', async () => {
        let testBlockResponse: BlockResponse = await testWebsocketRWeb3Instance.rigo.blockByHash(
            hexStringToUint8Array(
                'AA04B4AAE915679B72CBB6A3BA83078F6120E9035A1634A7DBD3BD2A29A573F9',
            ),
        );

        console.log(JSON.stringify(testBlockResponse));
        console.log(testBlockResponse.block.header.validators_hash);

        expect(testBlockResponse.block.header.height == 5098348).toBe(true);
    });
});
