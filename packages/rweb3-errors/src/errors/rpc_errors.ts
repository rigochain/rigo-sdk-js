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

import { JsonRpcResponseWithError, JsonRpcId, JsonRpcError } from '@rigo/rweb3-types';
import { BaseRWeb3Error } from '../rweb3_error_base.js';
import {
    ERR_RPC_INTERNAL_ERROR,
    ERR_RPC_INVALID_INPUT,
    ERR_RPC_INVALID_JSON,
    ERR_RPC_INVALID_METHOD,
    ERR_RPC_INVALID_PARAMS,
    ERR_RPC_INVALID_REQUEST,
    ERR_RPC_LIMIT_EXCEEDED,
    ERR_RPC_MISSING_RESOURCE,
    ERR_RPC_NOT_SUPPORTED,
    ERR_RPC_TRANSACTION_REJECTED,
    ERR_RPC_UNAVAILABLE_RESOURCE,
    ERR_RPC_UNSUPPORTED_METHOD,
} from '../error_codes.js';

export class RpcError extends BaseRWeb3Error {
    public code: number;
    public id: JsonRpcId;
    public jsonrpc: string;
    public jsonRpcError: JsonRpcError;

    public constructor(rpcError: JsonRpcResponseWithError, message?: string) {
        super(message ?? `An Rpc error has occured with a code of ${rpcError.error.code}`);
        this.code = rpcError.error.code;
        this.id = rpcError.id;
        this.jsonrpc = rpcError.jsonrpc;
        this.jsonRpcError = rpcError.error;
    }

    public toJSON() {
        return { ...super.toJSON(), error: this.jsonRpcError, id: this.id, jsonRpc: this.jsonrpc };
    }
}

export class ParseError extends RpcError {
    public code = ERR_RPC_INVALID_JSON;

    public constructor(rpcError: JsonRpcResponseWithError) {
        super(rpcError, 'Parse error');
    }
}

export class InvalidRequestError extends RpcError {
    public code = ERR_RPC_INVALID_REQUEST;

    public constructor(rpcError: JsonRpcResponseWithError) {
        super(rpcError, 'Invalid request');
    }
}

export class MethodNotFoundError extends RpcError {
    public code = ERR_RPC_INVALID_METHOD;

    public constructor(rpcError: JsonRpcResponseWithError) {
        super(rpcError, 'Method not found');
    }
}

export class InvalidParamsError extends RpcError {
    public code = ERR_RPC_INVALID_PARAMS;

    public constructor(rpcError: JsonRpcResponseWithError) {
        super(rpcError, 'Invalid request');
    }
}

export class InternalError extends RpcError {
    public code = ERR_RPC_INTERNAL_ERROR;

    public constructor(rpcError: JsonRpcResponseWithError) {
        super(rpcError, 'Internal error');
    }
}

export class InvalidInputError extends RpcError {
    public code = ERR_RPC_INVALID_INPUT;

    public constructor(rpcError: JsonRpcResponseWithError) {
        super(rpcError, 'Invalid input');
    }
}

export class MethodNotSupported extends RpcError {
    public code = ERR_RPC_UNSUPPORTED_METHOD;

    public constructor(rpcError: JsonRpcResponseWithError) {
        super(rpcError, 'Method not supported');
    }
}

export class ResourceUnavailableError extends RpcError {
    public code = ERR_RPC_UNAVAILABLE_RESOURCE;

    public constructor(rpcError: JsonRpcResponseWithError) {
        super(rpcError, 'Resource unavailable');
    }
}

export class ResourcesNotFoundError extends RpcError {
    public code = ERR_RPC_MISSING_RESOURCE;

    public constructor(rpcError: JsonRpcResponseWithError) {
        super(rpcError, 'Resource not found');
    }
}

export class VersionNotSupportedError extends RpcError {
    public code = ERR_RPC_NOT_SUPPORTED;

    public constructor(rpcError: JsonRpcResponseWithError) {
        super(rpcError, 'JSON-RPC version not supported');
    }
}

export class TransactionRejectedError extends RpcError {
    public code = ERR_RPC_TRANSACTION_REJECTED;

    public constructor(rpcError: JsonRpcResponseWithError) {
        super(rpcError, 'Transaction rejected');
    }
}

export class LimitExceededError extends RpcError {
    public code = ERR_RPC_LIMIT_EXCEEDED;

    public constructor(rpcError: JsonRpcResponseWithError) {
        super(rpcError, 'Limit exceeded');
    }
}

export const rpcErrorsMap = new Map<number, { error: typeof RpcError }>();
rpcErrorsMap.set(ERR_RPC_INVALID_JSON, { error: ParseError });
rpcErrorsMap.set(ERR_RPC_INVALID_REQUEST, {
    error: InvalidRequestError,
});
rpcErrorsMap.set(ERR_RPC_INVALID_METHOD, {
    error: MethodNotFoundError,
});
rpcErrorsMap.set(ERR_RPC_INVALID_PARAMS, { error: InvalidParamsError });
rpcErrorsMap.set(ERR_RPC_INTERNAL_ERROR, { error: InternalError });
rpcErrorsMap.set(ERR_RPC_INVALID_INPUT, { error: InvalidInputError });
rpcErrorsMap.set(ERR_RPC_UNSUPPORTED_METHOD, {
    error: MethodNotSupported,
});
rpcErrorsMap.set(ERR_RPC_UNAVAILABLE_RESOURCE, {
    error: ResourceUnavailableError,
});
rpcErrorsMap.set(ERR_RPC_TRANSACTION_REJECTED, {
    error: TransactionRejectedError,
});
rpcErrorsMap.set(ERR_RPC_MISSING_RESOURCE, {
    error: ResourcesNotFoundError,
});
rpcErrorsMap.set(ERR_RPC_NOT_SUPPORTED, {
    error: VersionNotSupportedError,
});
rpcErrorsMap.set(ERR_RPC_LIMIT_EXCEEDED, { error: LimitExceededError });
