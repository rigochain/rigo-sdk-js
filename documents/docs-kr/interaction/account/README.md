# rweb3-rigo-accounts

## 개요
이 모듈은 RWeb3 라이브러리를 사용하여 Rigo Chain 계정을 처리하고 트랜잭션에 서명하는 유틸리티를 제공합니다.

## 시작하기

### `create()`
`create` 함수는 임의의 RIGO 계정을 생성합니다. 생성이 완료되면 `RWeb3Account` 객체를 반환합니다.
```typescript
import { RWeb3 } from '@rigochain/rweb3';
import { RWeb3Account } from '@rigochain/rweb3-rigo-accounts';

// create address
const account: RWeb3Account = rweb3.rigo.accounts.create();
```
### `privateKeyToAccount(privateKey)`
`privateKeyToAccount` 함수는 입력된 `private key` 로부터 `RWeb3Account` 객체를 반환합니다.
```typescript
import { RWeb3 } from '@rigochain/rweb3';
import { RWeb3Account } from '@rigochain/rweb3-rigo-accounts';

// import private key
const privateKey: string = 'your private key';
const account: RWeb3Account = privateKeyToAccount(privateKey);
```
반환된 `RWeb3Account` 객체는 아래와 같습니다.
```shell
{
    address: string,
    privateKey: string,
    prvKey: PrvKey,
    pubKey: PubKey,
    sign: [Function: sign],
    signTransaction: [Function: signTransaction]
}
```

### `signTransaction(trxProto, chainId)`
`signTransaction` 함수는 트랜잭션에 서명합니다. 서명하기 위해서는 트랜잭션을 제출할 RIGO 블록체인의 `CHAIN ID`가 필요합니다.
`signTransaction`의 필수 인자 값은 아래와 같습니다.
- TrxProto : `RIGO` 네트워크에 제출하기 위한 트랜잭션 형태
- ChainId : `RIGO` 네트워크의 Chain ID

아래는 `RWeb3Account` 객체를 활용해서 테스트넷 `RIGO` 전송을 구현한 `signTransaction` 예시입니다.
```typescript
import { RWeb3, TrxProtoBuilder, TrxProto } from '@rigochain/rweb3';
import { RWeb3Account } from '@rigochain/rweb3-rigo-accounts';

// create rweb3 instance
const rweb3 = new RWeb3('https://rpc1.testnet.rigochain.io');

// import private key
const privateKey: string = 'your private key';
const account: RWeb3Account = privateKeyToAccount(privateKey);

// get accountInfo
const accountInfo = await rweb3.rigo.getAccount(account.address);

// create transaction
const trxProto: TrxProto = TrxProtoBuilder.buildTransferTrxProto({
    from: account.value.address,
    nonce: account.value.nonce,
    to: 'address',
    amount: '100',
    gas: 1000000,
    gasPrice: '250000000000',
});

// sign transaction
const { rawTransaction } = account.signTransaction(tx, 'testnet0');

// broadcast raw transaction
const result = await rweb3.rigo.broadcastRawTxCommit(rawTransaction);
console.log(result);
```
코드의 결과 값은 아래와 같습니다.
```shell
{
  height: 280652,
  hash: '96289E5CA50E28AAB181E9D2E13367B82C06DAF9F34DB013EE2A1F4AAA77CFB2',
  check_tx: {
    code: 0,
    codespace: '',
    log: '',
    data: null,
    events: [],
    gas_wanted: '1000000',
    gas_used: '1000000'
  },
  deliver_tx: {
    code: 0,
    codespace: '',
    log: '',
    data: null,
    events: [ [Object] ],
    gas_wanted: '1000000',
    gas_used: '1000000'
  }
}
```
