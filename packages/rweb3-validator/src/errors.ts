

import { BaseWeb3Error, ERR_VALIDATION } from 'rweb3-errors';
import { Web3ValidationErrorObject } from 'rweb3-types';

import { isNullish } from './validation/object.js';

const errorFormatter = (error: Web3ValidationErrorObject): string => {
	if (error.message && error.instancePath && error.params && !isNullish(error.params.value)) {
		// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
		return `value "${(error.params as { value: unknown }).value}" at "${error.instancePath}" ${
			error.message
		}`;
	}

	if (error.message && error.instancePath) {
		return `value at "${error.instancePath}" ${error.message}`;
	}

	if (error.instancePath) {
		return `value at "${error.instancePath}" caused unspecified error`;
	}

	if (error.message) {
		return error.message;
	}

	return 'unspecified error';
};

export class Web3ValidatorError extends BaseWeb3Error {
	public code = ERR_VALIDATION;
	public readonly errors: Web3ValidationErrorObject[];

	public constructor(errors: Web3ValidationErrorObject[]) {
		super();

		this.errors = errors;

		super.message = `Web3 validator found ${
			errors.length
		} error[s]:\n${this._compileErrors().join('\n')}`;
	}

	private _compileErrors(): string[] {
		const errorMsgs = this.errors.map(errorFormatter);
		return errorMsgs;
	}
}
