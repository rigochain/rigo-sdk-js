# rweb3 transaction

## 개요
이 문서는 `@rigochain/rweb3` 라이브러리를 사용하여 `RIGO` 블록체인의 트랜잭션을 생성하고, 제출하는 방법에 대해서 
예시를 통해 설명합니다.

## 트랜잭션
`RIGO` 블록체인에 제출하기 위한 트랜잭션을 생성하기 위해서 `@rigochain/rweb3`의 `TrxProtoBuilder` 에서는 트랜잭션 타입 별 빌드하기 위한 함수들을 제공합니다.

### 거래
`RIGO` 계정 간의 거래를 위한 트랜잭션을 생성할 수 있습니다. 
`buildTransferTrxProto`의 필수 인자 값은 아래와 같습니다.
- from : 보내는 주소
- to : 받는 주소
- nonce : 계정의 nonce
- amount : 전송하고자 하는 RIGO 수량
- gas : 가스 수량
- gasPrice : 가스 가격

아래의 코드는 `TrxProtoBuilder`의 `buildTransferTrxProto` 를 사용하여 트랜잭션을 생성하고, `RIGO` 테스트 네트워크에 제출하는 예시입니다.

```typescript
import { RWeb3, TrxProtoBuilder, TrxProto, AccountResponse } from '@rigochain/rweb3';
import { RWeb3Account } from '@rigochain/rweb3-rigo-accounts';

// create rweb3 instance
const rweb3 = new RWeb3('https://rpc1.testnet.rigochain.io');

// import private key
const privateKey: string = 'your private key';
const account: RWeb3Account = privateKeyToAccount(privateKey);

// get accountInfo
const accountInfo: AccountResponse = await rweb3.rigo.getAccount(account.address);

// create transaction
const trxProto: TrxProto = TrxProtoBuilder.buildTransferTrxProto({
    from: accountInfo.value.address,
    to: 'address',
    nonce: account.value.nonce,
    amount: '100',
    gas: 1000000,
    gasPrice: '250000000000',
});

// sign transaction
const { rawTransaction } = account.signTransaction(tx, 'testnet0');

// broadcast raw transaction
const result = await rweb3.rigo.broadcastRawTxCommit(rawTransaction);
```

### 위임
`RIGO` 계정 간의 위임를 위한 트랜잭션을 생성할 수 있습니다.
`buildDelegateTrxProto`의 필수 인자 값은 아래와 같습니다.
- from : 보내는 주소
- to : 위임 대상 주소
- nonce : 계정의 nonce
- amount : 전송하고자 하는 RIGO 수량
- gas : 가스 수량
- gasPrice : 가스 가격

아래의 코드는 `TrxProtoBuilder`의 `buildDelegateTrxProto` 를 사용하여 트랜잭션을 생성하고, `RIGO` 테스트 네트워크에 제출하는 예시입니다.

```typescript
import { RWeb3, TrxProtoBuilder, TrxProto, AccountResponse } from '@rigochain/rweb3';
import { RWeb3Account } from '@rigochain/rweb3-rigo-accounts';

// create rweb3 instance
const rweb3 = new RWeb3('https://rpc1.testnet.rigochain.io');

// import private key
const privateKey: string = 'your private key';
const account: RWeb3Account = privateKeyToAccount(privateKey);

// get accountInfo
const accountInfo: AccountResponse = await rweb3.rigo.getAccount(account.address);

// create transaction
const trxProto: TrxProto = TrxProtoBuilder.buildDelegateTrxProto({
    from: accountInfo.value.address,
    to: accountInfo.value.address,
    nonce: accountInfo.value.nonce,
    amount: rweb3.utils.toFons('100', 'rigo'),
    gas: 1000000,
    gasPrice: '250000000000',
});

// sign transaction
const { rawTransaction } = account.signTransaction(tx, 'testnet0');

// broadcast raw transaction
const result = await rweb3.rigo.broadcastRawTxCommit(rawTransaction);
```

