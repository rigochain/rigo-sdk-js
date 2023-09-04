import { RWeb3 } from '../../../src';
import { getTestWsServer } from '../e2e_utils';
import { RuleResponse } from 'rweb3-types';

describe('rule check ', () => {
    let testWebsocketRWeb3Instance: RWeb3;

    beforeAll(() => {
        testWebsocketRWeb3Instance = new RWeb3(getTestWsServer());
    });

    it('should call rweb3 with testWebsocketRWeb3Instance.rule() method success return', async () => {
        let testRuleResponse: RuleResponse = await testWebsocketRWeb3Instance.rigo.rule();

        console.log(JSON.stringify(testRuleResponse));
    });
});
