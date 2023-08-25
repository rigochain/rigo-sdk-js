import { RWeb3 } from '../../../src';
import { getDevServer, getDevWsServer } from '../e2e_utils';

describe('health check ', () => {
    let devServerRWeb3Instance: RWeb3;
    let devWeboscketServerRWeb3Instance: RWeb3;
    let notConnectServerRWeb3Instance: RWeb3;

    beforeAll(() => {
        devServerRWeb3Instance = new RWeb3(getDevServer());
        devWeboscketServerRWeb3Instance = new RWeb3(getDevWsServer());
        notConnectServerRWeb3Instance = new RWeb3('http://localhost:8545');
    });

    it('should call rweb3 with devServerRWeb3Instance.getHealth method success return', async () => {
        let healthResponse = await devServerRWeb3Instance.rigo.health();
        expect(healthResponse).toEqual({});
    });

    it('should call rweb3 with devWebsocketServerRWeb3Instance.getHealth method success return', async () => {
        let healthResponse = await devWeboscketServerRWeb3Instance.rigo.health();
        expect(healthResponse).toEqual({});
    });

    it('should call rweb3 with notConnectServerRWeb3Instance.getHealth method fail return', async () => {
        try {
            await notConnectServerRWeb3Instance.rigo.health();
            // 여기가 실패 떨어 져야 한다.
            expect(true).toBe(false);
        } catch (e) {
            console.log(e);
            expect(true).toBe(true);
        }
    });
});
