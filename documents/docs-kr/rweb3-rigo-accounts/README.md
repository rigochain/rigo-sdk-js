# rweb3-rigo-accounts

## 개요

이 모듈은 RWeb3 라이브러리를 사용하여 Rigo Chain 계정을 처리하고 트랜잭션에 서명하는 유틸리티를 제공합니다. 키의 다른 표현 간 변환과 메시지 및 트랜잭션 서명을 위한 여러 함수를 내보냅니다.

## 사용법

### `create()`

```agsl
import { create, RWeb3Account } from '@rigochain/rweb3-rigo-accounts';

// 랜덤 계정 생성 
const account: RWeb3Account = create();
```

이 함수는 새 RWeb3 계정을 생성합니다. 이는 새 개인 키와 해당 공개 키 및 주소를 생성하는 것을 포함합니다.

`RWeb3Account` 객체를 반환합니다.

### `privateKeyToAccount(privateKey)`

```agsl
import { create, privateKeyToAccount, RWeb3Account } from '@rigochain/rweb3-rigo-accounts';

const account: RWeb3Account = privateKeyToAccount(account.privateKey);
```

이 함수는 개인 키(16진수 문자열 또는 `ArrayBufferLike` 객체)를 가져와 해당 공개 키 및 주소가 있는 완전한 `RWeb3Account` 객체를 반환합니다.

### `privateKeyToPrvKey(privateKey)`

```agsl
import { create, privateKeyToAccount, RWeb3Account } from '@rigochain/rweb3-rigo-accounts';

const prvKey: PrvKey = privateKeyToPrvKey(account.privateKey);
```

이 함수는 개인 키를 가져와서 `PrvKey` 형식으로 반환합니다. 16진수 문자열 또는 `ArrayBufferLike` 객체를 받습니다.

### `prvKeyToAccount(prvKey)`

```agsl
import { RWeb3Account, privateKeyToPrvKey, prvKeyToAccount, PrvKey } from '@rigochain/rweb3-rigo-accounts';

const prvKey: PrvKey = privateKeyToPrvKey(account.privateKey);
const account: RWeb3Account = prvKeyToAccount(prvKey);

```
이 유틸리티 함수는 `PrvKey` 객체를 공개 키 및 주소 등 여러 속성이 있는 완전한 `RWeb3Account` 객체로 변환합니다.

### `signTransaction(trxProto, privateKey)`

```agsl
import {
  signTransaction,
  TrxProtoBuilder,
} from "@rigochain/rweb3-rigo-accounts";

// 트랜잭션을 만듭니다.
const tx = TrxProtoBuilder.buildTransferTrxProto({
  from: "from",
  nonce: 1,
  to: "6fff13a50450039c943c9987fa43cef0d7421904",
  amount: "1000000000000000",
  gas: 100000,
  gasPrice: "10000000000",
});

// 트랜잭션에 서명합니다.
const { rawTransaction, transactionHash } = signTransaction(tx, "private key hex string");

```
이 함수는 트랜잭션에 서명합니다. 트랜잭션은 초기에는 `TrxProto` 객체이며, 개인 키는 16진수 문자열 또는 `ArrayBufferLike`입니다.

이것은 원시 Base64 인코딩된 트랜잭션과 트랜잭션 해시를 포함하는 `SignTransactionResult`를 반환합니다. 이 함수는 API의 나머지 부분과 호환되도록 비동기이지만, 실제로는 비동기 작업을 수행하지 않습니다.