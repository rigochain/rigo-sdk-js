## TrxBuilder

NRIGO 블록체인에 제출할 트랜잭션을 생성한다.  
생성되는 트랜잭션 객체는 [TrxProto](../internals/data.md#trxproto) 객체로 표현되며, 
전자서명 및 인코딩 과정을 거쳐 네트워크에 제출 되어 질 수 있다.

트랜잭션 객체 `TrxProto`은 `TrxBuilder.BuildXXXX` API를 통해 생성된다.
API 이름에 `XXXX` 에는 트랜잭션 종류를 타나내는 이름으로 구성된다.  

전자서명은 `TrxBuild.SignTrx` API를 사용한다.

마지막으로 트랜잭셔의 제출은 `RWeb3`의 `broadcastTrxSync` API를 사용한다.

```ts
import RWeb3 from "rweb3";

const rweb3 = new RWeb3('http://localhost:26657')

const tx = TrxBuilder.BuildTransferTrx({
    from: acct.address,
    to: receiver_address,
    nonce: acct.nonce + 1,
    gas: "10",
    amount: "1000000"
}
})

const [sig, encodedTx] = TrxBuilder.SignTrx(tx, acct)
console.log("sig", sig)             // print signature bytes
console.log("encoded", encodedTx)   // print bytes which is encoded by protobuf v3

rweb3.broadcastTrxSync(tx).then(resp => {
    console.log(resp) // the result of submitting transaction
})

```

`TrxBuilder` 가 제공하는 API는 다음과 같다.

### BuildTransferTrx
Coin 전송 트랜잭션 갹체를 생성한다.

```ts
function BuildTransferTrx(obj: Trx): trxPb.TrxProto
```

#### Parameters

- `obj`: 트랜잭션 생성시 필요한 값으로 구성된 [Trx](../internals/data.md#trx) 객체

#### Returns

전송 트랜잭션 객체 [TrxProto](../internals/data.md#trxproto) 

#### Examples

```ts
const tx = TrxBuilder.BuildTransferTrx({
      from: acct.address,
      to: receiver_address,
      nonce: acct.nonce + 1,
      gas: "10",
      amount: "1000000"}
  })
```

---


### BuildDelegateTrx

지분 전환/위임 트랜잭션을 생성한다. 

```ts
function BuildDelegateTrx(obj: Trx): trxPb.TrxProto
```

#### Parameters
- `obj`: 트랜잭션 생성시 필요한 값으로 구성된 [Trx](../internals/data.md#trx) 객체.  
  `obj.from == obj.to` 이면 **지분전환**,  
  `obj.from != obj.to` 이면 **지분전환**에 해당 된다.

#### Returns

지분 전환/위임 트랜잭션 객체 [TrxProto](../internals/data.md#trxproto)

#### Examples

---

### BuildUndelegateTrx

지분을 다시 자산으로 전환하기 위한 트랜잭션 갹체를을 생성한다.

```ts
function BuildUndelegateTrx(obj: Trx): trxPb.TrxProto
```

#### Parameters

- `obj`: 트랜잭션 생성시 필요한 값으로 구성된 [Trx](../internals/data.md#trx) 객체.  
  - `payload`: 자산으로 전환할 지분(stake) 정보를 포함하는 [TrxPayloadUndelegating](../internals/data.md#trxpayloadundelegating).
  `TrxPayloadUndelegating` 의 `txhash`는, 자산으로 전환할 지분이, 지분으로 전환 처리되었을 때의 트랜잭션 해시값이다.

#### Returns

자산 전환 트랜잭션 객체 [TrxProto](../internals/data.md#trxproto)

#### Examples

---

### SignTrx

트랜잭션에 전자서명을 추가한다.

```ts
function SignTrx(tx:trxPb.TrxProto, acct:Account): [Bytes, Bytes]
```

#### Parameters

- `tx`: 전자서명 대상 트랜잭션 객체.
- `acct`: 전자서명 주체 계정. 이는 `tx.from` 을 주소로 갖는 계정이어야 한다.

#### Returns

1. 전자서명 데이터.
2. 전자서명된 트랜잭션을 protobuf v3로 인코딩한 데이터.

#### Examples

---

### DecodeTrx
Protobuf v3 로 인코딩된 데이터로 부터 `Trx` 객체를 생성한다.  
NRIGO 노드로 부터 수신한 트랜잭션 정보는 protobuf v3 로 인코딩한 값을 base64 로 다시 인코딩한 값이다.
이 값을 디코딩 하기 위해서는 우선 base64 디코딩이 필요하고 그 결과를 다시 `DecodeTrx` API로 디코딩 해야 한다.  

!!! tip
    `RWeb3`의 `queryTrx` API 의 응답에는 디코딩 완료된 트랜잭션 정보가 이미 포함되어 있어 별도의 디코딩 과정이 필요하지 않다. 
    

```ts
function DecodeTrx(d: Bytes): Trx
```

#### Parameters

- `d`: Protobuf v3 로 인코딩된 트랜잭션 데이터

#### Returns

[Trx](../internals/data.md#trx) 객체

#### Examples
