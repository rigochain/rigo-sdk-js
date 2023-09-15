# Rigo Chain rweb3-rigo-accounts Documentation

## Getting Started
```agsl
import { create, privateKeyToAccount, RWeb3Account } from '@rigochain/rweb3-rigo-accounts';


const account: RWeb3Account = create();

const account2: RWeb3Account = privateKeyToAccount(account.privateKey);



```

## Overview

This module provides utilities to handle Rigo Chain accounts and sign transactions using the RWeb3 library. It exports several functions to convert between different representations of keys and to sign messages and transactions.


# Summary

* [trx_pb_builder.md](./trx_pb_builder.md)
* [trx_pb.md](./trx_pb.md)
* [tx_types.md](./tx_types.md)
* [types.md](./types.md)

## Usage

### `create()`

This function creates a new RWeb3 account. This involves generating a new private key and corresponding public key and address.

Returns an `RWeb3Account` object.

### `privateKeyToAccount(privateKey)`

This function takes a private key (either a hex string or an `ArrayBufferLike` object) and returns a complete `RWeb3Account` object with the corresponding public key and address.

### `privateKeyToPrvKey(privateKey)`

This function takes a private key and returns it in the `PrvKey` format. Accepts either a hex string or an `ArrayBufferLike` object.

### `prvKeyToAccount(prvKey)`

This utility function converts a `PrvKey` object to a complete `RWeb3Account` object with a public key and address, among other properties.

### `sign(msg, privateKey)`

This function signs a message using a private key. It supports both hex string and `ArrayBufferLike` types for the private key.

### `signTransaction(trxProto, privateKey)`

This function signs a transaction. The transaction is initially a `TrxProto` object, and the private key is either a hex string or an `ArrayBufferLike`.

It returns a `SignTransactionResult`, which contains the raw, base64-encoded transaction as well as the transaction hash. Note that this function is async to be compatible with the rest of the API, but it does not actually perform any asynchronous operations.xw