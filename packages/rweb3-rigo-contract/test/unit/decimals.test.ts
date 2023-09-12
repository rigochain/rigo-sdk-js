import { Contract } from '../../src';
import erc20Json from '../fixtures/erc20-abi.json';
import { getTestProposalAccountPrivateKey, getTestWsServer } from './e2e_utils';
import WebsocketProvider from 'rweb3-providers-ws';
import { privateKeyToAccount, RWeb3Account } from 'rweb3-rigo-accounts';

describe('deploy test', () => {
    it('decimals function', (done) => {
        let erc20Contract = new Contract(erc20Json, '4b007901049a210f8e1ce8f4d4ab8e6e1efd1b10');
        erc20Contract.setProvider(new WebsocketProvider(getTestWsServer()));

        erc20Contract.methods
            .decimals()
            .call()
            .then((decimals) => {
                console.log('decimals', decimals);
                done();
            });
    });
});
