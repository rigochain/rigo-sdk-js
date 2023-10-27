# WebsocketProvider

### 개요
**WebsocketProvider**은 큐와 스트림을 관리하고, 요청과 응답을 조정하며, 웹소켓을 통한 에러 이벤트를 처리하는데 사용됩니다. 주요 동작으로는 요청 보내기, 연결 설정, 리스너 생성, 메시지 유효성 검사 및 파싱 등이 이 클래스에서 구현되어 있습니다.

### 시작하기
```Typescript
import { WebsocketProvider } from '@rigochain/rweb3';
const provider = new WebsocketProvider('wss://rpc1.testnet.rigochain.io');
```
위 코드를 통해 `RIGO 노드`의 웹소켓을 연결할 수 있습니다.

### JsonRpcRequest
`RIGO 노드`에 연결된 웹소켓을 통해 `JSON RPC 메소드`를 호출할 수 있습니다.
아래 예제는 `RPC 메소드`의 `status`를 호출한 예시입니다.
```Typescript
//request 메소드를 사용하여 호출
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
또는
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
위 코드의 결과는 동일하고, 아래와 같습니다.
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


### RpcEventProducer 클래스

**RpcEventProducer**는 WebsocketProvider의 하위 클래스로, `SubscriptionEvent`를 생성하는 특정 역할을 가지고 있습니다.

메서드:

- `start(listener: Listener<SubscriptionEvent>)`: 프로듀서를 시작하며, 이미 프로듀서가 실행 중인 경우 오류를 발생시킵니다. 또한 소켓에 요청을 큐에 넣습니다.

- `stop()`: 프로듀서를 중지하고 서버에 종료 요청을 보내 리소스를 해제합니다. 소켓 연결이 열리지 않은 상황에서는 이 오류를 처리합니다.

- `connectToClient(listener: Listener<SubscriptionEvent>)`: 이 함수는 클라이언트로부터 응답을 듣기 위한 연결과 구독을 설정합니다.

- `closeSubscriptions()`: 모든 구독을 해지하고 구독 배열을 지웁니다.

### WebsocketProvider 클래스

메서드:

- `constructor(baseUrl: string, onError: (err: any) => void)`: 제공된 소켓 URL로 연결을 설정합니다.

- `request(payload: RWeb3APIPayload<API, Method>)` & `execute(payload: RWeb3APIPayload<API, Method>)`: 서버에 요청을 보내고, 요청을 큐에 넣은 후, 해당 응답을 기다립니다.

- `listen(request: JsonRpcRequest)`: 지정된 이벤트를 듣기 위한 스트림을 설정하고 새로운 `RpcEventProducer`를 생성합니다.

- `connected()`: 웹소켓이 연결될 때를 해결하는 프로미스를 반환합니다.

- `disconnect()`: 소켓을 연결 해제합니다.

- `responseForRequestId(id: JsonRpcId)`: 주어진 요청 id에 대한 응답을 반환합니다.

- `getClientUrl()`: 웹소켓이 연결된 클라이언트의 URL을 반환합니다.

구조적으로, **WebsocketProvider** 인스턴스는 `ReconnectingSocket` 연결을 관리하고 `subscriptionStreams`의 맵을 포함하며, 연결 상태, 요청 처리, 에러 처리를 제어하는 API를 제공합니다.

## 유틸리티 함수

- `hasProtocol(url: string)`: URL에 프로토콜이 있는지 확인합니다.

- `defaultErrorHandler(error: any)`: 받은 모든 오류를 발생시키는 기본 오류 핸들러입니다.

- `toJsonRpcResponse(message: SocketWrapperMessageEvent)`: 메시지를 JsonRpcResponse로 변환합니다.

- `parseJsonRpcResponse(data: any)`: 데이터를 JsonRpcErrorResponse 또는 JsonRpcSuccessResponse로 파싱합니다.

- `parseJsonRpcErrorResponse(data: any)`: 데이터를 JsonRpcErrorResponse로 파싱합니다.

- `parseJsonRpcSuccessResponse(data: any)`: 데이터를 JsonRpcSuccessResponse로 파싱합니다.

- `isJsonRpcErrorResponse(response: JsonRpcResponse)`: 응답이 JsonRpcErrorResponse인지 확인합니다.

- `toListPromise(stream: Stream, count: number)`: 스트림에서 주어진 카운트의 이벤트를 수집했을 때 해결되는 약속입니다.

- `firstEvent(stream: Stream)`: 스트림에서 첫 번째 이벤트가 발생할 때 해결되는 약속입니다.