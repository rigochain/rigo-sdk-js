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

