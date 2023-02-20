# Account

## Description

Account(계정) 란, 블록체인 상에서 발생되는 상태 변경의 주체에 해당된다.
즉 Account 단위로 자산을 보유하고, 전송하고, 스테이킹하고, 투표하는 것이다.  
기술적으로 Account는 하나의 Private/Public Key Pair 에 대응된다.
즉 Account를 생성한다는 것은 새로운 Private/Public Key Pair 생성을 의미한다.

`Account` 객체를 생성하고, 생성된 `Account` 의 API를 사용하여 전자서명 및 전자서명 검증을 수행할 수 있다.
`Account` 객체는 다음과 같은 정보를 갖는다.

```ts
class Account {
    address: string
    name: string
    nonce: number
    balance: string
}
```

- `address`: 계정(Account)의 주소. 20bytes Hex String (40chars).
- `name`: 계정(Account)의 이름. (*not implemented yet. 향후 Account Name Service 를 위함.*). 
- `nonce`: 현재 계정이 지금까지 발행한 트랜잭션 수.
- `balance`: 계정의 잔액.

!!! note
    `nonce`와, `balance` 정보는 블록체인에 기록된 값으로 동기화가 이루어져야 한다.
    `Account` 객체의 동기화는 [`ACNet.syncAccount`](../api/acnrpc.md#syncaccount) API를 사용한다.

---
