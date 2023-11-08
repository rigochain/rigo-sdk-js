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

import { ValidInputTypes } from '../types.js';
import { parseBaseType, hexToNumber } from '../utils.js';
import { isHexStrict } from './string.js';

/**
 * Checks if a given value is a valid big int
 */
export const isBigInt = (value: ValidInputTypes): boolean => typeof value === 'bigint';

export const isUInt = (
    value: ValidInputTypes,
    options: { abiType: string; bitSize?: never } | { bitSize: number; abiType?: never } = {
        abiType: 'uint',
    },
) => {
    if (
        !['number', 'string', 'bigint'].includes(typeof value) ||
        (typeof value === 'string' && value.length === 0)
    ) {
        return false;
    }

    let size!: number;

    if (options?.abiType) {
        const { baseTypeSize } = parseBaseType(options.abiType);

        if (baseTypeSize) {
            size = baseTypeSize;
        }
    } else if (options.bitSize) {
        size = options.bitSize;
    }

    const maxSize = BigInt(2) ** BigInt(size ?? 256) - BigInt(1);

    try {
        const valueToCheck =
            typeof value === 'string' && isHexStrict(value)
                ? BigInt(hexToNumber(value))
                : BigInt(value as number);

        return valueToCheck >= 0 && valueToCheck <= maxSize;
    } catch (error) {
        // Some invalid number value given which can not be converted via BigInt
        return false;
    }
};

export const isInt = (
    value: ValidInputTypes,
    options: { abiType: string; bitSize?: never } | { bitSize: number; abiType?: never } = {
        abiType: 'int',
    },
) => {
    if (!['number', 'string', 'bigint'].includes(typeof value)) {
        return false;
    }

    if (typeof value === 'number' && value > Number.MAX_SAFE_INTEGER) {
        return false;
    }

    let size!: number;

    if (options?.abiType) {
        const { baseTypeSize, baseType } = parseBaseType(options.abiType);

        if (baseType !== 'int') {
            return false;
        }

        if (baseTypeSize) {
            size = baseTypeSize;
        }
    } else if (options.bitSize) {
        size = options.bitSize;
    }

    const maxSize = BigInt(2) ** BigInt((size ?? 256) - 1);
    const minSize = BigInt(-1) * BigInt(2) ** BigInt((size ?? 256) - 1);

    try {
        const valueToCheck =
            typeof value === 'string' && isHexStrict(value)
                ? BigInt(hexToNumber(value))
                : BigInt(value as number);

        return valueToCheck >= minSize && valueToCheck <= maxSize;
    } catch (error) {
        // Some invalid number value given which can not be converted via BigInt
        return false;
    }
};

export const isIntOrEmpty = (
    value: ValidInputTypes,
    options: { abiType: string; bitSize?: never } | { bitSize: number; abiType?: never } = {
        abiType: 'int',
    },
) => {
    return value === '' || isInt(value, options);
};

export const isNumber = (value: ValidInputTypes) => {
    if (isInt(value)) {
        return true;
    }

    // It would be a decimal number
    if (
        typeof value === 'string' &&
        /[0-9.]/.test(value) &&
        value.indexOf('.') === value.lastIndexOf('.')
    ) {
        return true;
    }

    if (typeof value === 'number') {
        return true;
    }

    return false;
};
