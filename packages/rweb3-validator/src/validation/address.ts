/*
    Copyright 2023 All Rigo Chain Developers

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/

import { keccak256 } from 'ethereum-cryptography/keccak.js';
import { utf8ToBytes } from 'ethereum-cryptography/utils.js';
import { ValidInputTypes } from '../types.js';
import { uint8ArrayToHexString } from '../utils.js';
import { isHexStrict } from './string.js';

/**
 * Checks the checksum of a given address. Will also return false on non-checksum addresses.
 */
export const checkAddressCheckSum = (data: string): boolean => {
    if (!/^(0x)?[0-9a-f]{40}$/i.test(data)) return false;
    const address = data.slice(2);
    const updatedData = utf8ToBytes(address.toLowerCase());

    const addressHash = uint8ArrayToHexString(keccak256(updatedData)).slice(2);

    for (let i = 0; i < 40; i += 1) {
        // the nth letter should be uppercase if the nth digit of casemap is 1
        if (
            (parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i]) ||
            (parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i])
        ) {
            return false;
        }
    }
    return true;
};

/**
 * Checks if a given string is a valid Ethereum address. It will also check the checksum, if the address has upper and lowercase letters.
 */
export const isAddress = (value: ValidInputTypes, checkChecksum = true) => {
    if (typeof value !== 'string' && !(value instanceof Uint8Array)) {
        return false;
    }

    let valueToCheck: string;

    if (value instanceof Uint8Array) {
        valueToCheck = uint8ArrayToHexString(value);
    } else if (typeof value === 'string' && !isHexStrict(value)) {
        valueToCheck = value.toLowerCase().startsWith('0x') ? value : `0x${value}`;
    } else {
        valueToCheck = value;
    }

    // check if it has the basic requirements of an address
    if (!/^(0x)?[0-9a-f]{40}$/i.test(valueToCheck)) {
        return false;
    }
    // If it's ALL lowercase or ALL upppercase
    if (
        /^(0x|0X)?[0-9a-f]{40}$/.test(valueToCheck) ||
        /^(0x|0X)?[0-9A-F]{40}$/.test(valueToCheck)
    ) {
        return true;
        // Otherwise check each case
    }
    return checkChecksum ? checkAddressCheckSum(valueToCheck) : true;
};
