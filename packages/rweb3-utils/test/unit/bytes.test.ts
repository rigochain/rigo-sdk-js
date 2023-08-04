import { Bytes } from '../../src';
import cryptojs from 'crypto-js';

describe("Bytes class tests", () => {

    test("fromHex", () => {
        const hex = '0x123abc';
        const bytes = Bytes.fromHex(hex);
        expect(bytes.toHex()).toBe(hex.substring(2));
    });

    test("fromWords", () => {
        const wordArray = cryptojs.enc.Hex.parse('123abc');
        const bytes = Bytes.fromWords(wordArray);
        expect(bytes.toHex()).toBe(wordArray.toString());
    });

    test("parse - hex", () => {
        const hex = '123abc';
        const bytes = Bytes.parse(hex, 'hex');
        expect(bytes.toHex()).toBe(hex);
    });

    test("parse - words", () => {
        const wordArray = cryptojs.enc.Hex.parse('123abc');
        const bytes = Bytes.parse(wordArray, 'words');
        expect(bytes.toHex()).toBe(wordArray.toString());
    });

    test("toHex", () => {
        const hex = '123abc';
        const bytes = Bytes.fromHex(hex);
        expect(bytes.toHex()).toBe(hex);
    });

    test("toWords", () => {
        const wordArray = cryptojs.enc.Hex.parse('123abc');
        const bytes = Bytes.fromWords(wordArray);
        expect(bytes.toWords().toString()).toBe(wordArray.toString());
    });

    test("isEqual", () => {
        const hex = '123abc';
        const bytes1 = Bytes.fromHex(hex);
        const bytes2 = Bytes.fromHex(hex);
        const bytes3 = Bytes.fromHex('456def');
        expect(bytes1.isEqual(bytes2)).toBeTruthy();
        expect(bytes1.isEqual(bytes3)).toBeFalsy();
    });

    test("rand", () => {
        const bytes = Bytes.rand(10);
        expect(bytes.length).toBe(10);
    });

    test("b64ToBytes", () => {
        const base64 = Buffer.from('123abc', 'hex').toString('base64');
        const bytes = Bytes.b64ToBytes(base64);
        expect(bytes.toHex()).toBe('123abc');
    });

});
