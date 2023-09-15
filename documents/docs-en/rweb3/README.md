# rweb3


## Usage

RWeb3 is the primary class to be imported and it extends `RWeb3Context`.

```js
import { RWeb3 } from '@rigochain/rweb3'

const rweb3 = new RWeb3('url of rigo provider');

// example usage (testnet)
// let rweb3 = new RWeb3("https://rpc1.testnet.rigochain.io");
// let rweb3 = new RWeb3("wss://rpc1.testnet.rigochain.io") 


// accounts
let rweb3Account = rweb3.rigo.accounts.create();


// rpc methods
const blockResponse: BlockResponse = await rweb3.rigo.block();


// contracts
const contract = new rweb3.rigo.Contract(abi, address);
const contractMethod = contract.methods.methodName();


```

RWeb3 is initialized with a provider url, without which a warning is logged in the console saying - "NOTE: rweb3.js is running without provider. You need to pass a provider in order to interact with the network!".

# Summary

* [rigo_rpc_methods](./rigo_rpc_methods.md)
* [trx_pb.md](./trx_pb.md)
* [types.md](./types.md)
* [accounts.md](./accounts.md)

### Properties

- `version` It is the version of the current package
- `modules` It contains the various modules that RWeb3 provides, currently, it includes `RWeb3Rigo`
- `rigo` It's an instance of `RWeb3RigoInterface`

### RWeb3RigoInterface

The `rigo` property in the `RWeb3` class exposes following properties - `accounts`, `Contract` and `abi`.

- `accounts` It initializes accounts for context.
- `Contract` It is a constructor to initiate contract context.
- `abi` It provides the application binary interface for the smart contracts.

This workaround has been used to circumvent the aforementioned ESLint rule.


## Table of Contents

1. [Package Exports](#Package-Exports)
2. [Named Exports](#Named-Exports)
3. [Namespace Exports](#Namespace-Exports)
4. [Direct Imports](#Direct-Imports)


## Named Exports

For all objects which are the default-exported-object in their current packages, they are exported with the same name as they have in their packages.

```javascript
export { RWeb3 };
export { Contract } from '@rigochain/rweb3-rigo-contract';
```

## Namespace Exports

All packages are also exported, grouped by namespaces.

```javascript
export * as core from '@rigochain/rweb3-core';
export * as errors from '@rigochain/rweb3-errors';
export * as rigo from './rigo.exports.js';
export { HttpProvider } from '@rigochain/rweb3-providers-http';
export { WebsocketProvider } from '@rigochain/rweb3-providers-ws';
export * as providers from './providers.exports.js';
export * as rpcMethods from '@rigochain/rweb3-rpc-methods';
export { RWeb3Validator } from '@rigochain/rweb3-validator';
export * as utils from '@rigochain/rweb3-utils';
export * as validator from '@rigochain/rweb3-validator';
```

## Direct Imports

The `rweb3-types` and `rweb3-errors` from `@rigochain` are exported without a namespace to enable the user to write `function something(): RWeb3Api;` without the need for `types.RWeb3Api`.

```javascript
export * from '@rigochain/rweb3-errors';
export * from '@rigochain/rweb3-types';