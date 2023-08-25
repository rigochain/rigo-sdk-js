import { RWeb3 } from '../../../src';
import { getDevServer, getDevWsServer } from '../e2e_utils';
import { StatusResponse } from 'rweb3-types';

describe('status check ', () => {
    let devServerRWeb3Instance: RWeb3;
    let devWebsocketRWeb3Instance: RWeb3;

    beforeAll(() => {
        devServerRWeb3Instance = new RWeb3(getDevServer());
        devWebsocketRWeb3Instance = new RWeb3(getDevWsServer());
    });

    it('should call rweb3 with devServerRWeb3Instance.getstatus method success return', async () => {
        let statusResponse: StatusResponse = await devServerRWeb3Instance.rigo.status();

        expect(statusResponse.node_info.channels).toEqual('40202122233038606100');
        expect(statusResponse.validator_info.pub_key.type).toEqual('tendermint/PubKeySecp256k1');
    });

    it('should call rweb3 with devWebsocketRWeb3Instance.getstatus method success return', async () => {
        let websocketStatusResponse: StatusResponse = await devWebsocketRWeb3Instance.rigo.status();

        console.log('websocketStatusResponse', websocketStatusResponse);

        expect(websocketStatusResponse.node_info.channels).toEqual('40202122233038606100');
        expect(websocketStatusResponse.validator_info.pub_key.type).toEqual(
            'tendermint/PubKeySecp256k1',
        );
    });
});
