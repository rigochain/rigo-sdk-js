import BN from 'bn.js';
import {Bytes} from "../../src/bytes";
import Account from "../../src/Account";

// Mock the PrvKey and PubKey classes
jest.mock('../../src/prvKey');
jest.mock('../../src/pubKey');

// Get the mocked classes
const MockPrvKey = jest.requireMock('../../src/prvKey').default;
const MockPubKey = jest.requireMock('../../src/pubKey').default;

describe("Account class tests", () => {
    const nm = 'Test';
    const secret = 'secret';
    const d = new Bytes([]);

    test("New account creation", () => {
        const account = Account.New(nm);

        expect(account.name).toBe(nm);
        expect(account.nonce).toBe(0);
        expect(account.balance).toBe('0');
        expect(account.prvKey).toBeInstanceOf(MockPrvKey);
        expect(account.pubKey).toBeInstanceOf(MockPubKey);
        expect(account.address).toBeDefined();
    });

    test("Import account", () => {
        const account = Account.Import(nm, secret, d);

        expect(account.name).toBe(nm);
        expect(account.nonce).toBe(0);
        expect(account.balance).toBe('0');
        expect(account.prvKey).toBeInstanceOf(MockPrvKey);
        expect(account.pubKey).toBeInstanceOf(MockPubKey);
        expect(account.address).toBeDefined();
    });

    test("Unmarshal account", () => {
        const marshalData = JSON.stringify({
            address: 'address',
            name: nm,
            nonce: 0,
            balance: '0',
            prvKey: 'prvKey',
            pubKey: 'pubKey',
        });

        const account = Account.Unmarshal(marshalData);
        expect(account.name).toBe(nm);
        expect(account.nonce).toBe(0);
        expect(account.balance).toBe('0');
        expect(account.prvKey).toBeInstanceOf(MockPrvKey);
        expect(account.pubKey).toBeInstanceOf(MockPubKey);
        expect(account.address).toBeDefined();
    });

    test("Update account", () => {
        const account = Account.New(nm);
        account.update({address: account.address, nonce: 1, balance: '100'});

        expect(account.nonce).toBe(1);
        expect(account.balance).toBe('100');
    });

    test("Add balance to account", () => {
        const account = Account.New(nm);
        account.addBalance('100');

        expect(account.balance).toBe(new BN('100').toString(10));
    });

    test("Export account", () => {
        const account = Account.New(nm);
        const exportData = account.export();

        expect(exportData).toBeDefined();
    });

    test("Marshal account", () => {
        const account = Account.New(nm);
        const marshalData = account.marshal();
        const unmarshalData = JSON.parse(marshalData);

        expect(unmarshalData.address).toBe(account.address);
        expect(unmarshalData.name).toBe(account.name);
        expect(unmarshalData.nonce).toBe(account.nonce);
        expect(unmarshalData.balance).toBe(account.balance);
        expect(unmarshalData.prvKey).toBeDefined();
        expect(unmarshalData.pubKey).toBeDefined();
    });
});
