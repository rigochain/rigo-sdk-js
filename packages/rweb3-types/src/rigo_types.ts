import {Bytes, HexString, Numbers} from './primitives_types.js';

export type ValueTypes = 'address' | 'bool' | 'string' | 'int256' | 'uint256' | 'bytes' | 'bigint';
// Hex encoded 32 bytes
export type HexString32Bytes = HexString;
// Hex encoded 16 bytes
export type HexString16Bytes = HexString;
// Hex encoded 8 bytes
export type HexString8Bytes = HexString;
// Hex encoded 1 byte
export type HexStringSingleByte = HexString;
// Hex encoded 1 byte
export type HexStringBytes = HexString;
// Hex encoded 256 byte
export type HexString256Bytes = HexString;
// Hex encoded unsigned integer
export type Uint = HexString;
// Hex encoded unsigned integer 32 bytes
export type Uint256 = HexString;
// Hex encoded address
export type Address = HexString;

export type Topic = HexString32Bytes;

export type TransactionHash = HexString;



//
// {
// 	key: 'DF976A96545DAD0E0B14FED615587A89BA980B84',
// 		value: {
// 	address: 'DF976A96545DAD0E0B14FED615587A89BA980B84',
// 		nonce: '0',
// 		balance: '0'
// }
// }
export interface AddressBase<AddressType> {
    key: AddressType;
    value: {
        address: AddressType;
        nonce: Numbers;
        balance: Numbers;
    }
}
