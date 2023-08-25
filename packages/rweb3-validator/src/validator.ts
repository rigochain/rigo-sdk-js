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

import { RWeb3ValidationErrorObject } from 'rweb3-types';
import { toHex, utf8ToBytes } from 'ethereum-cryptography/utils.js';
import { blake2b } from 'ethereum-cryptography/blake2b.js';
import validator from 'is-my-json-valid';
import formats from './formats.js';
import { RWeb3ValidatorError } from './errors.js';
import { Validate, Json, Schema, RawValidationError } from './types.js';

export class Validator {
    // eslint-disable-next-line no-use-before-define
    private static validatorInstance?: Validator;

    // eslint-disable-next-line no-useless-constructor, @typescript-eslint/no-empty-function
    private constructor() {}

    public static factory(): Validator {
        if (!Validator.validatorInstance) {
            Validator.validatorInstance = new Validator();
        }
        return Validator.validatorInstance;
    }

    private readonly _schemas: Map<string, Validate> = new Map();

    public getSchema(key: string) {
        return this._schemas.get(key);
    }

    public addSchema(key: string, schema: Schema) {
        this._schemas.set(key, this.createValidator(schema));
    }

    // eslint-disable-next-line  class-methods-use-this
    private createValidator(schema: Schema): Validate {
        // eslint-disable-next-line  @typescript-eslint/no-unsafe-call
        // @ts-expect-error validator params correction
        return validator(schema, {
            formats,
            greedy: true,
            verbose: true,
            additionalProperties: false,
        }) as Validate;
    }

    public validate(schema: Schema, data: Json, options?: { silent?: boolean }) {
        const localValidate = this.getOrCreateValidator(schema);
        if (!localValidate(data)) {
            const errors = this.convertErrors(
                localValidate.errors as RawValidationError[],
                schema,
                data,
            );
            if (errors) {
                if (options?.silent) {
                    return errors;
                }
                throw new RWeb3ValidatorError(errors);
            }
        }
        return undefined;
    }

    private convertErrors(
        errors: RawValidationError[] | undefined,
        schema: Schema,
        data: Json,
    ): RWeb3ValidationErrorObject[] | undefined {
        if (errors && Array.isArray(errors) && errors.length > 0) {
            return errors.map((error: RawValidationError) => {
                let message;
                let keyword;
                let params;
                let schemaPath;

                schemaPath = Array.isArray(error.schemaPath)
                    ? error.schemaPath.slice(1).join('/')
                    : '';

                const { field } = error;
                const _instancePath =
                    schemaPath ||
                    // eslint-disable-next-line no-useless-escape
                    (field?.length >= 4 ? `${field.slice(4).replace(/\"|\[|\]/g, '')}` : '/');

                const instancePath = _instancePath ? `/${_instancePath}` : '';
                if (error?.message === 'has less items than allowed') {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    const schemaData = this.getObjectValueByPath(schema, schemaPath);
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                    if (schemaData.minItems) {
                        keyword = 'minItems';
                        schemaPath = `${schemaPath}/minItems`;
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                        params = { limit: schemaData.minItems };
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/restrict-template-expressions
                        message = `must NOT have fewer than ${schemaData.minItems} items`;
                    }
                } else if (error?.message === 'has more items than allowed') {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    const schemaData = this.getObjectValueByPath(schema, schemaPath);
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                    if (schemaData.maxItems) {
                        keyword = 'maxItems';
                        schemaPath = `${schemaPath}/maxItems`;
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                        params = { limit: schemaData.maxItems };
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/restrict-template-expressions
                        message = `must NOT have more than ${schemaData.maxItems} items`;
                    }
                } else if (
                    error?.message.startsWith('must be') &&
                    error?.message.endsWith('format')
                ) {
                    const formatName = error?.message.split(' ')[2];
                    if (formatName) {
                        message = `must pass "${formatName}" validation`;
                    }
                }
                // eslint-disable-next-line  @typescript-eslint/no-unsafe-assignment
                const dataValue = this.getObjectValueByPath(data as object, instancePath);
                return {
                    keyword: keyword ?? error.field,
                    instancePath,
                    schemaPath: `#${schemaPath}`,
                    // eslint-disable-next-line  @typescript-eslint/no-unsafe-assignment
                    params: params ?? { value: dataValue },
                    message: message ?? error.message,
                } as RWeb3ValidationErrorObject;
            });
        }
        return undefined;
    }

    public getOrCreateValidator(schema: Schema): Validate {
        const key = Validator.getKey(schema);
        let _validator = this.getSchema(key);
        if (!_validator) {
            this.addSchema(key, schema);
            _validator = this.getSchema(key);
        }
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return _validator!;
    }

    public static getKey(schema: Schema) {
        return toHex(blake2b(utf8ToBytes(JSON.stringify(schema))));
    }

    private getObjectValueByPath(obj: object, pointer: string, objpath?: object[]) {
        try {
            if (typeof obj !== 'object') throw new Error('Invalid input object');
            if (typeof pointer !== 'string') throw new Error('Invalid JSON pointer');
            const parts = pointer.split('/');
            if (!['', '#'].includes(parts.shift() as string)) {
                throw new Error('Invalid JSON pointer');
            }
            if (parts.length === 0) return obj;

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            let curr: any = obj;
            for (const part of parts) {
                if (typeof part !== 'string') throw new Error('Invalid JSON pointer');
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
                if (objpath) objpath.push(curr); // does not include target itself, but includes head
                const prop = this.untilde(part);
                if (typeof curr !== 'object') return undefined;
                if (!Object.prototype.hasOwnProperty.call(curr, prop)) return undefined;
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                curr = curr[prop];
            }
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return curr;
        } catch (e) {
            return '';
        }
    }

    // eslint-disable-next-line class-methods-use-this
    private untilde(string: string) {
        if (!string.includes('~')) return string;
        return string.replace(/~[01]/g, (match) => {
            switch (match) {
                case '~1':
                    return '/';
                case '~0':
                    return '~';
                default:
                    throw new Error('Unreachable');
            }
        });
    }
}
