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

import { BaseRWeb3Error, ERR_VALIDATION } from 'rweb3-errors';
import { RWeb3ValidationErrorObject } from 'rweb3-types';

import { isNullish } from './validation/object.js';

const errorFormatter = (error: RWeb3ValidationErrorObject): string => {
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

export class RWeb3ValidatorError extends BaseRWeb3Error {
    public code = ERR_VALIDATION;
    public readonly errors: RWeb3ValidationErrorObject[];

    public constructor(errors: RWeb3ValidationErrorObject[]) {
        super();

        this.errors = errors;

        super.message = `RWeb3 validator found ${
            errors.length
        } error[s]:\n${this._compileErrors().join('\n')}`;
    }

    private _compileErrors(): string[] {
        const errorMsgs = this.errors.map(errorFormatter);
        return errorMsgs;
    }
}
