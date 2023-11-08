# rweb3-rigo-accounts

## Overview

This module provides utilities to handle Rigo Chain accounts and sign transactions using the RWeb3 library. It exports several functions to convert between different representations of keys and to sign messages and transactions.


## Usage

### `create()`

```agsl
import { create, RWeb3Account } from '@rigochain/rweb3-rigo-accounts';

// create random account 
const account: RWeb3Account = create();

```

This function creates a new RWeb3 account. This involves generating a new private key and corresponding public key and address.

Returns an `RWeb3Account` object.

### `privateKeyToAccount(privateKey)`

```agsl
import { create, privateKeyToAccount, RWeb3Account } from '@rigochain/rweb3-rigo-accounts';

const account: RWeb3Account = privateKeyToAccount(account.privateKey);
```

This function takes a private key (either a hex string or an `ArrayBufferLike` object) and returns a complete `RWeb3Account` object with the corresponding public key and address.

### `privateKeyToPrvKey(privateKey)`

```agsl
import { create, privateKeyToAccount, RWeb3Account } from '@rigochain/rweb3-rigo-accounts';

const prvKey: PrvKey = privateKeyToPrvKey(account.privateKey);
```

This function takes a private key and returns it in the `PrvKey` format. Accepts either a hex string or an `ArrayBufferLike` object.


### `prvKeyToAccount(prvKey)`

```agsl
import { RWeb3Account, privateKeyToPrvKey, prvKeyToAccount, PrvKey } from '@rigochain/rweb3-rigo-accounts';

const prvKey: PrvKey = privateKeyToPrvKey(account.privateKey);
const account: RWeb3Account = prvKeyToAccount(prvKey);

```
This utility function converts a `PrvKey` object to a complete `RWeb3Account` object with a public key and address, among other properties.


### `signTransaction(trxProto, privateKey, chainId)`

```agsl

import {
  signTransaction,
  TrxProtoBuilder,
} from "@rigochain/rweb3-rigo-accounts";

// build a tx.
const tx = TrxProtoBuilder.buildTransferTrxProto({
  from: "from",
  nonce: 1,
  to: "6fff13a50450039c943c9987fa43cef0d7421904",
  amount: "1000000000000000",
  gas: 100000,
  gasPrice: "10000000000",
});

// sign the tx.
const { rawTransaction, transactionHash } = signTransaction(tx, "private key hex string", "chain id");

```
This function signs a transaction. The transaction is initially a `TrxProto` object, and the private key is either a hex string or an `ArrayBufferLike`.

It returns a `SignTransactionResult`, which contains the raw, base64-encoded transaction as well as the transaction hash. Note that this function is async to be compatible with the rest of the API, but it does not actually perform any asynchronous operations.xw