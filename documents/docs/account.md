# Account

`Account` API 를 사용하여 ARCANEX Account 를 생성하고, 전자서명 및 전자서명 검증을 수행할 수 있다.
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

`nonce`와, `balance` 정보는 블록체인에 기록된 값으로 동기화가 이루어져야 한다.

---

## New

새로운 `Account` 객체를 생성한다.

```ts
static New(nm: string, secret: string): Account
```

### Parameters

- `nm`: 계정 이름.
- `secret`: 계정의 Private Key 암호화를 위한 비밀번호.

### Returns

`Account` 객체.

---

## Import

외부에 존재하는 Private Key 를 가져와 `Account`를 생성한다.

```ts
static Import(nm: string, secret: string, d: Bytes, dsecret?:string): Account
```


### Parameters

- `nm`: 계정 이름.
- `secret`: 계정의 Private Key 암호화를 위한 비밀번호.
- `d`: Private Key.
- `dsecret`: `d`가 암호화된 형태라면, 이를 복호화 하기 위한 비밀번호. (*not implemented yet*)

### Returns

`Account` 객체.

---

## sign

현재 계정의 Private Key 로 전자서명을 생성한다.

```ts
sign(msg: Uint8Array): Bytes
```

### Parameters

1. `msg`: 전자서명 대상 메시지 데이터.

### Returns

전자서명 데이터.

### Examples

```ts
...
let msg = new TextEncoder().encode("this is message to be signed");
const sig = acct.sign(msg)
console.log(sig.toHex()) // 65bytes hex-string (130chars)
```
---

## verify

현재 계정의 Public Key 로 전자서명을 검증한다.

```ts
verify(sig: Uint8Array, msg: Uint8Array): boolean
```

### Parameters

1. `sig`: 전자서명 데이터. 65bytes.
2. `msg`: 전자서명 대상 메시지 데이터.

### Returns

전자서명 검증 결과.

### Examples

```ts
...
const ret = acct.verify(sig, msg)
console.log("verify result", ret) // true or false

```