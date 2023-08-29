import { RWeb3 } from '../../../src';
import { getDevAccountAddress, getDevServer, getTestWsServer } from '../e2e_utils';
import { StakesResponse } from 'rweb3-types';

describe('stakes check ', () => {
    let devServerRWeb3Instance: RWeb3;
    let testWebsocketRWeb3Instance: RWeb3;

    beforeAll(() => {
        devServerRWeb3Instance = new RWeb3(getDevServer());
        testWebsocketRWeb3Instance = new RWeb3(getTestWsServer());
    });

    it('should call rweb3 with devServerRWeb3Instance.stakes method success return', async () => {
        let devAccountAddress = getDevAccountAddress();

        let devStakeResponse: StakesResponse = await devServerRWeb3Instance.rigo.stakes(
            devAccountAddress,
        );

        console.log(JSON.stringify(devStakeResponse));
    });

    it('should call rweb3 with testWebsocketRWeb3Instance.stakes method success return', async () => {
        let testAccountAddress = '736a9f6fa280a88599dc7fcd24e42975da89a5ae';
        let testStakeResponse: StakesResponse = await testWebsocketRWeb3Instance.rigo.stakes(
            testAccountAddress,
        );

        console.log(JSON.stringify(testStakeResponse));
    });
});
