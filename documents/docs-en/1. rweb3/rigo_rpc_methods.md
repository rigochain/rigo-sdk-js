# rweb3 rpc methods


## Overview
This documentation provides information on the functioning of various methods of the Rigo Chain software system. Each function requires a `requestManager` which is an instance of `RWeb3RequestManager`. 

The following sections list the functions available, along with the necessary parameters and expected return types.

## Function list

1. `health`: Checks the health of the RWeb3 application. Returns a `HealthResponse` Promise.
2. `status`: Provides the status of the RWeb3 application. Returns a `StatusResponse` Promise.
3. `netInfo`: Provides infomation about the network. Returns a `NetInfoResponse` Promise.
4. `blockchain`: Retrieves blockchain data. Accepts parameters `minHeight` and `maxHeight` for specifying the range of blocks to return. Returns a `BlockchainResponse` Promise.
5. `block`: Fetches a specific block. The `height` parameter specifies the block in the chain to return. Returns a `BlockResponse` Promise.
6. `blockByHash`: Fetches block information by its hash. Accepts hash in either `string` or `Uint8Array` form.
7. `blockResults`: Provides block results for a specific block height. The `height` parameter specifies the block to return.
8. `commit`: Provides commit information for a specific block height.
9. `validators`: Returns validators' data for a specific block height.
10. `genesis`: Returns the genesis block of the blockchain.
11. `genesisChunked`: Provides the genesis block in chunks.
12. `dumpConsensusState`: Provides the current consensus state.
13. `consensusState`: Fetches consensus state information.
14. `consensusParams`: Retrieves the consensus parameters at a specific block height.
15. `unconfirmedTxs`: Provides a list of unconfirmed transactions upto a specified limit.
16. `txSearch`: Searches and returns transactions based on a specified query string.
17. `tx`: Fetches a transaction based on its hash.
18. `abciInfo`: Provides information on the Application Blockchain Interface (ABCI).
19. `abciQuery`: Makes an ABCI query.
20. `checkTx`: Checks a specified transaction.
21. `numUnconfirmedTxs`: Returns the number of unconfirmed transactions.
22. `broadcastEvidence`: Broadcasts specified evidence on the network.
23. `broadcastTxAsync`: Asynchronously broadcasts a transaction on the network.
24. `broadcastTxSync`: Synchronously broadcasts a transaction on the network.
25. `broadcastTxCommit`: Broadcasts a transaction and waits for the transaction to commit.
26. `broadcastRawTxAsync`: Asynchronously broadcasts a raw transaction on the network.
27. `broadcastRawTxSync`: Synchronously broadcasts a raw transaction on the network.
28. `broadcastRawTxCommit`: Broadcasts a raw transaction and waits for it to commit.
29. `delegatee`: Fetches the delegatee of an address.
30. `rule`: Fetches a set of rules.
31. `getAccount`: Fetches account details of an address.
32. `proposals`: Fetches proposals related to a transaction hash.
33. `stakes`: Fetches the stake of an address.
34. `vmCall`: Makes a call to the VM.
35. `blockSearch`: Searches block information based on a specified query.
36. `subscribe`: Subscribes to a specified event.
37. `subscribeNewBlock`: Subscribes to new block events.
38. `subscribeNewBlockHeader`: Subscribes to new block header events.
39. `subscribeTx`: Subscribes to new transaction events.

**Note:** Please refer to the actual code to understand thoroughly the various parameters inputs and outputs.