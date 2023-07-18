

/* eslint-disable max-classes-per-file */

import { BaseWeb3Error } from '../web3_error_base.js';
import { ERR_CORE_HARDFORK_MISMATCH } from '../error_codes.js';

export class ConfigHardforkMismatchError extends BaseWeb3Error {
	public code = ERR_CORE_HARDFORK_MISMATCH;

	public constructor(defaultHardfork: string, commonHardFork: string) {
		super(
			`Web3Config hardfork doesnt match in defaultHardfork ${defaultHardfork} and common.hardfork ${commonHardFork}`,
		);
	}
}

export class ConfigChainMismatchError extends BaseWeb3Error {
	public code = ERR_CORE_HARDFORK_MISMATCH;

	public constructor(defaultHardfork: string, commonHardFork: string) {
		super(
			`Web3Config chain doesnt match in defaultHardfork ${defaultHardfork} and common.hardfork ${commonHardFork}`,
		);
	}
}
