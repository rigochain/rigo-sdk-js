# Subscriber

`Subscriber` API 를 사용하여 ARCANEX 네크워크에서 발생하는 특정 이벤트에 대한 정보를 구독할 수 있다.

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

## constructor

```ts
constructor (public url:string, public query:string)
```

### Parameters

1. `url`: ARCANEX Node 의 websocket endpoint. 
2. `query` - `string` : 구독하고자 하는 이벤트 조건 지정.
이벤트 쿼리문은 `key operator operand` 형식의 `string` 으로 구성되며,
복수의 쿼리문이 `AND` 로 연결될 수 있다.
쿼리문 구성에 대한 자세한 사항은 [Event Query](#event-query) 를 참조한다.


### Returns

`Subscriber` 객체.

---

## start

`start` API 를 사용하여 `Subscriber` 객체의 구독을 시작 할 수 있다.

```ts
start(cbFunc: (resp:string)=>void)
```

### Parameters

1. `cbFunc` : 이벤트를 수신할 callback function.

### Returns

N/A

---

## stop

`start` API를 통해 구독중인 `Subscriber` 객체의 구독을 중지 시킨다.

### Parameters

N/A

### Returns

N/A

---

## Listen

`Subscriber` 객체의 생성(`constructor`) 와 구독 시작(`start`)을 `Listener` API 하나로 수행할 수 있다.

### Parameters

1. `url` : ARCANEX Node 의 websocket endpoint.
2. `query` : 구독하고자 하는 이벤트 조건 지정.
3. `cb` : 이벤트를 수신할 callback function.

### Returns

`Subscriber` 객체.

### Examples

```ts
var sub = Subscriber.Listen('ws://localhost:26657/websocket', "tm.event='NewBlockHeader'", (resp) => {
    if(!resp.data) {
        return
    }
    console.log(resp)
    // do something
})

...

listener.stop()
```

## Event Query

이벤트 쿼리는 **"key operator operand"** 형식의 `string` 으로 구성되며, 복수의 쿼리문은 `AND` 로 연결될 수 있다.

### key

구독할 이벤트의 종류를 제한하기 위하여 사용하며 ARCANEX 에 사전 정의된 **key**는 다음과 같다.

- `tm.event` : 구독할 이벤트 종류를 제한 한다. 다음과 같이 값을 가질 수 있다.
    - `tm.event = 'NewBlock'`
    - `tm.event = 'NewBlockHeader'`
    - `tm.event = 'Tx'`

- `tx.hash` : 트랜잭션 hash. `tm.event='Tx'` 와 함께 사용된다.  
트랜잭션 hash는 `0x`를 제거한 대문자 Hex-String 으로 지정한다.

- `tx.height` : 트랜잭션이 포함된 블록의 번호. `tm.event='Tx'` 와 함께 사용된다.

- `tx.type` : 트랜잭션의 종류. `tm.event='Tx'` 와 함께 사용된다. 다음과 같은 값을 가질 수 있다.
    - `tx.type = 'transfer'`
    - `tx.type = 'staking'`
    - `tx.type = 'unstaking'`

- `tx.sender` : 트랜잭션의 `sender` 주소. `tm.event='Tx'` 와 함께 사용된다.  
주소는 `0x`를 제거한 대문자 Hex-String 으로 지정한다.  
- `tx.receiver` - 트랜잭션의 `receiver` 주소. `tm.event='Tx'` 와 함께 사용된다.  
주소는 `0x`를 제거한 대문자 Hex-String 으로 지정한다.
- `tx.addrpair` - 트랜잭션의 `sender | receiver` 주소 합성. `tm.event='Tx'` 와 함께 사용된다.  


### operation

**key** 와 **operand** 의 관계를 나타내며,
`=`, `<`, `<=`, `>`, `>=`, `CONTAINS`, `EXISTS` 값을 가질 수 있다.

### operand

**key** 의 값에 해당한다.

### Example

```ts
import Subscriber from "./subscriber";

// 신규로 블록이 생성될 때 마다 블록 정보 구독
var sub = new Subscriber("ws://localhost:26657/websocket", "tm.event = 'NewBlock'")
sub.start( resp => console.log(resp) )
        ...

// 트랜잭션 hash 가 'A7FC574491B18ADD8E3DD60E7442CB34D90A4862E30E9E9B5412154EBFB0E100' 인 
// 트랜잭션이 처리되었을 때, 해당 트랜잭션 정보 수신.
var sub = new Subscriber("ws://localhost:26657/websocket", "tm.event = 'Tx' AND tx.hash='A7FC574491B18ADD8E3DD60E7442CB34D90A4862E30E9E9B5412154EBFB0E100'")
sub.start( resp => console.log(resp) )
        ...

// 트랜잭션 타입이 'transfer' 이고, 
// sender 주소가 'D8C2C3D121696F51B733F7CF36C8AE60F8F264CC' 인 
// 트랜잭션이 처리되었을 때, 해당 트랜잭션 정보 수신.
var sub = new Subscriber("ws://localhost:26657/websocket", "tm.event = 'Tx' AND tx.type='transfer' AND tx.sender='D8C2C3D121696F51B733F7CF36C8AE60F8F264CC'")
sub.start( resp => console.log(resp) )
        ...

// 트랜잭션 타입이 'transfer' 이고, 
// sender 주소가 'D8C2C3D121696F51B733F7CF36C8AE60F8F264CC' 인 
// 트랜잭션이 처리되었을 때, 해당 트랜잭션 정보 수신.
var sub = new Subscriber("ws://localhost:26657/websocket", "tm.event = 'Tx' AND tx.type='transfer' AND tx.sender='D8C2C3D121696F51B733F7CF36C8AE60F8F264CC'")
sub.start( resp => console.log(resp) )
        ...

```