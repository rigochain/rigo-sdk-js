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

/* eslint-disable max-classes-per-file */

import {
    ERR_INVALID_BYTES,
    ERR_INVALID_NUMBER,
    ERR_INVALID_ADDRESS,
    ERR_INVALID_BLOCK,
    ERR_INVALID_BOOLEAN,
    ERR_INVALID_HEX,
    ERR_INVALID_LARGE_VALUE,
    ERR_INVALID_NIBBLE_WIDTH,
    ERR_INVALID_SIZE,
    ERR_INVALID_STRING,
    ERR_INVALID_TYPE,
    ERR_INVALID_TYPE_ABI,
    ERR_INVALID_UNIT,
    ERR_INVALID_UNSIGNED_INTEGER,
} from '../error_codes.js';
import { InvalidValueError } from '../rweb3_error_base.js';

export class InvalidBytesError extends InvalidValueError {
    public code = ERR_INVALID_BYTES;

    public constructor(value: unknown) {
        super(value, 'can not parse as byte data');
    }
}

export class InvalidNumberError extends InvalidValueError {
    public code = ERR_INVALID_NUMBER;

    public constructor(value: unknown) {
        super(value, 'can not parse as number data');
    }
}

export class InvalidAddressError extends InvalidValueError {
    public code = ERR_INVALID_ADDRESS;

    public constructor(value: unknown) {
        super(value, 'invalid rigo chain address');
    }
}

export class InvalidStringError extends InvalidValueError {
    public code = ERR_INVALID_STRING;

    public constructor(value: unknown) {
        super(value, 'not a valid string');
    }
}

export class InvalidUnitError extends InvalidValueError {
    public code = ERR_INVALID_UNIT;

    public constructor(value: unknown) {
        super(value, 'invalid unit');
    }
}

export class HexProcessingError extends InvalidValueError {
    public code = ERR_INVALID_HEX;

    public constructor(value: unknown) {
        super(value, 'can not be converted to hex');
    }
}

export class NibbleWidthError extends InvalidValueError {
    public code = ERR_INVALID_NIBBLE_WIDTH;

    public constructor(value: string) {
        super(value, 'value greater than the nibble width');
    }
}

export class InvalidTypeError extends InvalidValueError {
    public code = ERR_INVALID_TYPE;

    public constructor(value: unknown) {
        super(value, 'invalid type, type not supported');
    }
}

export class InvalidBooleanError extends InvalidValueError {
    public code = ERR_INVALID_BOOLEAN;

    public constructor(value: unknown) {
        super(value, 'not a valid boolean.');
    }
}

export class InvalidUnsignedIntegerError extends InvalidValueError {
    public code = ERR_INVALID_UNSIGNED_INTEGER;

    public constructor(value: unknown) {
        super(value, 'not a valid unsigned integer.');
    }
}

export class InvalidSizeError extends InvalidValueError {
    public code = ERR_INVALID_SIZE;

    public constructor(value: unknown) {
        super(value, 'invalid size given.');
    }
}

export class InvalidLargeValueError extends InvalidValueError {
    public code = ERR_INVALID_LARGE_VALUE;

    public constructor(value: unknown) {
        super(value, 'value is larger than size.');
    }
}

export class InvalidBlockError extends InvalidValueError {
    public code = ERR_INVALID_BLOCK;

    public constructor(value: string) {
        super(value, 'invalid string given');
    }
}

export class InvalidTypeAbiInputError extends InvalidValueError {
    public code = ERR_INVALID_TYPE_ABI;

    public constructor(value: string) {
        super(value, 'components found but type is not tuple');
    }
}
