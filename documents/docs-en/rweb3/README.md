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

### Properties

- `version` It is the version of the current package
- `rigo` It's an instance of `RWeb3RigoInterface`

- `utils` It's an instance of `@rigochain/rweb3-utils`  [utils.md](../rweb3-utils/README.md)

### RWeb3RigoInterface

The `rigo` property in the `RWeb3` class exposes following properties - `accounts`, `Contract` and `abi`.

- `accounts` It initializes accounts for context.
- `Contract` It is a constructor to initiate contract context.
- `abi` It provides the application binary interface for the smart contracts.
