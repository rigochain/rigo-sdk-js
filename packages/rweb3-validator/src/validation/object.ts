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

// Explicitly check for the
// eslint-disable-next-line @typescript-eslint/ban-types
export const isNullish = (item: unknown): item is undefined | null =>
    // Using "null" value intentionally for validation
    // eslint-disable-next-line no-null/no-null
    item === undefined || item === null;

export const isObject = (item: unknown): item is Record<string, unknown> =>
    typeof item === 'object' &&
    !isNullish(item) &&
    !Array.isArray(item) &&
    !(item instanceof TypedArray);
