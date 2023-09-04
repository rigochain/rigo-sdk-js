import { RWeb3 } from '../../../src';
import { getDevAccountAddress, getTestWsServer } from '../e2e_utils';
import { StakesResponse } from 'rweb3-types';

describe('stakes check ', () => {
    let testWebsocketRWeb3Instance: RWeb3;

    beforeAll(() => {
        testWebsocketRWeb3Instance = new RWeb3(getTestWsServer());
    });
    it('should call rweb3 with testWebsocketRWeb3Instance.stakes method success return', async () => {
        let testAccountAddress = '736a9f6fa280a88599dc7fcd24e42975da89a5ae';
        let testStakeResponse: StakesResponse = await testWebsocketRWeb3Instance.rigo.stakes(
            testAccountAddress,
        );

        console.log(JSON.stringify(testStakeResponse));
    });
});
