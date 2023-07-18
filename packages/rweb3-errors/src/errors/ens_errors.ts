

/* eslint-disable max-classes-per-file */

import {
	ERR_ENS_CHECK_INTERFACE_SUPPORT,
	ERR_ENS_NETWORK_NOT_SYNCED,
	ERR_ENS_UNSUPPORTED_NETWORK,
} from '../error_codes.js';
import { BaseWeb3Error } from '../web3_error_base.js';

export class ENSCheckInterfaceSupportError extends BaseWeb3Error {
	public code = ERR_ENS_CHECK_INTERFACE_SUPPORT;
	public constructor(errorDetails: string) {
		super(`ENS resolver check interface support error. "${errorDetails}"`);
	}
}

export class ENSUnsupportedNetworkError extends BaseWeb3Error {
	public code = ERR_ENS_UNSUPPORTED_NETWORK;
	public constructor(networkType: string) {
		super(`ENS is not supported on network ${networkType}`);
	}
}

export class ENSNetworkNotSyncedError extends BaseWeb3Error {
	public code = ERR_ENS_NETWORK_NOT_SYNCED;
	public constructor() {
		super(`Network not synced`);
	}
}
