# rweb3 transaction

## Summary
This document explains how to create and submit transactions in the RIGO blockchain using the `@rigochain/rweb3` library, with examples.

## Transaction
To create a transaction for submission to the RIGO blockchain, the `@rigochain/rweb3` library provides functions in the `TrxProtoBuilder` for building transactions specific to their types.

### Transfer
You can create a transaction for transferring assets between `RIGO` accounts. The required arguments for `buildTransferTrxProto are as follows:
- from : Sending address
- to : Receiving address
- nonce : Nonce of the account
- amount : mount of RIGO to transfer
- gas : Gas amount
- gasPrice : Gas price


The following code is an example that uses `TrxProtoBuilder` to create a transaction and submit it to the RIGO test network.

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

### Delegation
You can create a transaction for delegating assets between `RIGO` accounts. The required arguments for `buildDelegateTrxProto are as follows:
- from : Sending address
- to : Receiving address
- nonce : Nonce of the account
- amount : mount of RIGO to transfer
- gas : Gas amount
- gasPrice : Gas price

The following code is an example that uses `TrxProtoBuilder` to create a delegation transaction and submit it to the RIGO test network.

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

### Unbonding Delegation
You can create an unbonding delegation transaction in the RIGO blockchain. The required arguments for `buildUnDelegateTrxProto` are as follows:
- from : Sending address
- to : Address for unbonding delegation
- nonce : Nonce of the account
- amount : '0'
- gas : Gas amount
- gasPrice : Gas price
- payload
  - txHash : Transaction hash of the delegation

The following code is an example that uses `TrxProtoBuilder` to create an unbonding delegation transaction and submit it to the RIGO test network.

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

### proposal
You can create a proposal transaction in the `RIGO` blockchain. A proposal transaction requires validator authority.
The required arguments for `buildProposalTrx` are as follows:
- from : Sending address
- to : '0000000000000000000000000000000000000000'
- nonce : Nonce of the account
- amount : '0'
- gas : Gas amount
- gasPrice : Gas price
- payload
  - message : Proposal message
  - startVotingHeight : Start block height
  - votingBlocks : Voting block height
  - applyingHeight : Block height at which the proposal will be applied
  - optType : Proposal type
  - options : Parameters to propose

The following code is an example that uses TrxProtoBuilder to create a proposal transaction and submit it to the RIGO test network.

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

### voting
You can create a voting transaction in the RIGO blockchain. A voting transaction requires validator authority.
The required arguments for `buildVotingTrx are as follows:
- from : Sending address
- to : '0000000000000000000000000000000000000000'
- nonce : Nonce of the account
- amount : '0'
- gas : Gas amount
- gasPrice : Gas price
- payload
    - txHash : Target voting hash
    - choice : Support or oppose

The following code is an example that uses `TrxProtoBuilder` to create a voting transaction and submit it to the RIGO test network.
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
You can create a setDoc transaction in RIGO. The required arguments for `buildSetDocTrx are as follows:
- from : Sending address
- to : Address where the setDoc will be set
- nonce : Nonce of the account
- amount : '0'
- gas : Gas amount
- gasPrice : Gas price
- payload
    - name: Name,
    - url: URL

The following code is an example that uses `TrxProtoBuilder` to create a setDoc transaction and submit it to the RIGO test network.
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

## Result
When a submission to the RIGO network is successful, the following result is returned.
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
