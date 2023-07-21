// Importing types for JSON-RPC id and identifier
import { JsonRpcId, JsonRpcIdentifier } from './json_rpc_types.js';

// A message from a provider with a type and some associated data
export interface ProviderMessage {
	readonly type: string; // the type of the message
	readonly data: unknown; // the associated data with the message
}

// An error from a provider RPC (Remote Procedure Call)
export interface ProviderRpcError extends Error { // extending built-in Error
	code: number; // the error code
	data?: unknown; // optional data related to the error
}

// Connection information for a provider
export interface ProviderConnectInfo {
	readonly chainId: string; // the chain id for the connection
}

// A type describing an API specification for a Web3 provider
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RWeb3APISpec = Record<string, (...params: any) => any> | unknown;

// A type representing a method name in an API specification
export type RWeb3APIMethod<T extends RWeb3APISpec> = string & keyof Exclude<T, unknown>;

// A type to extract parameter types for a given method on an API specification
export type RWeb3APIParams<
	API extends RWeb3APISpec,
	Method extends RWeb3APIMethod<API>,
> = API extends Exclude<RWeb3APISpec, unknown> ? Parameters<API[Method]> : unknown;

// An interface describing a request to the Web3 API
export interface RWeb3APIRequest<API extends RWeb3APISpec, Method extends RWeb3APIMethod<API>, Function extends RWeb3APIMethod<API>> {
	method: Method | string; // the method to be called
    function: Function | string; // the function to be called
	params?: RWeb3APIParams<API, Method> | readonly unknown[] | object; // parameters for the method
}

// An interface describing a payload for a request to the Web3 API
export interface RWeb3APIPayload<API extends RWeb3APISpec, Method extends RWeb3APIMethod<API>, Function extends RWeb3APIMethod<API>> extends RWeb3APIRequest<API, Method, Function> {
	readonly jsonrpc?: JsonRpcIdentifier; // optional JSON-RPC identifier
	readonly id?: JsonRpcId; // optional ID for the request
	readonly requestOptions?: unknown; // optional request options
}

// A type to extract the return type for a given method onㅌ an API specification
export type RWeb3APIReturnType<
	API extends RWeb3APISpec,
	Method extends RWeb3APIMethod<API>,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
> = API extends Record<string, (...params: any) => any> ? ReturnType<API[Method]> : any;
