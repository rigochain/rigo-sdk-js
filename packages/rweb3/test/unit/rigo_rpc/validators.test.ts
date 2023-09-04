import { RWeb3 } from '../../../src';
import { getTestWsServer } from '../e2e_utils';
import { ValidatorsResponse } from 'rweb3-types';

describe('validators check ', () => {
    let testWebsocketRWeb3Instance: RWeb3;

    beforeAll(() => {
        testWebsocketRWeb3Instance = new RWeb3(getTestWsServer());
    });

    it('should call rweb3 with testWebsocketRWeb3Instance.validators method success return', async () => {
        let testValidatorsResponse: ValidatorsResponse =
            await testWebsocketRWeb3Instance.rigo.validators(10000);

        console.log(JSON.stringify(testValidatorsResponse));
    });
});
