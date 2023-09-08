/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/
import { Socket } from 'net';

import { RWeb3Error } from './error_types.js';
import { EthExecutionAPI } from './apis/eth_execution_api.js';
import {
    JsonRpcNotification,
    JsonRpcPayload,
    JsonRpcResponse,
    JsonRpcResponseWithError,
    JsonRpcResponseWithResult,
    JsonRpcResult,
    JsonRpcSubscriptionResult,
} from './json_rpc_types';
import {
    RWeb3APISpec,
    RWeb3APIMethod,
    RWeb3APIReturnType,
    RWeb3APIPayload,
    ProviderConnectInfo,
    ProviderRpcError,
    ProviderMessage,
} from './rweb3_api_types';
import { RigoExecutionAPI } from './apis/rigo_execution_api';
import { RWeb3DeferredPromiseInterface } from './rweb3_deferred_promise_type';

const symbol = Symbol.for('web3/base-provider');

export interface SocketRequestItem<
    API extends RWeb3APISpec,
    Method extends RWeb3APIMethod<API>,
    ResponseType,
> {
    payload: RWeb3APIPayload<API, Method>;
    deferredPromise: RWeb3DeferredPromiseInterface<ResponseType>;
}

// https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1193.md#connectivity
export type Web3ProviderStatus = 'connecting' | 'connected' | 'disconnected';

export type Web3ProviderEventCallback<T = JsonRpcResult> = (
    error: Error | ProviderRpcError | undefined,
    result?: JsonRpcSubscriptionResult | JsonRpcNotification<T>,
) => void;

export type Web3ProviderMessageEventCallback<T = JsonRpcResult> = (
    result?: JsonRpcSubscriptionResult | JsonRpcNotification<T>,
) => void;

export type Web3Eip1193ProviderEventCallback<T> = (data: T) => void;

export type Web3ProviderRequestCallback<ResultType = unknown> = (
    // Used "null" value to match the legacy version
    // eslint-disable-next-line @typescript-eslint/ban-types
    err?: Error | RWeb3Error | null | JsonRpcResponseWithError<Error>,
    response?: JsonRpcResponseWithResult<ResultType>,
) => void;

export interface LegacySendProvider {
    send<R = JsonRpcResult, P = unknown>(
        payload: JsonRpcPayload<P>,
        // Used "null" value to match the legacy version
        // eslint-disable-next-line @typescript-eslint/ban-types
        callback: (err: Error | null, response?: JsonRpcResponse<R>) => void,
    ): void;
}

export interface LegacySendAsyncProvider {
    sendAsync<R = JsonRpcResult, P = unknown>(
        payload: JsonRpcPayload<P>,
    ): Promise<JsonRpcResponse<R>>;
}

export interface LegacyRequestProvider {
    request<R = JsonRpcResult, P = unknown>(
        payload: JsonRpcPayload<P>,
        // eslint-disable-next-line @typescript-eslint/ban-types
        callback: (err: Error | null, response: JsonRpcResponse<R>) => void,
    ): void;
}

export interface SimpleProvider<API extends RWeb3APISpec> {
    request<Method extends RWeb3APIMethod<API>, ResponseType = RWeb3APIReturnType<API, Method>>(
        args: RWeb3APIPayload<API, Method>,
    ): Promise<JsonRpcResponseWithResult<ResponseType> | unknown>;
}

export interface ProviderInfo {
    chainId: string;
}

export type ProviderChainId = string;

export type ProviderAccounts = string[];

export type Eip1193EventName =
    | 'connect'
    | 'disconnect'
    | 'message'
    | 'chainChanged'
    | 'accountsChanged';

export interface EIP1193Provider<API extends RWeb3APISpec> extends SimpleProvider<API> {
    on(event: 'connect', listener: (info: ProviderInfo) => void): void;
    on(event: 'disconnect', listener: (error: ProviderRpcError) => void): void;
    on(event: 'message', listener: (message: ProviderMessage) => void): void;
    on(event: 'chainChanged', listener: (chainId: ProviderChainId) => void): void;
    on(event: 'accountsChanged', listener: (accounts: ProviderAccounts) => void): void;

    removeListener(event: 'connect', listener: (info: ProviderInfo) => void): void;
    removeListener(event: 'disconnect', listener: (error: ProviderRpcError) => void): void;
    removeListener(event: 'message', listener: (message: ProviderMessage) => void): void;
    removeListener(event: 'chainChanged', listener: (chainId: ProviderChainId) => void): void;
    removeListener(event: 'accountsChanged', listener: (accounts: ProviderAccounts) => void): void;
}

