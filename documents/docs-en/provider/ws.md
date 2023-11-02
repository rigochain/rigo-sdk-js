# WebsocketProvider

## Summary
The `WebsocketProvider` is used for managing queues and streams, coordinating requests and responses, and handling error events over WebSockets. Key functionalities implemented in this class include sending requests, configuring connections, creating listeners, message validation, and parsing, among others.
## Getting Started
```Typescript
import { WebsocketProvider } from '@rigochain/rweb3';
const provider = new WebsocketProvider('wss://rpc1.testnet.rigochain.io');
```
You can establish a connection to the WebSocket of the `RIGO node` using the provided code.

## JsonRpcRequest
You can invoke JSON RPC methods over the WebSocket connected to the `RIGO node`. The following example demonstrates calling the `status` RPC method.
```Typescript
// You can use the request method to make the call.
import { WebsocketProvider, JsonRpcRequest } from '@rigochain/rweb3';
const provider = new WebsocketProvider('wss://rpc1.testnet.rigochain.io');
const json: JsonRpcRequest<any> = {
    jsonrpc: '2.0',
    id: '',
    method: 'status',
    params: {},
}
const result = await provider.request(json);
console.log(result);
```
or
```Typescript
//execute 메소드를 사용하여 호출
import { WebsocketProvider, JsonRpcRequest } from '@rigochain/rweb3';
const provider = new WebsocketProvider('wss://rpc1.testnet.rigochain.io');
const json: JsonRpcRequest<any> = {
    jsonrpc: '2.0',
    id: '',
    method: 'status',
    params: {},
}
const result = await provider.execute(json);
console.log(result);
```
The result of the above code is the same and is as follows.
```shell
{
  jsonrpc: '2.0',
  id: '',
  result: {
    node_info: {
      protocol_version: [Object],
      id: '7ba9e3621084c4997c788c0b69290c4d55ba6eb5',
      listen_addr: 'tcp://0.0.0.0:26656',
      network: 'testnet0',
      version: '0.34.24',
      channels: '40202122233038606100',
      moniker: 'ip-10-40-10-91',
      other: [Object]
    },
    sync_info: {
      latest_block_hash: '8BF045FD391E17EB8DED4E0FB840A50826B8EAA6D7AA0F25A0C6CFCD6754692E',
      latest_app_hash: '92C3F4F2DD2EFA13A93DE42CC2CD0C758FB3E8A3E93A20567F1CE73959BDD2BE',
      latest_block_height: '242552',
      latest_block_time: '2023-10-27T07:06:03.048565232Z',
      earliest_block_hash: '8DAECF4CB13892442ABE50BCD8B5F7249B3B5E38D824198EF7792EC4BC8A8FE2',
      earliest_app_hash: '394D26CA253D1453A8485F19C0845F7752B78F8804A1CD37968A8089A72B6117',
      earliest_block_height: '1',
      earliest_block_time: '2023-10-23T00:55:13.604720042Z',
      catching_up: false
    },
    validator_info: {
      address: 'DE24F5F2642A0DAEFDC994C99F2067DE11FFFBF2',
      pub_key: [Object],
      voting_power: '0'
    }
  }
}
```

## Subscribe
You can subscribe to events from the `RIGO node` using WebSockets. Below is an example of subscribing to the `NewBlockHeader` event.

```Typescript
import { WebsocketProvider, JsonRpcRequest, SubscriptionEvent } from '@rigochain/rweb3';
const provider = new WebsocketProvider('wss://rpc1.testnet.rigochain.io');
const json: JsonRpcRequest<any> = {
    jsonrpc: '2.0',
    id: '',
    method: 'subscribe',
    params: { query: "tm.event='NewBlockHeader'"},
}
provider.listen(json).subscribe({
    error: (err) => {
        console.log(err);
    },
    complete: () => {
        console.log('subscription should not complete');
    },
    next: (event: SubscriptionEvent) => {
        console.log(event);
    }
})
```
The result of subscribing to the NewBlockHeader event is as follows.
```shell
{
  query: "tm.event='NewBlockHeader'",
  data: {
    type: 'tendermint/event/NewBlockHeader',
    value: {
      header: [Object],
      num_txs: '0',
      result_begin_block: [Object],
      result_end_block: [Object]
    }
  },
  events: {
    'reward.issued': [ '33295281579000000' ],
    'tm.event': [ 'NewBlockHeader' ]
  }
}
```
The types of queries for the subscription request, which you can use to subscribe to events, are as follows:
- tm.event = 'NewBlockHeader'
- tm.event = 'NewBlock'
- tm.event = 'Tx'

You can also specify `tx.type` along with the Tx event. Examples of tx.type are as follows:

- tm.event = 'Tx' AND tx.hash = `transaction hash`
- tm.event = 'Tx' AND tx.type = 'transfer' AND tx.sender = `sender address`

## Class
RpcEventProducer Class:
The `RpcEventProducer` is a subclass of WebsocketProvider and plays a specific role in generating SubscriptionEvents.

- `start(listener: Listener<SubscriptionEvent>)`: Starting the producer, and if the producer is already running, it raises an error. It also places requests in the socket queue.

- `stop()`: Stopping the producer and sending a termination request to the server to release resources. It handles this error in situations where the socket connection is not open.

- `connectToClient(listener: Listener<SubscriptionEvent>)`: This function sets up a connection and subscription to listen for responses from the client.

- `closeSubscriptions()`: Unsubscribing from all subscriptions and clearing the subscription array.

WebsocketProvider Class:
A **WebsocketProvider** instance manages `ReconnectingSocket` connections, contains a map of `subscriptionStreams`, and provides an API for controlling the connection status, request handling, and error handling.

- `constructor(baseUrl: string, onError: (err: any) => void)`: It establishes a connection to the provided socket URL.

- `request(payload: RWeb3APIPayload<API, Method>)` & `execute(payload: RWeb3APIPayload<API, Method>)`: It sends a request to the server, places the request in the queue, and waits for the response.

- `listen(request: JsonRpcRequest)`: It sets up a stream to listen for the specified event and creates a new `RpcEventProducer`.

- `connected()`: It returns a promise that resolves when the WebSocket connection is established.

- `disconnect()`: Disconnects the socket.

- `responseForRequestId(id: JsonRpcId)`: Returns the response for the given request id.

- `getClientUrl()`: Returns the URL of the connected WebSocket client.


## Utility Functions

- `hasProtocol(url: string)`: Checks if there is a protocol in the URL.

- `defaultErrorHandler(error: any)`: The default error handler that throws any received errors.

- `toJsonRpcResponse(message: SocketWrapperMessageEvent)`: Converts a message to a JsonRpcResponse.

- `parseJsonRpcResponse(data: any)`: Parses data into a JsonRpcErrorResponse or JsonRpcSuccessResponse.

- `parseJsonRpcErrorResponse(data: any)`: Parses data into a JsonRpcErrorResponse.

- `parseJsonRpcSuccessResponse(data: any)`: Parses data into a JsonRpcSuccessResponse.

- `isJsonRpcErrorResponse(response: JsonRpcResponse)`: Checks if the response is a JsonRpcErrorResponse.

- `toListPromise(stream: Stream, count: number)`: A promise that resolves when a given count of events have been collected from the stream.

- `firstEvent(stream: Stream)`: A promise that resolves when the first event occurs in the stream.