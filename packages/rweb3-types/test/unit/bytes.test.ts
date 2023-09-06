import { BytesUint8Array } from '../../src';
import cryptojs from 'crypto-js';

describe('BytesUint8Array class tests', () => {
    test('fromHex', () => {
        const hex = '0x123abc';
        const bytes = BytesUint8Array.fromHex(hex);
        expect(bytes.toHex()).toBe(hex.substring(2));
    });

    test('fromWords', () => {
        const wordArray = cryptojs.enc.Hex.parse('123abc');
        const bytes = BytesUint8Array.fromWords(wordArray);
        expect(bytes.toHex()).toBe(wordArray.toString());
    });

    test('parse - hex', () => {
        const hex = '123abc';
        const bytes = BytesUint8Array.parse(hex, 'hex');
        expect(bytes.toHex()).toBe(hex);
    });

    test('parse - words', () => {
        const wordArray = cryptojs.enc.Hex.parse('123abc');
        const bytes = BytesUint8Array.parse(wordArray, 'words');
        expect(bytes.toHex()).toBe(wordArray.toString());
    });

    test('toHex', () => {
        const hex = '123abc';
        const bytes = BytesUint8Array.fromHex(hex);
        expect(bytes.toHex()).toBe(hex);
    });

    test('toWords', () => {
        const wordArray = cryptojs.enc.Hex.parse('123abc');
        const bytes = BytesUint8Array.fromWords(wordArray);
        expect(bytes.toWords().toString()).toBe(wordArray.toString());
    });

    test('isEqual', () => {
        const hex = '123abc';
        const bytes1 = BytesUint8Array.fromHex(hex);
        const bytes2 = BytesUint8Array.fromHex(hex);
        const bytes3 = BytesUint8Array.fromHex('456def');
        expect(bytes1.isEqual(bytes2)).toBeTruthy();
        expect(bytes1.isEqual(bytes3)).toBeFalsy();
    });

    test('b64ToBytes', () => {
        const base64 = Buffer.from('123abc', 'hex').toString('base64');
        const bytes = BytesUint8Array.b64ToBytes(base64);
        expect(bytes.toHex()).toBe('123abc');
    });
});