### 위임 취소
`RIGO` 위임 취소 트랜잭션을 생성할 수 있습니다.
`buildUnDelegateTrxProto`의 필수 인자 값은 아래와 같습니다.
- from : 보내는 주소
- to : 위임 취소 주소
- nonce : 계정의 nonce
- amount : '0'
- gas : 가스 수량
- gasPrice : 가스 가격
- payload
  - txHash : 위임했던 트랜잭션 해시 값

아래의 코드는 `TrxProtoBuilder`의 `buildUnDelegateTrxProto` 를 사용하여 트랜잭션을 생성하고, `RIGO` 테스트 네트워크에 제출하는 예시입니다.

```typescript
import { RWeb3, TrxProtoBuilder, TrxProto, AccountResponse } from '@rigochain/rweb3';
import { RWeb3Account } from '@rigochain/rweb3-rigo-accounts';

// create rweb3 instance
const rweb3 = new RWeb3('https://rpc1.testnet.rigochain.io');

// import private key
const privateKey: string = 'your private key';
const account: RWeb3Account = privateKeyToAccount(privateKey);

// get accountInfo
const accountInfo: AccountResponse = await rweb3.rigo.getAccount(account.address);

// delegate transaction hash
const delegateHash = 'delegate hash';

// create transaction
const trxProto: TrxProto = TrxProtoBuilder.buildUnDelegateTrxProto({
    from: accountInfo.value.address,
    to: accountInfo.value.address,
    nonce: accountInfo.value.nonce,
    gas: 1000000,
    gasPrice: '250000000000',
    amount: '0',
    payload: {
        txhash: delegateHash
    },
});

// sign transaction
const { rawTransaction } = account.signTransaction(tx, 'testnet0');

// broadcast raw transaction
const result = await rweb3.rigo.broadcastRawTxCommit(rawTransaction);
```

### 제안
`RIGO` 제안 트랜잭션을 생성할 수 있습니다. 제안 트랜잭션은 validator 권한이 필수적입니다.
`buildProposalTrx`의 필수 인자 값은 아래와 같습니다.
- from : 보내는 주소
- to : '0000000000000000000000000000000000000000'
- nonce : 계정의 nonce
- amount : '0'
- gas : 가스 수량
- gasPrice : 가스 가격
- payload
  - message : 제안 메시지
  - startVotingHeight : 시작 블록 높이
  - votingBlocks : 투표 블록 높이
  - applyingHeight : 제안이 적용될 블록 높이
  - optType : 제안 타입
  - options : 제안 할 파라미터

아래의 코드는 `TrxProtoBuilder`의 `buildProposalTrx` 를 사용하여 트랜잭션을 생성하고, `RIGO` 테스트 네트워크에 제출하는 예시입니다.

```typescript
import { RWeb3, TrxProtoBuilder, TrxProto, AccountResponse } from '@rigochain/rweb3';
import { RWeb3Account } from '@rigochain/rweb3-rigo-accounts';
import Long from "long";

// create rweb3 instance
const rweb3 = new RWeb3('https://rpc1.testnet.rigochain.io');

// import private key
const privateKey: string = 'your private key';
const account: RWeb3Account = privateKeyToAccount(privateKey);

// get accountInfo
const accountInfo: AccountResponse = await rweb3.rigo.getAccount(account.address);

// proposal
const governanceParams = {
    param : 'value'
}
const selizalizedParams = serializeObject(governanceParams);

// create transaction
const trxProto: TrxProto = TrxProtoBuilder.buildUnDelegateTrxProto({
    from: accountInfo.value.address,
    to: '0000000000000000000000000000000000000000',
    nonce: accountInfo.value.nonce,
    gas: 1000000,
    gasPrice: '250000000000',
    amount: '0',
    payload: {
        message: 'your message',
        startVotingHeight: Long.fromValue(/* startVotingHeight */),
        votingBlocks: Long.fromValue(/* votingBlocks */),
        applyingHeight: Long.fromValue(/* applyingHeight */),
        optType: 257,
        options: selizalizedParams,
    },
});

// sign transaction
const { rawTransaction } = account.signTransaction(tx, 'testnet0');

// broadcast raw transaction
const result = await rweb3.rigo.broadcastRawTxCommit(rawTransaction);
```

