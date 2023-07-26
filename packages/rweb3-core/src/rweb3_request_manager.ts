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

import HttpProvider from 'rweb3-providers-http';
import { isNullish, jsonRpc, isResponseRpcError } from 'rweb3-utils';
import {
    RigoExecutionAPI,
    RWeb3APISpec,
    RWeb3APIMethod,
    RWeb3APIRequest,
    RWeb3APIReturnType,
    RWeb3APIPayload,
    JsonRpcPayload,
    JsonRpcResponse,
    JsonRpcResponseWithError,
    JsonRpcError,
    JsonRpcBatchResponse,
} from 'rweb3-types';
import {
    ContractExecutionError,
    InvalidResponseError,
    ResponseError,
    RpcError,
    rpcErrorsMap,
} from 'rweb3-errors';

export let Web3RequestManagerEvent;
(function (Web3RequestManagerEvent) {
    Web3RequestManagerEvent['PROVIDER_CHANGED'] = 'PROVIDER_CHANGED';
    Web3RequestManagerEvent['BEFORE_PROVIDER_CHANGE'] = 'BEFORE_PROVIDER_CHANGE';
})(Web3RequestManagerEvent || (Web3RequestManagerEvent = {}));
const availableProviders = {
    HttpProvider: HttpProvider,
};

export class RWeb3RequestManager<API extends RWeb3APISpec = RigoExecutionAPI> {
    private _provider: HttpProvider;
    private readonly useRpcCallSpecification?: boolean;

    public constructor(provider?: string, useRpcCallSpecification?: boolean) {
        if (!isNullish(provider)) {
            this.setProvider(provider);
        }
        this.useRpcCallSpecification = useRpcCallSpecification;
    }

    public setProvider(provider?: string): void {
        // autodetect provider
        if (provider && typeof provider === 'string' && this.providers) {
            console.log('setProvider', provider);
            // HTTP
            if (/^http(s)?:\/\//i.test(provider)) {
                this._provider = new this.providers.HttpProvider(provider);
            }
        }
    }

    public get providers() {
        return availableProviders;
    }

    public get provider() {
        return this._provider;
    }

    public async send<
        Method extends RWeb3APIMethod<API>,
        ResponseType = RWeb3APIReturnType<API, Method>,
    >(request: RWeb3APIRequest<API, Method>): Promise<ResponseType> {
        const { provider } = this;

        const payload = jsonRpc.toPayload(request);


        const response = await provider.request<Method, ResponseType>(
            // @ts-ignore
            payload as RWeb3APIPayload<API, Method>,
        );

        if (jsonRpc.isResponseWithResult(response)) {
            return response.result;
        }

        throw new ResponseError(response);
    }

    // public async send(request: any): Promise<any> {
    //     const {provider} = this;
    // }

    // eslint-disable-next-line class-methods-use-this
    private _processJsonRpcResponse<ResultType, ErrorType, RequestType>(
        payload: JsonRpcPayload<RequestType>,
        response: JsonRpcResponse<ResultType, ErrorType>,
        { legacy, error }: { legacy: boolean; error: boolean },
    ): JsonRpcResponse<ResultType> | never {
        if (isNullish(response)) {
            return this._buildResponse(
                payload,
                // Some providers uses "null" as valid empty response
                // eslint-disable-next-line no-null/no-null
                null as unknown as JsonRpcResponse<ResultType, ErrorType>,
                error,
            );
        }

        // This is the majority of the cases so check these first
        // A valid JSON-RPC response with error object
        if (jsonRpc.isResponseWithError<ErrorType>(response)) {
            // check if its an rpc error
            if (
                this.useRpcCallSpecification &&
                isResponseRpcError(response as JsonRpcResponseWithError)
            ) {
                const rpcErrorResponse = response as JsonRpcResponseWithError;
                // check if rpc error flag is on and response error code match an EIP-1474 or a standard rpc error code
                if (rpcErrorsMap.get(rpcErrorResponse.error.code)) {
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    const Err = rpcErrorsMap.get(rpcErrorResponse.error.code)!.error;
                    throw new Err(rpcErrorResponse);
                } else {
                    throw new RpcError(rpcErrorResponse);
                }
            } else if (!RWeb3RequestManager._isReverted(response)) {
                throw new InvalidResponseError<ErrorType, RequestType>(response, payload);
            }
        }

        // This is the majority of the cases so check these first
        // A valid JSON-RPC response with result object
        if (jsonRpc.isResponseWithResult<ResultType>(response)) {
            return response;
        }

        if ((response as unknown) instanceof Error) {
            RWeb3RequestManager._isReverted(response);
            throw response;
        }

        if (!legacy && jsonRpc.isBatchRequest(payload) && jsonRpc.isBatchResponse(response)) {
            return response as JsonRpcBatchResponse<ResultType>;
        }

        if (legacy && !error && jsonRpc.isBatchRequest(payload)) {
            return response as JsonRpcBatchResponse<ResultType>;
        }

        if (legacy && error && jsonRpc.isBatchRequest(payload)) {
            // In case of error batch response we don't want to throw Invalid response
            throw response;
        }

        if (
            legacy &&
            !jsonRpc.isResponseWithError(response) &&
            !jsonRpc.isResponseWithResult(response)
        ) {
            return this._buildResponse(payload, response, error);
        }

        if (jsonRpc.isBatchRequest(payload) && !Array.isArray(response)) {
            throw new ResponseError(response, 'Got normal response for a batch request.');
        }

        if (!jsonRpc.isBatchRequest(payload) && Array.isArray(response)) {
            throw new ResponseError(response, 'Got batch response for a normal request.');
        }

        if (
            (jsonRpc.isResponseWithError(response) || jsonRpc.isResponseWithResult(response)) &&
            !jsonRpc.isBatchRequest(payload)
        ) {
            if (response.id && payload.id !== response.id) {
                throw new InvalidResponseError<ErrorType>(response);
            }
        }

        throw new ResponseError(response, 'Invalid response');
    }

    // Need to use same types as _processJsonRpcResponse so have to declare as instance method
    // eslint-disable-next-line class-methods-use-this
    private _buildResponse<ResultType, ErrorType, RequestType>(
        payload: JsonRpcPayload<RequestType>,
        response: JsonRpcResponse<ResultType, ErrorType>,
        error: boolean,
    ): JsonRpcResponse<ResultType> {
        const res = {
            jsonrpc: '2.0',
            // eslint-disable-next-line no-nested-ternary
            id: jsonRpc.isBatchRequest(payload)
                ? payload[0].id
                : 'id' in payload
                ? payload.id
                : // Have to use the null here explicitly
                  // eslint-disable-next-line no-null/no-null
                  null,
        };

        if (error) {
            return {
                ...res,
                error: response as unknown,
            } as JsonRpcResponse<ResultType>;
        }

        return {
            ...res,
            result: response as unknown,
        } as JsonRpcResponse<ResultType>;
    }

    private static _isReverted<ResultType, ErrorType>(
        response: JsonRpcResponse<ResultType, ErrorType>,
    ): boolean {
        let error: JsonRpcError | undefined;

        if (jsonRpc.isResponseWithError<ErrorType>(response)) {
            error = (response as JsonRpcResponseWithError).error;
        } else if ((response as unknown) instanceof Error) {
            error = response as unknown as JsonRpcError;
        }

        // This message means that there was an error while executing the code of the smart contract
        // However, more processing will happen at a higher level to decode the error data,
        //	according to the Error ABI, if it was available as of EIP-838.
        if (error?.message.includes('revert')) throw new ContractExecutionError(error);

        return false;
    }
}
