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

`Subscriber` 객체의 생성(`constructor`) 와 구독 시작(`start`)을 `Listen` API 하나로 수행할 수 있다.

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

### Examples

#### Block event

```ts
import Subscriber from "./subscriber";


// 블록 생성 이벤트 구독 요청
var sub = new Subscriber("ws://localhost:26657/websocket", "tm.event = 'NewBlockHeader'")
sub.start( resp => console.log(resp) )
        ...

// 수신된 이벤트 정보
{
    "query": "tm.event='NewBlockHeader'",
    "data": {
        "type": "tendermint/event/NewBlockHeader",
        "value": {
            "header": {
                "version": {
                    "block": "11",
                    "app": "4294967296"
                },
                "chain_id": "localnet",
                "height": "92175",
                "time": "2023-02-13T13:27:58.840771Z",
                "last_block_id": {
                    "hash": "525B7E1B39ABFF6643D5CA0AF2B4C080AA69B8F6E6B88F5D96FA1C4B669EDA57",
                    "parts": {
                        "total": 1,
                        "hash": "518791BB1F931395B3036C8E9AEC40E92498FE30A582F8DF871790A6A48CCD33"
                    }
                },
                "last_commit_hash": "CC16D8C757360897B9682646F2D910ECC77A2A80EED54AE06D0539E365B77164",
                "data_hash": "E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855",
                "validators_hash": "FE36DFA0965A3207F370004FD5A35B0D9CFE22C1E5EC6282B11E0A078E022C11",
                "next_validators_hash": "FE36DFA0965A3207F370004FD5A35B0D9CFE22C1E5EC6282B11E0A078E022C11",
                "consensus_hash": "048091BC7DDC283F77BFBF91D73C44DA58C3DF8A9CBC867405D8B7F3DAADA22F",
                "app_hash": "F05DE653A484B266512480747A80522450D9241D3AE43E5FB49FBB6613FB07CF",
                "last_results_hash": "E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855",
                "evidence_hash": "E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855",
                "proposer_address": "8DC41A86B91EB88D82489C4D037AE9FFCA65CFBF"
            },
            "num_txs": "0",
            "result_begin_block": {},
            "result_end_block": {
                "validator_updates": []
            }
        }
    },
    "events": {
        "tm.event": [
            "NewBlockHeader"
        ]
    }
}
```

#### Transaction event

```ts
// 
// 트랜잭션 hash 'A7FC574491B18ADD8E3DD60E7442CB34D90A4862E30E9E9B5412154EBFB0E100' 인 
// 트랜잭션 처리완료 이벤트 구독 요청
var sub = new Subscriber("ws://localhost:26657/websocket", "tm.event = 'Tx' AND tx.hash='A7FC574491B18ADD8E3DD60E7442CB34D90A4862E30E9E9B5412154EBFB0E100'")
sub.start( resp => console.log(resp) )
        ...

// 수신된 이벤트 정보

```

```ts
// 트랜잭션 타입이 'transfer' 이고, 
// sender 주소가 'D8C2C3D121696F51B733F7CF36C8AE60F8F264CC' 인 
// 트랜잭션 처리완료 이벤트 구독 요청.
var sub = new Subscriber("ws://localhost:26657/websocket", "tm.event = 'Tx' AND tx.type='transfer' AND tx.sender='D8C2C3D121696F51B733F7CF36C8AE60F8F264CC'")
sub.start( resp => console.log(resp) )
        ...

// 수신된 이벤트 정보
```

```ts
// 트랜잭션 타입이 'transfer' 이고, 
// sender 주소가 'D8C2C3D121696F51B733F7CF36C8AE60F8F264CC' 인 
// 트랜잭션 처리완료 이벤트 구독 요청.
var sub = new Subscriber("ws://localhost:26657/websocket", "tm.event = 'Tx' AND tx.type='transfer' AND tx.sender='D8C2C3D121696F51B733F7CF36C8AE60F8F264CC'")
sub.start( resp => console.log(resp) )
        ...

// 수신된 이벤트 정보

```