### 투표
`RIGO` 투표 트랜잭션을 생성할 수 있습니다. 투표 트랜잭션은 validator 권한이 필수적입니다.
`buildVotingTrx`의 필수 인자 값은 아래와 같습니다.
- from : 보내는 주소
- to : '0000000000000000000000000000000000000000'
- nonce : 계정의 nonce
- amount : '0'
- gas : 가스 수량
- gasPrice : 가스 가격
- payload
    - txHash : 대상 투표 해시 값
    - choice : 찬성 및 반대

아래의 코드는 `TrxProtoBuilder`의 `buildVotingTrx` 를 사용하여 트랜잭션을 생성하고, `RIGO` 테스트 네트워크에 제출하는 예시입니다.

```typescript
import { RWeb3, TrxProtoBuilder, TrxProto, AccountResponse, BytesUint8Array } from '@rigochain/rweb3';
import { RWeb3Account } from '@rigochain/rweb3-rigo-accounts';

// create rweb3 instance
const rweb3 = new RWeb3('https://rpc1.testnet.rigochain.io');

// import private key
const privateKey: string = 'your private key';
const account: RWeb3Account = privateKeyToAccount(privateKey);

// get accountInfo
const accountInfo: AccountResponse = await rweb3.rigo.getAccount(account.address);

// voting hash
const votingHash = BytesUint8Array.fromHex('proposal transaction hash');

// create transaction
const trxProto: TrxProto = TrxProtoBuilder.buildVotingTrx({
    from: accountInfo.value.address,
    to: '0000000000000000000000000000000000000000',
    nonce: accountInfo.value.nonce,
    gas: 1000000,
    gasPrice: '250000000000',
    amount: '0',
    payload: {
        txhash: votingHash,
        choice: 0,
    },
});

// sign transaction
const { rawTransaction } = account.signTransaction(tx, 'testnet0');

// broadcast raw transaction
const result = await rweb3.rigo.broadcastRawTxCommit(rawTransaction);
```

### setDoc
`RIGO` setDoc 트랜잭션을 생성할 수 있습니다.
`buildSetDocTrx`의 필수 인자 값은 아래와 같습니다.
- from : 보내는 주소
- to : setDoc 대상 주소
- nonce : 계정의 nonce
- amount : '0'
- gas : 가스 수량
- gasPrice : 가스 가격
- payload
    - name: 이름,
    - url: URL

아래의 코드는 `TrxProtoBuilder`의 `buildSetDocTrx` 를 사용하여 트랜잭션을 생성하고, `RIGO` 테스트 네트워크에 제출하는 예시입니다.

```typescript
import { RWeb3, TrxProtoBuilder, TrxProto, AccountResponse } from '@rigochain/rweb3';
import { RWeb3Account } from '@rigochain/rweb3-rigo-accounts';

// create rweb3 instance
const rweb3 = new RWeb3('https://rpc1.testnet.rigochain.io');

// import private key
const privateKey: string = 'your private key';
const account: RWeb3Account = privateKeyToAccount(privateKey);

// get accountInfo
const accountInfo: AccountResponse = await rweb3.rigo.getAccount(account.address);

// create transaction
const trxProto: TrxProto = TrxProtoBuilder.buildSetDocTrx({
    from: accountInfo.value.address,
    to: accountInfo.value.address,
    nonce: accountInfo.value.nonce,
    gas: 1000000,
    gasPrice: '250000000000',
    amount: '0',
    payload: {
        name: "name",
        url: "URL",
    },
});

// sign transaction
const { rawTransaction } = account.signTransaction(tx, 'testnet0');

// broadcast raw transaction
const result = await rweb3.rigo.broadcastRawTxCommit(rawTransaction);
```


