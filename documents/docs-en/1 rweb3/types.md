# rweb3 types

## Overview

The `RWeb3RigoInterface` extends the base `Rigo` interface and extends it with a `Contract` class and an `abi` object interface, including utility methods for encoding and decoding parameters and logs.

## Module Imports

- `Rigo` from '@rigochain/rweb3-rigo'
- `Contract` from '@rigochain/rweb3-rigo-contract'
- Utility functions (for encoding and decoding) from '@rigochain/rweb3-rigo-abi'
- `RWeb3Account` and `SignTransactionResult` from '@rigochain/rweb3-rigo-accounts'
- `HexString` and `TrxProto` from '@rigochain/rweb3-types'

## Interface Definition

### RWeb3RigoInterface

This interface extends the `Rigo` base interface from the `rweb3-rigo` module.

**Contract**
- Type: `Contract`

**ABI**
- `encodeEventSignature`: function reference from `rweb3-rigo-abi` module
- `encodeFunctionCall`: function reference from `rweb3-rigo-abi` module
- `encodeFunctionSignature`: function reference from `rweb3-rigo-abi` module
- `encodeParameter`: function reference from `rweb3-rigo-abi` module
- `encodeParameters`: function reference from `rweb3-rigo-abi` module
- `decodeParameter`: function reference from `rweb3-rigo-abi` module
- `decodeParameters`: function reference from `rweb3-rigo-abi` module
- `decodeLog`: function reference from `rweb3-rigo-abi` module

**Accounts**
- `create`: function to create a `RWeb3Account`
- `privateKeyToAccount`: function to convert a private key (Uint8Array or string) to `RWeb3Account`
- `signTransaction`: function to sign transaction using a transaction prototype (`TrxProto`) and a private key (`HexString`). Returns `SignTransactionResult`.

## Notes
This documentation is for the RWeb3RigoInterface as part of RigoChain's `rweb3` range of services, which provides a modular, flexible, and extensible blockchain-based development framework. It allows you to interact with RigoChain's blockchain-based services using a clean, readable, and easy-to-understand interface.