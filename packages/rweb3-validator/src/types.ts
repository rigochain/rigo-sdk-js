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

import {AbiParameter} from 'rweb3-types';
import {ValidationError} from 'is-my-json-valid';

// TODO : 여기 Abi 타입 체크를 이더가 아닌 RIGO 로 해야 된다.

export type ValidInputTypes = Uint8Array | bigint | string | number | boolean;
export type RigoBaseTypes = 'bool' | 'bytes' | 'string' | 'uint' | 'int' | 'address' | 'tuple';
export type RigoBaseTypesWithMeta =
    | `string${string}`
    | `string${string}[${number}]`
    | `bytes${string}`
    | `bytes${string}[${number}]`
    | `address[${number}]`
    | `bool[${number}]`
    | `int${string}`
    | `int${string}[${number}]`
    | `uint${string}`
    | `uint${string}[${number}]`
    | `tuple[]`
    | `tuple[${number}]`;

export type RigoExtendedTypes =
    | 'hex'
    | 'number'
    | 'blockNumber'
    | 'blockNumberOrTag'
    | 'filter'
    | 'bloom';

export type FullValidationSchema = ReadonlyArray<AbiParameter>;
export type ShortValidationSchema = ReadonlyArray<
    | string
    | RigoBaseTypes
    | RigoExtendedTypes
    | RigoBaseTypesWithMeta
    | RigoBaseTypesWithMeta
    | ShortValidationSchema
>;
export type ValidationSchemaInput = ShortValidationSchema;

export type Web3ValidationOptions = {
    readonly silent: boolean;
};

// is-my-json-valid types
export type Json = string | number | boolean | Array<Json> | { [id: string]: Json };

export type Schema = {
    // version
    $schema?: string;
    $vocabulary?: string;
    // pointers
    id?: string;
    $id?: string;
    $anchor?: string;
    $ref?: string;
    definitions?: { [id: string]: Schema };
    $defs?: { [id: string]: Schema };
    $recursiveRef?: string;
    $recursiveAnchor?: boolean;
    // generic
    type?: string | Array<string>;
    required?: Array<string> | boolean;
    default?: Json;
    // constant values
    enum?: Array<Json>;
    const?: Json;
    // logical checks
    not?: Schema;
    allOf?: Array<Schema>;
    anyOf?: Array<Schema>;
    oneOf?: Array<Schema>;
    if?: Schema;
    then?: Schema;
    else?: Schema;
    // numbers
    maximum?: number;
    minimum?: number;
    exclusiveMaximum?: number | boolean;
    exclusiveMinimum?: number | boolean;
    multipleOf?: number;
    divisibleBy?: number;
    // arrays, basic
    maxItems?: number;
    minItems?: number;
    additionalItems?: Schema;
    // arrays, complex
    contains?: Schema;
    minContains?: number;
    maxContains?: number;
    uniqueItems?: boolean;
    // strings
    maxLength?: number;
    minLength?: number;
    format?: string;
    pattern?: string;
    // strings content
    contentEncoding?: string;
    contentMediaType?: string;
    contentSchema?: Schema;
    // objects
    properties?: { [id: string]: Schema };
    maxProperties?: number;
    minProperties?: number;
    additionalProperties?: Schema;
    patternProperties?: { [pattern: string]: Schema };
    propertyNames?: Schema;
    dependencies?: { [id: string]: Array<string> | Schema };
    dependentRequired?: { [id: string]: Array<string> };
    dependentSchemas?: { [id: string]: Schema };
    // see-through
    unevaluatedProperties?: Schema;
    unevaluatedItems?: Schema;
    // Unused meta keywords not affecting validation (annotations and comments)
    // https://json-schema.org/understanding-json-schema/reference/generic.html
    // https://json-schema.org/draft/2019-09/json-schema-validation.html#rfc.section.9
    title?: string;
    description?: string;
    deprecated?: boolean;
    readOnly?: boolean;
    writeOnly?: boolean;
    examples?: Array<Json>;
    $comment?: string;
    // optimization hint and error filtering only, does not affect validation result
    discriminator?: { propertyName: string; mapping?: { [value: string]: string } };
    readonly eth?: string;
    items?: Schema | Schema[];
};

export interface Validate {
    (value: Json): boolean;

    errors?: ValidationError[];
}

export type RawValidationError = ValidationError & {
    schemaPath: string[];
};

export type JsonSchema = Schema;
