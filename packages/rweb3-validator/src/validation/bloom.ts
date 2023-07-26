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
import { ValidInputTypes } from '../types.js';
import { codePointToInt, hexToUint8Array, padLeft, uint8ArrayToHexString } from '../utils.js';
import { isAddress } from './address.js';
import { isHexStrict } from './string.js';

export const isBloom = (bloom: ValidInputTypes): boolean => {
	if (typeof bloom !== 'string') {
		return false;
	}

	if (!/^(0x)?[0-9a-f]{512}$/i.test(bloom)) {
		return false;
	}

	if (/^(0x)?[0-9a-f]{512}$/.test(bloom) || /^(0x)?[0-9A-F]{512}$/.test(bloom)) {
		return true;
	}

	return false;
};

/**
 * Returns true if the value is part of the given bloom
 * note: false positives are possible.
 */
export const isInBloom = (bloom: string, value: string | Uint8Array): boolean => {
	if (typeof value === 'string' && !isHexStrict(value)) {
		return false;
	}

	if (!isBloom(bloom)) {
		return false;
	}

	const uint8Array = typeof value === 'string' ? hexToUint8Array(value) : value;

	const hash = uint8ArrayToHexString(keccak256(uint8Array)).slice(2);

	for (let i = 0; i < 12; i += 4) {
		// calculate bit position in bloom filter that must be active
		const bitpos =
			// eslint-disable-next-line no-bitwise
			((parseInt(hash.slice(i, i + 2), 16) << 8) + parseInt(hash.slice(i + 2, i + 4), 16)) &
			2047;

		// test if bitpos in bloom is active
		const code = codePointToInt(bloom.charCodeAt(bloom.length - 1 - Math.floor(bitpos / 4)));

		// eslint-disable-next-line no-bitwise
		const offset = 1 << bitpos % 4;

		// eslint-disable-next-line no-bitwise
		if ((code & offset) !== offset) {
			return false;
		}
	}

	return true;
};

/**
 * Returns true if the ethereum users address is part of the given bloom note: false positives are possible.
 */
export const isUserEthereumAddressInBloom = (bloom: string, ethereumAddress: string): boolean => {
	if (!isBloom(bloom)) {
		return false;
	}

	if (!isAddress(ethereumAddress)) {
		return false;
	}

	// you have to pad the ethereum address to 32 bytes
	// else the bloom filter does not work
	// this is only if your matching the USERS
	// ethereum address. Contract address do not need this
	// hence why we have 2 methods
	// (0x is not in the 2nd parameter of padleft so 64 chars is fine)

	const address = padLeft(ethereumAddress, 64);

	return isInBloom(bloom, address);
};

/**
 * Returns true if the contract address is part of the given bloom.
 * note: false positives are possible.
 */
export const isContractAddressInBloom = (bloom: string, contractAddress: string): boolean => {
	if (!isBloom(bloom)) {
		return false;
	}

	if (!isAddress(contractAddress)) {
		return false;
	}

	return isInBloom(bloom, contractAddress);
};
