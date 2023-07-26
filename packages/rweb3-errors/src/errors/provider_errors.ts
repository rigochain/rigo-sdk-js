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
	ERR_PROVIDER,
	ERR_INVALID_PROVIDER,
	ERR_INVALID_CLIENT,
	ERR_SUBSCRIPTION,
	ERR_WS_PROVIDER,
} from '../error_codes.js';
import { BaseWeb3Error } from '../web3_error_base.js';

export class ProviderError extends BaseWeb3Error {
	public code = ERR_PROVIDER;
}

export class InvalidProviderError extends BaseWeb3Error {
	public code = ERR_INVALID_PROVIDER;

	public constructor(public clientUrl: string) {
		super(`Provider with url "${clientUrl}" is not set or invalid`);
	}
}

export class InvalidClientError extends BaseWeb3Error {
	public code = ERR_INVALID_CLIENT;

	public constructor(clientUrl: string) {
		super(`Client URL "${clientUrl}" is invalid.`);
	}
}

export class SubscriptionError extends BaseWeb3Error {
	public code = ERR_SUBSCRIPTION;
}

export class Web3WSProviderError extends BaseWeb3Error {
	public code = ERR_WS_PROVIDER; // this had duplicate code with generic provider
}
