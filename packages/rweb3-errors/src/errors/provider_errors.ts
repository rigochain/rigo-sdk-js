

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
