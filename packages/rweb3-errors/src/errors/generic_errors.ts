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
    ERR_ABI_ENCODING,
    ERR_FORMATTERS,
    ERR_METHOD_NOT_IMPLEMENTED,
    ERR_OPERATION_ABORT,
    ERR_OPERATION_TIMEOUT,
    ERR_PARAM,
    ERR_EXISTING_PLUGIN_NAMESPACE,
    ERR_INVALID_METHOD_PARAMS,
} from '../error_codes.js';
import { BaseRWeb3Error } from '../rweb3_error_base.js';

export class InvalidNumberOfParamsError extends BaseRWeb3Error {
    public code = ERR_PARAM;

    public constructor(
        public got: number,
        public expected: number,
        public method: string,
    ) {
        super(`Invalid number of parameters for "${method}". Got "${got}" expected "${expected}"!`);
    }

    public toJSON() {
        return {
            ...super.toJSON(),
            got: this.got,
            expected: this.expected,
            method: this.method,
        };
    }
}

export class InvalidMethodParamsError extends BaseRWeb3Error {
    public code = ERR_INVALID_METHOD_PARAMS;

    public constructor(public hint?: string) {
        super(`Invalid parameters passed. "${typeof hint !== 'undefined' ? hint : ''}"`);
    }

    public toJSON() {
        return {
            ...super.toJSON(),
            hint: this.hint,
        };
    }
}

export class FormatterError extends BaseRWeb3Error {
    public code = ERR_FORMATTERS;
}

export class MethodNotImplementedError extends BaseRWeb3Error {
    public code = ERR_METHOD_NOT_IMPLEMENTED;

    public constructor() {
        super("The method you're trying to call is not implemented.");
    }
}

export class OperationTimeoutError extends BaseRWeb3Error {
    public code = ERR_OPERATION_TIMEOUT;
}

export class OperationAbortError extends BaseRWeb3Error {
    public code = ERR_OPERATION_ABORT;
}

export class AbiError extends BaseRWeb3Error {
    public code = ERR_ABI_ENCODING;
}

export class ExistingPluginNamespaceError extends BaseRWeb3Error {
    public code = ERR_EXISTING_PLUGIN_NAMESPACE;

    public constructor(pluginNamespace: string) {
        super(`A plugin with the namespace: ${pluginNamespace} has already been registered.`);
    }
}
