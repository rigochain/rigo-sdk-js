import { Contract } from '../../src';
import erc20Json from '../fixtures/erc20-abi.json';
import { getTestProposalAccountPrivateKey, getTestWsServer } from './e2e_utils';
import WebsocketProvider from 'rweb3-providers-ws';
import { privateKeyToAccount, RWeb3Account } from 'rweb3-rigo-accounts';

describe('deploy test', () => {
    it('deploy function', (done) => {
        let erc20Contract = new Contract(erc20Json);
        erc20Contract.setProvider(new WebsocketProvider(getTestWsServer()));

        console.log(erc20Contract);

        let rweb3account: RWeb3Account = privateKeyToAccount(getTestProposalAccountPrivateKey());

        console.log(rweb3account);

        // let data = erc20Contract.methods
        //     .Transfer('736A9F6FA280A88599DC7FCD24E42975DA89A5AE', '')
        //     .encodeABI();
    });
});
