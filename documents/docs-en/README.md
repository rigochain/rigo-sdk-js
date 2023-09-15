## Overview

## Getting Started

```plantuml

import rweb3 from '@rigochain/rweb3';

let rweb3 = new RWeb3("https://rpc1.testnet.rigochain.io");
// let rweb3 = new RWeb3("wss://rpc1.testnet.rigochain.io") 

rweb3.rigo.netInfo().then(function(result) {
        console.log(result);
    });

setTimeout(async function() {
    let response = await rweb3.rigo.netInfo();
}, 1000);


```
Any application or service that utilizes blockchain is implemented by connecting to the blockchain network to request various information and receive/process responses.  
RIGO Node includes an HTTP/JSONRPC-based server system to provide these functions,
It can be utilized to develop various applications and services such as Wallet, Block Explorer, etc.  
However, directly calling the RPCs provided by the RIGO nodes can be very cumbersome in some cases.
This is the case when you want to submit a transaction to the blockchain network.    
To submit a transaction, you must first create the transaction, encode it in the appropriate way (Protobuf v3), and send it as a JSONRPC request,
This involves a process that must be matched correctly, deterministically and uniformly across all services/applications, including RIGO nodes.

In this way, the set of modules or functions that all applications and services need to implement in common, including communication with RIGO nodes, can be defined in a library available in the JavaScript environment.
The implementation of `rigo-sdk-js' is a library that can be used in the Javascript environment.

---

# Summary

* [rweb3](rweb3/README.md)
* [rweb3-core](rweb3-core/README.md)
* [rweb3-provider](rweb3-provider/README.md)
* [rweb3-rigo](rweb3-rigo/README.md)
* [rweb3-rigo-accounts](rweb3-rigo-accounts/README.md)
* [rweb3-rigo-abi](rweb3-rigo-abi/README.md)
* [rweb3-rigo-contracts](rweb3-rigo-contracts/README.md)
* [rweb3-utils](rweb3-utils/README.md)
* [rweb3-types](rweb3-types/README.md)

## Features


### Rpc Method List  ([rweb3-rigo](rweb3-rigo/README.md))

- **health**: Checks the operational health and readiness of the Rigo Chain, ensuring all components are functioning as expected.

- **status**: Retrieves a comprehensive status report of the Rigo Chain, including current operational metrics and state.

- **netInfo**: Provides detailed information about the network, including connected peers, IP addresses, and other relevant data.

- **blockchain**: Fetches a range of blockchain information based on specified minHeight and maxHeight parameters.

- **block**: Retrieves information about a specific block, given its height or identifier.

- **blockByHash**: Allows users to fetch detailed block information using a unique Block Hash.

- **blockResults**: Fetches the outcomes and results associated with transactions in a specific block.

- **commit**: Retrieves commit data (like signatures and validators) for a block at a specific height.

- **validators**: Lists the current validators based on specified criteria such as height, pagination, and filtering.

- **genesis**: Provides detailed data about the very first block in the chain – the genesis block.

- **genesisChunked**: Offers the genesis block's data in smaller, manageable chunks, useful for systems with data size constraints.

- **dumpConsensusState**: Provides a snapshot or dump of the current consensus state of the Rigo Chain.

- **consensusState**: Retrieves the current state of the consensus mechanism in use.

- **consensusParams**: Fetches the specific parameters governing consensus at a given height.

- **unconfirmedTxs**: Lists transactions that have been broadcast but not yet confirmed up to a specified limit.

- **txSearch**: Allows for advanced transaction querying based on specified criteria and arguments.

- **tx**: Fetches detailed information of a transaction using its unique hash.

- **contractAddrFromTx**: Determines and fetches the contract address associated with a specific transaction hash.

- **abciInfo**: Provides information about the Application BlockChain Interface (ABCI) in use.

- **abciQuery**: Allows users to execute specific queries using the ABCI.

- **checkTx**: Validates a transaction, ensuring its legitimacy and conformance to set rules before being broadcast.

- **numUnconfirmedTxs**: Retrieves the total count of transactions that are broadcast but still awaiting confirmation.

- **broadcastEvidence**: Allows for the broadcasting of evidence related to malicious activities or breaches in the network.

- **broadcastTxSync**: Immediately broadcasts a transaction to the network and waits for a response synchronously.

- **broadcastTxAsync**: Sends a transaction to the network for broadcasting without waiting for an immediate response.

- **broadcastTxCommit**: Broadcasts a transaction and waits for it to be committed to a block.

- **broadcastRawTxSync**: Immediately broadcasts a raw (non-standard format) transaction synchronously.

- **broadcastRawTxAsync**: Sends a raw transaction for asynchronous broadcasting.

- **broadcastRawTxCommit**: Broadcasts a raw transaction and awaits its commitment to a block.

- **delegatee**: Retrieves information about a specific delegatee in the network.

- **rule**: Fetches the rules or governing principles set within the chain.

- **getAccount**: Provides detailed data about a specific account, including its balance, transactions, and other associated data.

- **proposals**: Lists the current and past proposals raised within the network.

- **stakes**: Fetches information about staked amounts, including validator stakes and rewards.

- **vmCall**: Executes a call to a virtual machine, allowing for operations like smart contract execution.

- **subscribe**: Allows users to subscribe to specific events or data changes based on a query. This method is exclusive to those using a websocket provider.

- **subscribeNewBlock**: Offers real-time updates and subscriptions to newly mined or forged blocks. Exclusive for websocket provider users.

- **subscribeNewBlockHeader**: Provides subscribers with instant updates on new block headers. Useful for light clients and those using websocket providers.

- **subscribeTx**: Allows users to get real-time updates on specific transactions or all network transactions. Exclusive for websocket provider users.


### Node Provider ([rweb3-provider](rweb3-provider/README.md))

`rweb3-provider` is a module for establishing and managing connections to Rigo nodes, inspired by `web3.js`'s provider functionality.


### Account management ([rweb3-rigo-accounts](rweb3-rigo-accounts/README.md))

`rweb3-rigo-accounts` is a module dedicated to handling Rigo account operations, such as creating, managing, and signing transactions, in the rweb3 ecosystem.


### Virtual Machin ABI management ([rweb3-rigo-abi](rweb3-rigo-abi/README.md))

`rweb3-rigo-abi` is a module focused on managing the Application Binary Interface (ABI) for Ethereum's Virtual Machine, streamlining interactions with smart contracts within the rweb3 ecosystem.

### Contract management ([rweb3-rigo-contracts](rweb3-rigo-contracts/README.md))

`rweb3-rigo-contracts` is a module designed for facilitating interactions with Ethereum smart contracts, enabling easy deployment, invocation, and management of contracts within the rweb3 ecosystem.


### Utils ([rweb3-utils](rweb3-utils/README.md))

`rweb3-utils` is a utility module within the rweb3 ecosystem, offering a collection of helper functions and tools to streamline Rigo-related operations and developments.


### Types ([rweb3-types](rweb3-types/README.md))

`rweb3-types` is a module in the rweb3 ecosystem that defines and manages the data structures and types used across the Rigo development processes, ensuring consistency and compatibility.


