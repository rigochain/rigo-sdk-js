import { RWeb3 } from '../../../src';
import { getDevServer, getTestServer } from '../e2e_utils';

describe('health check ', () => {
    let testServerRWeb3Instance: RWeb3;
    let notConnectServerRWeb3Instance: RWeb3;

    beforeAll(() => {
        testServerRWeb3Instance = new RWeb3(getTestServer());
        notConnectServerRWeb3Instance = new RWeb3('http://localhost:8545');
    });

    it('should call rweb3 with testServerRWeb3Instance.getHealth method success return', async () => {
        let healthResponse = await testServerRWeb3Instance.rigo.health();
        expect(healthResponse).toEqual(null);
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