// Provider interface compatible with EIP-1193
// https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1193.md
export abstract class Web3BaseProvider<API extends RWeb3APISpec = EthExecutionAPI>
    implements LegacySendProvider, LegacySendAsyncProvider, EIP1193Provider<API>
{
    public static isWeb3Provider(provider: unknown) {
        return (
            provider instanceof Web3BaseProvider ||
            Boolean(provider && (provider as { [symbol]: boolean })[symbol])
        );
    }

    // To match an object "instanceof" does not work if
    // matcher class and object is using different package versions
    // to overcome this bottleneck used this approach.
    // The symbol value for one string will always remain same regardless of package versions
    // eslint-disable-next-line class-methods-use-this
    public get [symbol]() {
        return true;
    }

    public abstract getStatus(): Web3ProviderStatus;
    public abstract supportsSubscriptions(): boolean;

    /**
     * @deprecated Please use `.request` instead.
     * @param payload - Request Payload
     * @param callback - Callback
     */
    public send<ResultType = JsonRpcResult, P = unknown>(
        payload: JsonRpcPayload<P>,
        // eslint-disable-next-line @typescript-eslint/ban-types
        callback: (err: Error | null, response?: JsonRpcResponse<ResultType>) => void,
    ) {
        this.request<RWeb3APIMethod<API>, ResultType>(
            payload as RWeb3APIPayload<API, RWeb3APIMethod<API>>,
        )
            .then((response) => {
                // eslint-disable-next-line no-null/no-null
                callback(null, response);
            })
            .catch((err: Error | RWeb3Error) => {
                callback(err);
            });
    }

    /**
     * @deprecated Please use `.request` instead.
     * @param payload - Request Payload
     */
    public async sendAsync<R = JsonRpcResult, P = unknown>(payload: JsonRpcPayload<P>) {
        return this.request(payload as RWeb3APIPayload<API, RWeb3APIMethod<API>>) as Promise<
            JsonRpcResponse<R>
        >;
    }

    // https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1193.md#request
    public abstract request<
        Method extends RWeb3APIMethod<API>,
        ResultType = RWeb3APIReturnType<API, Method> | unknown,
    >(args: RWeb3APIPayload<API, Method>): Promise<JsonRpcResponseWithResult<ResultType>>;

    // https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1193.md#events

    public abstract on(
        type: 'disconnect',
        listener: Web3Eip1193ProviderEventCallback<ProviderRpcError>,
    ): void;
    public abstract on<T = JsonRpcResult>(
        type: 'message' | string,
        listener:
            | Web3Eip1193ProviderEventCallback<ProviderMessage>
            | Web3ProviderMessageEventCallback<T>,
    ): void;
    // for old providers
    public abstract on<T = JsonRpcResult>(
        type: 'data' | string,
        listener:
            | Web3Eip1193ProviderEventCallback<ProviderMessage>
            | Web3ProviderMessageEventCallback<T>,
    ): void;
    public abstract on(
        type: 'connect',
        listener: Web3Eip1193ProviderEventCallback<ProviderConnectInfo>,
    ): void;
    public abstract on(
        type: 'chainChanged',
        listener: Web3Eip1193ProviderEventCallback<string>,
    ): void;
    public abstract on(
        type: 'accountsChanged',
        listener: Web3Eip1193ProviderEventCallback<string[]>,
    ): void;
    public abstract removeListener(
        type: 'disconnect',
        listener: Web3Eip1193ProviderEventCallback<ProviderRpcError>,
    ): void;
    public abstract removeListener<T = JsonRpcResult>(
        type: 'message' | string,
        listener: Web3Eip1193ProviderEventCallback<ProviderMessage> | Web3ProviderEventCallback<T>,
    ): void;
    public abstract removeListener(
        type: 'connect',
        listener: Web3Eip1193ProviderEventCallback<ProviderConnectInfo>,
    ): void;
    public abstract removeListener(
        type: 'chainChanged',
        listener: Web3Eip1193ProviderEventCallback<string>,
    ): void;
    public abstract removeListener(
        type: 'accountsChanged',
        listener: Web3Eip1193ProviderEventCallback<string[]>,
    ): void;
    public abstract once(
        type: 'disconnect',
        listener: Web3Eip1193ProviderEventCallback<ProviderRpcError>,
    ): void;
    public abstract once<T = JsonRpcResult>(
        type: 'message' | string,
        listener: Web3Eip1193ProviderEventCallback<ProviderMessage> | Web3ProviderEventCallback<T>,
    ): void;
    public abstract once(
        type: 'connect',
        listener: Web3Eip1193ProviderEventCallback<ProviderConnectInfo>,
    ): void;
    public abstract once(
        type: 'chainChanged',
        listener: Web3Eip1193ProviderEventCallback<string>,
    ): void;
    public abstract once(
        type: 'accountsChanged',
        listener: Web3Eip1193ProviderEventCallback<string[]>,
    ): void;
    public abstract removeAllListeners?(type: string): void;
    public abstract connect(): void;
    public abstract disconnect(code?: number, data?: string): void;
    public abstract reset(): void;
}

export type SupportedProviders<API extends RWeb3APISpec = RigoExecutionAPI> =
    | EIP1193Provider<API>
    | Web3BaseProvider<API>
    | LegacyRequestProvider
    | LegacySendProvider
    | LegacySendAsyncProvider
    | SimpleProvider<API>;

export type Web3BaseProviderConstructor = new <API extends RWeb3APISpec>(
    url: string,
    net?: Socket,
) => Web3BaseProvider<API>;
