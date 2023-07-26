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

import { JsonRpcId, JsonRpcIdentifier } from './json_rpc_types.js';

export interface ProviderMessage {
	readonly type: string;
	readonly data: unknown;
}

export interface EthSubscription extends ProviderMessage {
	readonly type: 'eth_subscription';
	readonly data: {
		readonly subscription: string;
		readonly result: unknown;
	};
}

export interface ProviderRpcError extends Error {
	code: number;
	data?: unknown;
}

export interface ProviderConnectInfo {
	readonly chainId: string;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Web3APISpec = Record<string, (...params: any) => any> | unknown;
export type RWeb3APISpec = Record<string, (...params: any) => any> | unknown;


export type Web3APIMethod<T extends Web3APISpec> = string & keyof Exclude<T, unknown>;
export type Web3APIParams<
	API extends Web3APISpec,
	Method extends Web3APIMethod<API>,
> = API extends Exclude<Web3APISpec, unknown> ? Parameters<API[Method]> : unknown;

export interface Web3APIRequest<API extends Web3APISpec, Method extends Web3APIMethod<API>> {
	method: Method | string;
	params?: Web3APIParams<API, Method> | readonly unknown[] | object;
}

export interface Web3APIPayload<API extends Web3APISpec, Method extends Web3APIMethod<API>>
	extends Web3APIRequest<API, Method> {
	readonly jsonrpc?: JsonRpcIdentifier;
	readonly id?: JsonRpcId;
	readonly requestOptions?: unknown;
}

export type Web3APIReturnType<
	API extends Web3APISpec,
	Method extends Web3APIMethod<API>,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
> = API extends Record<string, (...params: any) => any> ? ReturnType<API[Method]> : any;
