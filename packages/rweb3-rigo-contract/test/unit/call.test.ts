import { Contract } from '../../src';
import erc20Json from '../fixtures/erc20-abi.json';
import { getTestProposalAccountPrivateKey, getTestWsServer } from './e2e_utils';
import WebsocketProvider from 'rweb3-providers-ws';
import { privateKeyToAccount, RWeb3Account } from 'rweb3-rigo-accounts';

describe('deploy test', () => {
    it('deploy function', (done) => {
        let erc20Contract = new Contract(erc20Json);
        erc20Contract.setProvider(new WebsocketProvider(getTestWsServer()));

        let rweb3account: RWeb3Account = privateKeyToAccount(getTestProposalAccountPrivateKey());

        erc20Contract.methods
            .balanceOf()
            .call(
                erc20Json,
                'balanceOf',
                '4b007901049a210f8e1ce8f4d4ab8e6e1efd1b10',
                ['736A9F6FA280A88599DC7FCD24E42975DA89A5AE'],
                rweb3account,
            )
            .then((balance) => {
                console.log('balance', balance);
                done();
            });
    });
});
