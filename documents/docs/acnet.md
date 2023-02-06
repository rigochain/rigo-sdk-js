# ACNet

`ACNet` API를 사용하여 지정된 ARCANEX 노드에 다양한 요청 작업을 수행할 수 있다.

---

## queryAccount

```ts
static queryAccount(addr: string|Bytes, cb?:(_:any)=>void)
```

`addr`로 지정된 `Account`의 최신 상태 정보(`nonce`, `balance` 등) 를 조회 한다.

### Parameters

1. `addr`: 조회 대상 `Account`의 주소. (20bytes 또는 40chars hex-string)
2. `cb`: 조회 결과를 수신할 콜백 함수.

### Returns

`PromiseLike<any>`

### Examples

```ts

ACNet.queryAccount("DF976A96545DAD0E0B14FED615587A89BA980B84", resp => {
    console.log(resp)
})

```

```shell
{
    "key": "DF976A96545DAD0E0B14FED615587A89BA980B84",
    "value": {
        "address": "DF976A96545DAD0E0B14FED615587A89BA980B84",
        "nonce": 0,
        "balance": "0"
    }
}
```

---

## syncAccount

```ts
static syncAccount(acct: Account, cb?:(_:any)=>void) 
```

블록체인상에 기록된 `acct`의 최신 상태 정보(`nonce`, `balance`) 를 동기화 한다.

### Parameters

1. `acct`: 조회 대상 `Account` 객체.
2. `cb`: 조회 결과를 수신할 콜백 함수.

### Returns

`PromiseLike<any>`

### Examples

```ts
let acct = Account.New("test-0")

    ...

ACNet.syncAccount(acct, resp => {
    console.log(acct) // `acct` is not updated.
})
.then( resp => {
    console.log(acct) // `acct` is updated.
})
```

---

## queryValidators

---

## queryStakes

---

## queryDelegatee

---

## broadcastTrxSync

---

## queryTrx

---

## queryBlockByHeight

---

## queryBlockByHash

---

## queryRule

---

## getClient

---

## setUrl

---

## getUrl
