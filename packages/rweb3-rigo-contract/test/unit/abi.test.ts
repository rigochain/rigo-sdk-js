import { Contract } from '../../src';
import erc20Json from '../fixtures/erc20-abi.json';
import { getTestWsServer } from './e2e_utils';
import WebsocketProvider from 'rweb3-providers-ws';

describe('abi test', () => {
    it('abi json import', async () => {
        let erc20Contract = new Contract(erc20Json, '0x4b007901049a210f8e1ce8f4d4ab8e6e1efd1b10');
        erc20Contract.setProvider(new WebsocketProvider(getTestWsServer()));

        let response = await erc20Contract.methods.decimals().call();

        console.log('response', response);

        expect(1).toEqual(1);
    });
});
