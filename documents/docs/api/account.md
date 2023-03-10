## Account

### New
```ts
static New(nm: string, secret: string): Account
```
새로운 `Account` 객체를 생성한다.

#### Parameters
- `nm`: 계정 이름.
- `secret`: 계정의 PrivateKey 암호화를 위한 비밀번호.

#### Returns
`Account` 객체.

#### Example
```ts
let acct = Account.New("my account 1", "my passphrase")
```
---

### Import
```ts
static Import(nm: string, secret: string, d: Bytes, dsecret?:string): Account
```
외부에 존재하는 PrivateKey 를 가져와 `Account`를 생성한다.

#### Parameters
- `nm`: 계정 이름.
- `secret`: 계정의 PrivateKey 암호화를 위한 비밀번호.
- `d`: PrivateKey.
- `dsecret`: `d`가 암호화된 형태라면, 이를 복호화 하기 위한 비밀번호. (*Not implemented yet*)

#### Returns
`Account` 객체.

#### Example
```ts
// convert 64chars hex-string(32bytes) to Bytes
const prvKeyBytes = Bytes.fromHex("ABCDEF0123456789....")
const importedAcct = Account.Import("new name", "new passphrase", prvKeyBytes)
```

---

### sign
```ts
sign(msg: Uint8Array): Bytes
```
현재 `Account` 객체의 PrivateKey 로 전자서명을 생성한다.

#### Parameters
- `msg`: 전자서명 대상 메시지 데이터.

#### Returns
현재 `Account` 객체의 PrivateKey로 생성된 전자서명.

#### Examples
```ts
let msg = new TextEncoder().encode("this is message to be signed");
const sig = acct.sign(msg)
console.log(sig.toHex()) // 65bytes hex-string (130chars)
```
---

### verify
```ts
verify(sig: Uint8Array, msg: Uint8Array): boolean
```
현재 `Account` 객체의 PublicKey 로 전자서명 `sig`를 검증한다.

#### Parameters
- `sig`: 전자서명 데이터. 65bytes.
- `msg`: 전자서명 대상 메시지 데이터.

#### Returns
전자서명 검증 결과.

#### Examples

```ts
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

