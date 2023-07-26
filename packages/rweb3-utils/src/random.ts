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

import { getRandomBytesSync } from 'ethereum-cryptography/random.js';
import { bytesToHex } from './converters.js';

/**
 * Returns a random byte array by the given bytes size
 * @param size - The size of the random byte array returned
 * @returns - random byte array
 *
 * @example
 * ```ts
 * console.log(web3.utils.randomBytes(32));
 * > Uint8Array(32) [
 *       93, 172, 226,  32,  33, 176, 156, 156,
 *       182,  30, 240,   2,  69,  96, 174, 197,
 *       33, 136, 194, 241, 197, 156, 110, 111,
 *       66,  87,  17,  88,  67,  48, 245, 183
 *    ]
 * ```
 */
export const randomBytes = (size: number): Uint8Array => getRandomBytesSync(size);

/**
 * Returns a random hex string by the given bytes size
 * @param byteSize - The size of the random hex string returned
 * @returns - random hex string
 *
 * ```ts
 * console.log(web3.utils.randomHex(32));
 * > 0x139f5b88b72a25eab053d3b57fe1f8a9dbc62a526b1cb1774d0d7db1c3e7ce9e
 * ```
 */
export const randomHex = (byteSize: number): string => bytesToHex(randomBytes(byteSize));
