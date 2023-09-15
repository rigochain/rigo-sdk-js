# Rigo Chain Web3 API Documentation

## Types and Interfaces

### ProviderMessage

A message from a provider with a type and some associated data

```
export interface ProviderMessage {
    readonly type: string; // the type of the message
    readonly data: unknown; // the associated data with the message
}
```

### ProviderRpcError

An error from a provider RPC (Remote Procedure Call). It extends built-in Error.

```
export interface ProviderRpcError extends Error {
    code: number; // the error code
    data?: unknown; // optional data related to the error
}
```

### ProviderConnectInfo

Connection information for a provider.

```
export interface ProviderConnectInfo {
    readonly chainId: string; // the chain id for the connection
}
```

### RWeb3APISpec

A type describing an API specification for a Web3 provider.

```
export type RWeb3APISpec = Record<string, (...params: any) => any> | unknown;
```

### RWeb3APIMethod

A type representing a method name in an API specification.

```
export type RWeb3APIMethod<T extends RWeb3APISpec> = string & keyof Exclude<T, unknown>;
```

### RWeb3APIParams

A type to extract parameter types for a given method on an API specification.

```
export type RWeb3APIParams<
    API extends RWeb3APISpec,
    Method extends RWeb3APIMethod<API>,
> = API extends Exclude<RWeb3APISpec, unknown> ? Parameters<API[Method]> : unknown;
```

### RWeb3APIRequest

An interface describing a request to the Web3 API.

```
export interface RWeb3APIRequest<API extends RWeb3APISpec, Method extends RWeb3APIMethod<API>> {
    method: Method; // the method to be called
    params?: RWeb3APIParams<API, Method> | readonly unknown[] | object; // parameters for the method
}
```

### RWeb3APIPayload

An interface describing a payload for a request to the Web3 API.

```
export interface RWeb3APIPayload<API extends RWeb3APISpec, Method extends RWeb3APIMethod<API>>
    extends RWeb3APIRequest<API, Method> {
    readonly jsonrpc?: JsonRpcIdentifier; // optional JSON-RPC identifier
    readonly id?: JsonRpcId; // optional ID for the request
    readonly requestOptions?: unknown; // optional request options
}
```
    
### RWeb3APIReturnType

A type to extract the return type for a given method on an API specification.

```
export type RWeb3APIReturnType<
    API extends RWeb3APISpec,
    Method extends RWeb3APIMethod<API>,
> = API extends Record<string, (...params: any) => any> ? ReturnType<API[Method]> : any;
```