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

import { Web3ValidationErrorObject } from 'rweb3-types';

import { Validator } from './validator.js';
import { ethAbiToJsonSchema } from './utils.js';
import { Json, ValidationSchemaInput, Web3ValidationOptions } from './types.js';
import { Web3ValidatorError } from './errors.js';

export class RWeb3Validator {
	private readonly _validator: Validator;

	public constructor() {
		this._validator = Validator.factory();
	}

	public validateJSONSchema(
		schema: object,
		data: object,
		options?: Web3ValidationOptions,
	): Web3ValidationErrorObject[] | undefined {
		return this._validator.validate(schema, data as Json, options);
	}

	public validate(
		schema: ValidationSchemaInput,
		data: ReadonlyArray<unknown>,
		options: Web3ValidationOptions = { silent: false },
	): Web3ValidationErrorObject[] | undefined {
		const jsonSchema = ethAbiToJsonSchema(schema);
		if (
			Array.isArray(jsonSchema.items) &&
			jsonSchema.items?.length === 0 &&
			data.length === 0
		) {
			return undefined;
		}

		if (
			Array.isArray(jsonSchema.items) &&
			jsonSchema.items?.length === 0 &&
			data.length !== 0
		) {
			throw new Web3ValidatorError([
				{
					instancePath: '/0',
					schemaPath: '/',
					keyword: 'required',
					message: 'empty schema against data can not be validated',
					params: data,
				},
			]);
		}

		return this._validator.validate(jsonSchema, data as Json, options);
	}
}
