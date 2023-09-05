import { create, privateKeyToAccount } from '../../src';
import { RWeb3Account } from '../../src/types';

describe('func.ts class test', () => {
    it('create func test && privateKeyToAccount Equal', () => {
        let account: RWeb3Account = create();
        console.log(account.address);
        console.log(account.privateKey);

        let account2: RWeb3Account = privateKeyToAccount(account.privateKey);

        expect(account.address).toEqual(account2.address);
        expect(account.privateKey).toEqual(account2.privateKey);
    });
});
