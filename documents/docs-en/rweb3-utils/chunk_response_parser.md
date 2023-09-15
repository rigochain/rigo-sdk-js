# ChunkResponseParser (Class)

## Class: ChunkResponseParser

**ChunkResponseParser** class helps to parse a JSON response from a HTTP chunk before use. This assists the user in handing errors and incomplete responses.

### Properties

- **lastChunk**: `string | undefined`, this represents the last chunk of request.
- **lastChunkTimeout**: `NodeJS.Timeout | undefined`, this is the last chunk of request timeout.
- **_clearQueues**: `(() => void) | undefined`, this method is responsible for clearing queues.
- **eventEmitter**: `EventEmitter`, it broadcasts events.
- **autoReconnect**: `boolean`, it permits class to auto-reconnect.

### constructor(eventEmitter: EventEmitter, autoReconnect: boolean)

Creates a new instance of the `ChunkResponseParser`.

### clearQueues(): void

Clears the queues by calling the `_clearQueues` function if it exists.

### onError(clearQueues?: () => void)

Sets the `_clearQueues` function to be called in case of an error.

### parseResponse(data: string): JsonRpcResponse[]

It parses and returns a response from the given data. If the data chunk is invalid, it sets a timeout to handle the invalid response error, and if the parsed chunk is valid, adds it to the return values.

This function also takes care of de-chunking the provided data to get a clean and well formatted response.
