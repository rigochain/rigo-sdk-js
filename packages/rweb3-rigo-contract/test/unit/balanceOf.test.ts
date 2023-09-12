import { Contract } from '../../src';
import { Contract as Web3Contract } from 'web3-eth-contract';
import erc20Json from '../fixtures/erc20-abi.json';
import { getTestWsServer } from './e2e_utils';
import WebsocketProvider from 'rweb3-providers-ws';

describe('deploy test', () => {
    it('balanceOf function', (done) => {
        let erc20Contract = new Contract(
            erc20Json,
            '4b007901049a210f8e1ce8f4d4ab8e6e1efd1b10',
        ) as any;

        erc20Contract.methods
            .balanceOf('736A9F6FA280A88599DC7FCD24E42975DA89A5AE')
            .call()
            .then((balance: string) => {
                console.log('balance', balance);
                done();
            });
    });

    // it('web3 balanceOf function', (done) => {
    //     let web3Contract = new Web3Contract(erc20Json, '4b007901049a210f8e1ce8f4d4ab8e6e1efd1b10');
    //     web3Contract.setProvider(new WebsocketProvider(getTestWsServer()));
    //     web3Contract.methods
    //         .balanceOf('736A9F6FA280A88599DC7FCD24E42975DA89A5AE')
    //         .call()
    //         .then((balance) => {
    //             console.log('balance', balance);
    //             done();
    //         });
    // });
});
