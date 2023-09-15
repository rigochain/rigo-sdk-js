# WebsocketProvider

## Getting Started
```Typscript
import { WebsocketProvider } from '@rigochain/rweb3-types';
const provider = new WebsocketProvider('ws://localhost:8546');


let rweb3 = new RWeb3(provider);

or

let rweb3 = new RWeb3();
rweb3.setProvider(provider);
```

## Description

The **WebsocketProvider** is a class in the `@rigochain/rweb3-types` package used to manage queues and streams, orchestrate requests and responses, as well as handle error events over Websockets. Major operations including sending requests, establishing connections, creating listeners, validating and parsing messages are implemented in this class.

### RpcEventProducer Class

The **RpcEventProducer** is a sub-class of WebsocketProvider, with a specific role to produce `SubscriptionEvent`. 

For methods:

- `start(listener: Listener<SubscriptionEvent>)`: Starts the producer, throwing an error if the producer is already running. It also queues a request to the socket.
   
- `stop()`: Stops the producer and sends an end request to the server to free resources. In situations where the socket connection is not open, it will handle the error.
   
- `connectToClient(listener: Listener<SubscriptionEvent>)`: This function sets up the connections and subscriptions for listening to responses from the client.

- `closeSubscriptions()`: Unsubscribes all subscriptions and clears the subscription array.

### WebsocketProvider Class

For methods: 

- `constructor(baseUrl: string, onError: (err: any) => void)`: Establishes a connection to the provided socket URL.
   
- `request(payload: RWeb3APIPayload<API, Method>)` & `execute(payload: RWeb3APIPayload<API, Method>)`: Sends a request to the server, queuing the request, and awaiting the respective response.

- `listen(request: JsonRpcRequest)`: Set up a stream for listening to the specified events and establishes a new `RpcEventProducer`.
   
- `connected()`: Returns a promise that resolves when the websocket is connected.

- `disconnect()`: Disconnects the socket.

- `responseForRequestId(id: JsonRpcId)`: Returns the response for a given request id.

- `getClientUrl()`: Returns the URL of the client the websocket is connected to.

Structurally, a **WebsocketProvider** instance manages a `ReconnectingSocket` connection and contains a map of `subscriptionStreams`, and exposes APIs to control connection status, request processing, and error handling.

## Utility Functions

- `hasProtocol(url: string)`: Checks if a URL has protocol.

- `defaultErrorHandler(error: any)`: The default error handler which throws any received error.

- `toJsonRpcResponse(message: SocketWrapperMessageEvent)`: Converts a message to JsonRpcResponse.

- `parseJsonRpcResponse(data: any)`: Parses data into either a JsonRpcErrorResponse or a JsonRpcSuccessResponse.

- `parseJsonRpcErrorResponse(data: any)`: Parses data into a JsonRpcErrorResponse.

- `parseJsonRpcSuccessResponse(data: any)`: Parses data into a JsonRpcSuccessResponse.

- `isJsonRpcErrorResponse(response: JsonRpcResponse)`: Checks if a response is a JsonRpcErrorResponse.

- `toListPromise(stream: Stream, count: number)`: Promise that resolves when a given count of events have been collected from the stream.

- `firstEvent(stream: Stream)`: Promise that resolves when the first event is fired from the stream.
