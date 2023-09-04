import { RWeb3 } from '../../../src';
import { getDevServer, getTestWsServer } from '../e2e_utils';
import { StatusResponse } from 'rweb3-types';

describe('status check ', () => {
    let testWebsocketRWeb3Instance: RWeb3;

    beforeAll(() => {
        testWebsocketRWeb3Instance = new RWeb3(getTestWsServer());
    });

    it('should call rweb3 with testWebsocketRWeb3Instance.getstatus method success return', async () => {
        let websocketStatusResponse: StatusResponse =
            await testWebsocketRWeb3Instance.rigo.status();

        expect(websocketStatusResponse.node_info.channels).toEqual('40202122233038606100');
        expect(websocketStatusResponse.validator_info.pub_key.type).toEqual(
            'tendermint/PubKeySecp256k1',
        );
    });
});
