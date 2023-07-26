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

import { BlockTags } from 'rweb3-types';
import { isUInt } from './numbers.js';

export const isBlockNumber = (value: string | number | bigint): boolean => isUInt(value);

/**
 * Returns true if the given blockNumber is 'latest', 'pending', 'earliest, 'safe' or 'finalized'
 */
export const isBlockTag = (value: string) => Object.values(BlockTags).includes(value as BlockTags);

/**
 * Returns true if given value is valid hex string and not negative, or is a valid BlockTag
 */
export const isBlockNumberOrTag = (value: string | number | bigint) =>
    isBlockTag(value as string) || isBlockNumber(value);
