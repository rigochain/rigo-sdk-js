## Subscriber

`Subscriber` API 를 사용하여 NRIGO 네크워크에서 발생하는 특정 이벤트에 대한 정보를 구독할 수 있다.

```ts
import Subscriber from "./subscriber";

const sub = new Subscriber('ws://localhost:26657/websocket', "tm.event = 'NewBlock'");
sub.start( resp => {
    console.log(resp)
})

...

sub.stop()
```

---

### constructor

```ts
constructor (public url:string, public query:string)
```

#### Parameters

1. `url`: NRIGO Node 의 websocket endpoint. 
2. `query` - `string` : 구독하고자 하는 이벤트 조건 지정.  
이벤트 쿼리문은 `key operator operand` 형식의 `string` 으로 구성되며,
복수의 쿼리문이 `AND` 로 연결될 수 있다.
쿼리문 구성에 대한 자세한 사항은 [Event Query](#event-query) 를 참조한다.


#### Returns

`Subscriber` 객체.

---

### start

`start` API 를 사용하여 `Subscriber` 객체의 구독을 시작 할 수 있다.

```ts
start(cbFunc: (resp:string)=>void)
```

#### Parameters

1. `cbFunc` : 이벤트를 수신할 callback function.

#### Returns

N/A

---

### stop

`start` API를 통해 구독중인 `Subscriber` 객체의 구독을 중지 시킨다.

#### Parameters

N/A

#### Returns

N/A

---

