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

import { TypedArray } from '@rigochain/rweb3-types';
import { isNullish } from '@rigochain/rweb3-validator';

const isIterable = (item: unknown): item is Record<string, unknown> =>
    typeof item === 'object' &&
    !isNullish(item) &&
    !Array.isArray(item) &&
    !(item instanceof TypedArray);

// The following code is a derivative work of the code from the "LiskHQ/lisk-sdk" project,
// which is licensed under Apache version 2.
/**
 * Deep merge two objects.
 * @param destination - The destination object.
 * @param sources - An array of source objects.
 * @returns - The merged object.
 */
export const mergeDeep = (
    destination: Record<string, unknown>,
    ...sources: Record<string, unknown>[]
): Record<string, unknown> => {
    const result = destination; // clone deep here
    if (!isIterable(result)) {
        return result;
    }
    for (const src of sources) {
        // eslint-disable-next-line no-restricted-syntax
        for (const key in src) {
            if (isIterable(src[key])) {
                if (!result[key]) {
                    result[key] = {};
                }
                mergeDeep(
                    result[key] as Record<string, unknown>,
                    src[key] as Record<string, unknown>,
                );
            } else if (!isNullish(src[key]) && Object.hasOwnProperty.call(src, key)) {
                if (Array.isArray(src[key]) || src[key] instanceof TypedArray) {
                    result[key] = (src[key] as unknown[]).slice(0);
                } else {
                    result[key] = src[key];
                }
            }
        }
    }
    return result;
};
