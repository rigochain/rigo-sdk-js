import { RWeb3 } from '../../../src';
import { getDevServer, getTestWsServer } from '../e2e_utils';
import { CheckTxResponse } from 'rweb3-types';

describe('health check ', () => {
    let devServerRWeb3Instance: RWeb3;
    let testWebsocketRWeb3Instance: RWeb3;

    beforeAll(() => {
        devServerRWeb3Instance = new RWeb3(getDevServer());
        testWebsocketRWeb3Instance = new RWeb3(getTestWsServer());
    });

    // TODO : checkTx 성공 케이스 추가 필요함
    it('should call rweb3 with devServerRWeb3Instance.checkTx method success return', async () => {
        let checkTxResponse: CheckTxResponse = await devServerRWeb3Instance.rigo.checkTx('785');

        console.log(JSON.stringify(checkTxResponse));
    });

    it('should call rweb3 with testWebsocketRWeb3Instance.checkTx(AA04B4AAE915679B72CBB6A3BA83078F6120E9035A1634A7DBD3BD2A29A573F9) method success return', async () => {
        let testCheckTxResponse: CheckTxResponse = await testWebsocketRWeb3Instance.rigo.checkTx(
            'AA04B4AAE915679B72CBB6A3BA83078F6120E9035A1634A7DBD3BD2A29A573F9',
        );

        console.log(JSON.stringify(testCheckTxResponse));
    });
});
