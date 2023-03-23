## Subscriber

`Subscriber` API 를 사용하여 RIGO 네크워크에서 발생하는 특정 이벤트에 대한 정보를 구독할 수 있다.

```ts
import Subscriber from "subscriber";

const sub = new Subscriber('ws://localhost:26657/websocket');
sub.start("tm.event = 'NewBlock'", resp => {
    console.log(resp)
})

...

sub.stop()
```

이벤트 구독 쿼리문 구성은 [Event Query](../internals/event.md#event-query) 를 참조한다.

---

### constructor
```ts
constructor (public url:string)
```

#### Parameters
- `url`: RIGO Node 의 websocket endpoint. 

#### Returns
`Subscriber` 객체.

---

### start
```ts
start(query: string, cbFunc: (resp:string)=>void)
```
`query` 에 해당되는 이벤트 구독을 시작 한다.

#### start using Reconnected Option

```ts
start(query: string, cbFunc: (resp:string)=>void, isReconnected?: boolean, time?: number)
```
노드와 소켓 통신중 소켓 연결이 끊어졌을 때 해당 노드와 다시 재연결을 할 수 있도록 옵션을 줄 수 있다.

특별히 재연결을 하지 않는다면 기존 방식으로 처리하면 되지만 재연결을 할때 `boolean`으로 재연결 여부와 다시 연결 시도를 하기까지의 시간을 설정해서 보내면 된다.

```ts
const isReconnected = true
const timeout = 500
sub.start(
    "tm.event = 'Tx'",
    (resp) => {
        //do Something
    },
    isReconnected,
    timeout,
);
```
만일 재연결 옵션을 주었을 때 재연결 시간을 주지 않으면 기본적으로 `500`밀리세컨드로 재연결 시도를 하도록 설정되어 있다.

재연결 시간을 늘리거나 줄이고 싶다면 그에 맞춰서 옵션값을 넘겨주면 된다.

!!! tip
    [`RWeb3`의 `subscribe` API](rweb3.md#subscribe)를 사용하면 `Subscriber`의 생성과 구독 시작을 하나의 API로 수행할 수 있다.

#### Parameters
- `query` - `string` : 구독하고자 하는 이벤트 조건 지정.  
   이벤트 쿼리문은 `key operator operand` 형식의 `string` 으로 구성되며,
   복수의 쿼리문이 `AND` 로 연결될 수 있다.
   쿼리문 구성에 대한 자세한 사항은 [Event Query](../internals/event.md#event-query) 를 참조한다.
- `cbFunc` : 이벤트를 수신할 callback function.

---

### stop
```ts
stop()
```

`Subscriber` 객체의 구독을 중지 시킨다.

---
