# rweb3-rigo-accounts

## Summary
This module provides utilities for handling Rigo Chain accounts and signing transactions using the RWeb3 library.

## Getting Started

### `create()`
The `create` function generates a random RIGO account. Upon completion, it returns an `RWeb3Account` object.
```typescript
import { RWeb3 } from '@rigochain/rweb3';
import { RWeb3Account } from '@rigochain/rweb3-rigo-accounts';

// create address
const account: RWeb3Account = rweb3.rigo.accounts.create();
```
### `privateKeyToAccount(privateKey)`
The `privateKeyToAccount` function returns an `RWeb3Account` object from the provided private key.
```typescript
import { RWeb3 } from '@rigochain/rweb3';
import { RWeb3Account } from '@rigochain/rweb3-rigo-accounts';

// import private key
const privateKey: string = 'your private key';
const account: RWeb3Account = privateKeyToAccount(privateKey);
```
The returned `RWeb3Account` object is as follows.
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
The `signTransaction` function signs a transaction. To sign a transaction, you need the `CHAIN ID` of the RIGO blockchain where you intend to submit the transaction. The required arguments for `signTransaction` are as follows:
- TrxProto : The transaction format for submission to the RIGO network.
- ChainId : The Chain ID of the RIGO network.

Here's an example of implementing a testnet RIGO transfer using the `signTransaction` with the help of the `RWeb3Account` object.
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
The result of the code is as follows.
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
