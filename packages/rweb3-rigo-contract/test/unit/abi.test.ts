import { Contract } from '../../src';
import erc20Json from '../fixtures/erc20-abi.json';
import { getTestWsServer } from './e2e_utils';
import WebsocketProvider from 'rweb3-providers-ws';

describe('abi test', () => {
    it('abi json import', () => {
        console.log(erc20Json);

        let erc20Contract = new Contract(erc20Json);

        erc20Contract.setProvider(new WebsocketProvider(getTestWsServer()));

        console.log(erc20Contract);

        expect(1).toEqual(1);
    });
});
