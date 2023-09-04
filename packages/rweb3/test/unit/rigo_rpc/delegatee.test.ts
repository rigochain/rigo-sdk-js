import { RWeb3 } from '../../../src';
import { getTestWsServer } from '../e2e_utils';
import { DelegateeResponse } from 'rweb3-types';

describe('health check ', () => {
    let testWebsocketRWeb3Instance: RWeb3;

    beforeAll(() => {
        testWebsocketRWeb3Instance = new RWeb3(getTestWsServer());
    });

    it('should call rweb3 with testWebsocketRWeb3Instance.delegatee(736a9f6fa280a88599dc7fcd24e42975da89a5ae) method success return', async () => {
        let testDelegateeResponse: DelegateeResponse =
            await testWebsocketRWeb3Instance.rigo.delegatee(
                '736a9f6fa280a88599dc7fcd24e42975da89a5ae',
            );

        console.log(JSON.stringify(testDelegateeResponse));
    });
});
