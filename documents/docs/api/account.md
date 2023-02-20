## Account

### Account.New
```ts
static New(nm: string, secret: string): Account
```

새로운 `Account` 객체를 생성한다.

#### Parameters

- `nm`: 계정 이름.
- `secret`: 계정의 Private Key 암호화를 위한 비밀번호.

#### Returns

`Account` 객체.

---

### Account.Import

```ts
static Import(nm: string, secret: string, d: Bytes, dsecret?:string): Account
```

외부에 존재하는 Private Key 를 가져와 `Account`를 생성한다.

#### Parameters

- `nm`: 계정 이름.
- `secret`: 계정의 Private Key 암호화를 위한 비밀번호.
- `d`: Private Key.
- `dsecret`: `d`가 암호화된 형태라면, 이를 복호화 하기 위한 비밀번호. (*not implemented yet*)

#### Returns

`Account` 객체.

---

### sign

```ts
sign(msg: Uint8Array): Bytes
```

현재 `Account` 객체의 Private Key 로 전자서명을 생성한다.

#### Parameters

1. `msg`: 전자서명 대상 메시지 데이터.

#### Returns

현재 `Account` 객체의 Private Key로 생성된 전자서명.

#### Examples

```ts
...
let msg = new TextEncoder().encode("this is message to be signed");
const sig = acct.sign(msg)
console.log(sig.toHex()) // 65bytes hex-string (130chars)
```
---

### verify

```ts
verify(sig: Uint8Array, msg: Uint8Array): boolean
```

현재 `Account` 객체의 Public Key 로 전자서명 `sig`를 검증한다.

#### Parameters

1. `sig`: 전자서명 데이터. 65bytes.
2. `msg`: 전자서명 대상 메시지 데이터.

#### Returns

전자서명 검증 결과.

#### Examples

```ts
...
const ret = acct.verify(sig, msg)
console.log("verify result", ret) // true or false=
```

---

### lock

Not implemented.

#### Parameters

#### Returns

---

### unlock

Not implemented.

#### Parameters

#### Returns

