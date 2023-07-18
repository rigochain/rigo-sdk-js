

/* eslint-disable max-classes-per-file */

import { Web3Error } from 'rweb3-types';

export abstract class BaseWeb3Error extends Error implements Web3Error {
	public readonly name: string;
	public abstract readonly code: number;
	public stack: string | undefined;
	public innerError: Error | Error[] | undefined;

	public constructor(msg?: string, innerError?: Error | Error[]) {
		super(msg);
		this.innerError = innerError;
		this.name = this.constructor.name;

		if (typeof Error.captureStackTrace === 'function') {
			Error.captureStackTrace(new.target.constructor);
		} else {
			this.stack = new Error().stack;
		}
	}

	public static convertToString(value: unknown, unquotValue = false) {
		// Using "null" value intentionally for validation
		// eslint-disable-next-line no-null/no-null
		if (value === null || value === undefined) return 'undefined';

		const result = JSON.stringify(
			value,
			(_, v) => (typeof v === 'bigint' ? v.toString() : v) as unknown,
		);

		return unquotValue && ['bigint', 'string'].includes(typeof value)
			? result.replace(/['\\"]+/g, '')
			: result;
	}

	public toJSON() {
		return {
			name: this.name,
			code: this.code,
			message: this.message,
			innerError: this.innerError,
		};
	}
}

export abstract class InvalidValueError extends BaseWeb3Error {
	public readonly name: string;

	public constructor(value: unknown, msg: string) {
		super(
			`Invalid value given "${BaseWeb3Error.convertToString(value, true)}". Error: ${msg}.`,
		);
		this.name = this.constructor.name;
	}
}