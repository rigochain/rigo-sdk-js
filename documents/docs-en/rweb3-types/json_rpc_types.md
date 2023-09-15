# Rigo Chain Documentation

## Type Declarations

1. `JsonRpcId` : It is a type which can be a string, number, or undefined.
2. `JsonRpcResult`: It can be of type string, number, boolean, or a record with string as key and unknown type as value.
3. `JsonRpcIdentifier`: It is a string type, but can only have value '2.0' or '1.0'.

## Interfaces

### `JsonRpcError`

This interface takes a type parameter `T` with a default type `JsonRpcResult`, it has properties:

- `code`: number
- `message`: string
- `data?`: T

### `JsonRpcResponseWithError`

This interface has a type parameter `Error` with a default type `JsonRpcResult`, it has properties:

- `id`: JsonRpcId
- `jsonrpc`: JsonRpcIdentifier
- `error`: JsonRpcError<Error>
- `result?`: never

### `JsonRpcResponseWithResult`

This interface takes a type parameter `T` with a default type `JsonRpcResult`, it has properties:

- `id`: JsonRpcId
- `jsonrpc`: JsonRpcIdentifier
- `error?`: never
- `result`: T

### `SubscriptionParams`

This interface takes a type parameter `T` with a default type `JsonRpcResult`. It has properties:

- `subscription`: string
- `result`: T

### `JsonRpcSubscriptionResultOld`

This interface takes a type parameter `T` with a default type `JsonRpcResult`. It has properties:

- `error?`: never
- `params?`: never
- `type`: string
- `data`: SubscriptionParams<T>

### `JsonRpcNotification`

This interface takes a type parameter `T` with a default type `JsonRpcResult`. It has properties:

- `id?`: JsonRpcId
- `jsonrpc`: JsonRpcIdentifier
- `method`: string
- `params`: SubscriptionParams<T>
- `result`: never
- `data?`: never

### `JsonRpcSubscriptionResult`

This interface has properties:

- `id`: number
- `jsonrpc`: string
- `result`: string
- `method`: never
- `params`: never
- `data?`: never

### `JsonRpcRequest`

This interface takes a type parameter `T` with a default type of an array of unknown type. It has properties:

- `id`: JsonRpcId
- `jsonrpc`: JsonRpcIdentifier
- `method`: string
- `params?`: T

### `JsonRpcOptionalRequest`

This interface extends the `JsonRpcRequest` interface excluding 'id' and 'jsonrpc'. It has properties:

- `id?`: JsonRpcId
- `jsonrpc?`: JsonRpcIdentifier

## Type alias

- `JsonRpcBatchRequest`: It is an array of `JsonRpcRequest` objects.
- `JsonRpcPayload`: It takes a type parameter `Param` with a default type of an array of unknowns and is a union type of `JsonRpcRequest<Param>` or `JsonRpcBatchRequest`.
- `JsonRpcBatchResponse`: It is an array of either `JsonRpcResponseWithError` or `JsonRpcResponseWithResult`.
- `JsonRpcResponse`: It takes two type parameters `Result` and `Error` with defaults set to `JsonRpcResult` and is a union type of `JsonRpcResponseWithError` and `JsonRpcResponseWithResult`.