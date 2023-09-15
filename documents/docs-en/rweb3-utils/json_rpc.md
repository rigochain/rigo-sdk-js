# Rigo Chain Documentation

The collection of functions, methods, and types detailed in this document refer to a code module developed by the Rigo Chain Developers. It is used to validate and work with JSON RPC requests and responses.

## Functions
### `isResponseRpcError(rpcError: JsonRpcResponseWithError)`

This function accepts an error response. It checks if the error code is a valid RPC server error code. The function returns `true` if it is a valid error code, `false` otherwise.

### `isResponseWithResult<Result = unknown, Error = unknown>(response: JsonRpcResponse<Result, Error>)`

This function receives a result response and determines if the response contains a result. It checks for the following:
- If the response is not an array
- If the response exists
- Whether the response.jsonrpc is 2.0
- If the 'result' exists in the response
- If the response.error is nullish
- Whether the response.id is either a number or a string 

This function returns `true` if all checks pass, and `false` if one of the checks fails.

### `isResponseWithError<Error = unknown, Result = unknown>(response: JsonRpcResponse<Result, Error>)`

This function checks if a response contains an error. It uses the same checks as `isResponseWithResult` but looks for 'error' in the response as opposed to 'result'. It returns `true` if all checks pass, and `false` otherwise.

### `validateResponse<Result = unknown, Error = unknown>(response: JsonRpcResponse<Result, Error>)`

This function checks whether a response has a result or an error, and returns `true` if either of these conditions is met.

### `isValidResponse<Result = unknown, Error = unknown>(response: JsonRpcResponse<Result, Error>)`

This function checks whether a response array has valid responses. If the response is an array, it checks each response for validity. If the response is not an array, it checks if the single response is valid.

### `setRequestIdStart(start: number | undefined)`

This function is used to make the JSON RPC `id` start from a specific number. Without calling this function, the `id` is filled with a uuid. However, this can be changed to a number by calling this function with a number. Conversely, passing `undefined` to this function resets the `id` to a uuid.

### `toPayload<ParamType = unknown[]>(request: JsonRpcOptionalRequest<ParamType>)`

This function creates a payload from a request. If no ID was specified, it adds an ID according to the requestIdSeed or generates a new UUID. It returns a completed request object.

### `toBatchPayload(requests: JsonRpcOptionalRequest<unknown>[])`

This function creates a payload for a batch of requests. It does so by applying `toPayload` to each request in the batch, resulting in a completed batched request.

### `isBatchRequest(request: JsonRpcBatchRequest | JsonRpcRequest<unknown> | JsonRpcOptionalRequest<unknown>)`

This function checks if a request is a batch request by looking to see if the request is an array with a length greater than 0. If so, it returns `true`. Otherwise, it returns `false`.