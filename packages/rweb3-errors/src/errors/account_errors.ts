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
	ERR_PRIVATE_KEY_LENGTH,
	ERR_INVALID_PRIVATE_KEY,
	ERR_INVALID_SIGNATURE,
	ERR_UNSUPPORTED_KDF,
	ERR_KEY_DERIVATION_FAIL,
	ERR_KEY_VERSION_UNSUPPORTED,
	ERR_INVALID_PASSWORD,
	ERR_IV_LENGTH,
	ERR_PBKDF2_ITERATIONS,
} from '../error_codes.js';
import { BaseWeb3Error } from '../web3_error_base.js';

export class PrivateKeyLengthError extends BaseWeb3Error {
	public code = ERR_PRIVATE_KEY_LENGTH;
	public constructor() {
		super(`Private key must be 32 bytes.`);
	}
}

export class InvalidPrivateKeyError extends BaseWeb3Error {
	public code = ERR_INVALID_PRIVATE_KEY;
	public constructor() {
		super(`Invalid Private Key, Not a valid string or uint8Array`);
	}
}

export class InvalidSignatureError extends BaseWeb3Error {
	public code = ERR_INVALID_SIGNATURE;
	public constructor(errorDetails: string) {
		super(`"${errorDetails}"`);
	}
}

export class InvalidKdfError extends BaseWeb3Error {
	public code = ERR_UNSUPPORTED_KDF;
	public constructor() {
		super(`Invalid key derivation function`);
	}
}

export class KeyDerivationError extends BaseWeb3Error {
	public code = ERR_KEY_DERIVATION_FAIL;
	public constructor() {
		super(`Key derivation failed - possibly wrong password`);
	}
}

export class KeyStoreVersionError extends BaseWeb3Error {
	public code = ERR_KEY_VERSION_UNSUPPORTED;
	public constructor() {
		super('Unsupported key store version');
	}
}

export class InvalidPasswordError extends BaseWeb3Error {
	public code = ERR_INVALID_PASSWORD;
	public constructor() {
		super('Password cannot be empty');
	}
}

export class IVLengthError extends BaseWeb3Error {
	public code = ERR_IV_LENGTH;
	public constructor() {
		super('Initialization vector must be 16 bytes');
	}
}

export class PBKDF2IterationsError extends BaseWeb3Error {
	public code = ERR_PBKDF2_ITERATIONS;
	public constructor() {
		super('c > 1000, pbkdf2 is less secure with less iterations');
	}
}
