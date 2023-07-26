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

import { bytesToHex } from './converters.js';
import { randomBytes } from './random.js';

/**
 * Generate a version 4 (random) uuid
 * https://github.com/uuidjs/uuid/blob/main/src/v4.js#L5
 * @returns - A version 4 uuid of the form xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx
 * @example
 * ```ts
 * console.log(web3.utils.uuidV4());
 * > "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed"
 * ```
 */
export const uuidV4 = (): string => {
	const bytes = randomBytes(16);

	// https://github.com/ethers-io/ethers.js/blob/ce8f1e4015c0f27bf178238770b1325136e3351a/packages/json-wallets/src.ts/utils.ts#L54
	// Section: 4.1.3:
	// - time_hi_and_version[12:16] = 0b0100
	/* eslint-disable-next-line */
	bytes[6] = (bytes[6] & 0x0f) | 0x40;

	// Section 4.4
	// - clock_seq_hi_and_reserved[6] = 0b0
	// - clock_seq_hi_and_reserved[7] = 0b1
	/* eslint-disable-next-line */
	bytes[8] = (bytes[8] & 0x3f) | 0x80;

	const hexString = bytesToHex(bytes);

	return [
		hexString.substring(2, 10),
		hexString.substring(10, 14),
		hexString.substring(14, 18),
		hexString.substring(18, 22),
		hexString.substring(22, 34),
	].join('-');
};
