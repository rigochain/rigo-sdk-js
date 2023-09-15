# 4. rweb3-rigo


## Description
The RWeb3Rigo class extends from the RWeb3Context. It is the main class that interacts with the Rigo Chain, and provides various methods for different functionalities, like checking the health of the chain, getting info about blocks, transactions etc.

## Methods
Below is a list of methods provided by the RWeb3Rigo class:


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
