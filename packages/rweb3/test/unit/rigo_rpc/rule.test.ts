import { RWeb3 } from '../../../src';
import { getDevServer, getTestWsServer } from '../e2e_utils';
import { RuleResponse } from 'rweb3-types';

describe('rule check ', () => {
    let devServerRWeb3Instance: RWeb3;
    let testWebsocketRWeb3Instance: RWeb3;

    beforeAll(() => {
        devServerRWeb3Instance = new RWeb3(getDevServer());
        testWebsocketRWeb3Instance = new RWeb3(getTestWsServer());
    });

    it('should call rweb3 with devServerRWeb3Instance.rule method success return', async () => {
        let ruleResponse: RuleResponse = await devServerRWeb3Instance.rigo.rule();

        console.log(JSON.stringify(ruleResponse));
    });

    it('should call rweb3 with testWebsocketRWeb3Instance.rule() method success return', async () => {
        let testRuleResponse: RuleResponse = await testWebsocketRWeb3Instance.rigo.rule();

        console.log(JSON.stringify(testRuleResponse));
    });
});
