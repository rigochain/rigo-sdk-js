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
import { assertString } from './encodings.js';
import { Int53 } from './integers.js';

/**
 * Takes an integer value from the Tendermint RPC API and
 * returns it as number.
 *
 * Only works within the safe integer range.
 */
export function apiToSmallInt(input: string | number): number {
    const asInt = typeof input === 'number' ? new Int53(input) : Int53.fromString(input);
    return asInt.toNumber();
}

/**
 * Takes an integer value from the Tendermint RPC API and
 * returns it as BigInt.
 *
 * This supports the full uint64 and int64 ranges.
 */
export function apiToBigInt(input: string): bigint {
    assertString(input); // Runtime check on top of TypeScript just to be safe for semi-trusted API types
    if (!input.match(/^-?[0-9]+$/)) {
        throw new Error('Invalid string format');
    }
    return BigInt(input);
}

/**
 * Takes an integer in the safe integer range and returns
 * a string representation to be used in the Tendermint RPC API.
 */
export function smallIntToApi(num: number): string {
    return new Int53(num).toString();
}
