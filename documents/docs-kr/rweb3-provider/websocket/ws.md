# WebsocketProvider

## 시작하기
```Typscript
import { WebsocketProvider } from '@rigochain/rweb3-types';
const provider = new WebsocketProvider('ws://localhost:8546');


let rweb3 = new RWeb3(provider);

또는

let rweb3 = new RWeb3();
rweb3.setProvider(provider);
```

## 설명

**WebsocketProvider**은 `@rigochain/rweb3-types` 패키지의 클래스로, 큐와 스트림을 관리하고, 요청과 응답을 조정하며, 웹소켓을 통한 에러 이벤트를 처리하는데 사용됩니다. 주요 동작으로는 요청 보내기, 연결 설정, 리스너 생성, 메시지 유효성 검사 및 파싱 등이 이 클래스에서 구현되어 있습니다.

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