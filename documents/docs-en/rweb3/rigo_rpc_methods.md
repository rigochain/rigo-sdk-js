# rweb3 rpc methods


## Overview
This documentation provides information on the functioning of various methods of the Rigo Chain software system. Each function requires a `requestManager` which is an instance of `RWeb3RequestManager`. 

The following sections list the functions available, along with the necessary parameters and expected return types.

## Function list

1. `health`: Checks the health of the RWeb3 application. Returns a `HealthResponse` Promise.
example:
```js
const healthResponse: HealthResponse = await rweb3.rigo.health();
```

response type:
```typescript
/**
 * Represents a health check response. A value of `null` typically indicates the node is healthy.
 */
export type HealthResponse = null;
```


2. `status`: Provides the status of the RWeb3 application. Returns a `StatusResponse` Promise.
example:
```js
const statusResponse: StatusResponse = await rweb3.rigo.status();
```

response type:
```typescript

/**
 * Represents a response containing status information of the node.
 */
export interface StatusResponse {
  /** Information about the node */
  readonly node_info: NodeInfo;
  /** Information about the node's sync status */
  readonly sync_info: SyncInfo;
  /** Information about the node's validator */
  readonly validator_info: Validator;
}
```


3. `netInfo`: Provides information about the network. Returns a `NetInfoResponse` Promise.
example:
```js
const netInfoResponse: NetInfoResponse = await rweb3.rigo.netInfo();
```

response type:
```typescript

/**
 * Provides information about the network state of a node.
 */
export interface NetInfoResponse {
  /** Indicates if the node is currently listening for connections */
  listening: boolean;
  /** List of addresses the node is listening on */
  listeners: [];
  /** Number of peers the node is currently connected to */
  n_peers: string;
  /** Detailed information about the peers the node is connected to */
  peers: [];
}
```


4. `blockchain`: Retrieves blockchain data. Accepts parameters `minHeight` and `maxHeight` for specifying the range of blocks to return. Returns a `BlockchainResponse` Promise.
example:
```js
const blockchainResponse: BlockchainResponse = await rweb3.rigo.blockchain(1, 10);
```

response type:
```typescript
/**
 * Represents a response with information about the blockchain.
 */
export interface BlockchainResponse {
  /** The height of the last block in the blockchain */
  readonly last_height: number;
  /** Metadata for blocks in the blockchain */
  readonly block_metas: readonly BlockMeta[];
}
```




5. `block`: Fetches a specific block. The `height` parameter specifies the block in the chain to return. Returns a `BlockResponse` Promise.
example:
```js
const blockResponse: BlockResponse = await rweb3.rigo.block(1);
```

response type:
```typescript
/**
 * Represents a response containing information about a block.
 */
export interface BlockResponse {
  /** The ID of the block */
  readonly block_id: BlockId;
  /** The actual block data */
  readonly block: Block;
}
```


6. `blockByHash`: Fetches block information by its hash. Accepts hash in either `string` or `Uint8Array` form.
example:
```js
const blockResponse: BlockResponse = await rweb3.rigo.blockByHash("hash");
```

response type:
```typescript
/**
 * Represents a response containing information about a block.
 */
export interface BlockResponse {
  /** The ID of the block */
  readonly block_id: BlockId;
  /** The actual block data */
  readonly block: Block;
}
```

7. `blockResults`: Provides block results for a specific block height. The `height` parameter specifies the block to return.
example:
```js
const blockResultsResponse: BlockResultsResponse = await rweb3.rigo.blockResults(height);
```

response type:
```typescript
/**
 * Represents a response containing results associated with a block.
 */
export interface BlockResultsResponse {
  /** The height of the block */
  readonly height: number;
  /** Results of the transactions in the block */
  readonly txs_results?: readonly TxData[];
  /** Events that occurred at the beginning of the block */
  readonly begin_block_events?: readonly Event[];
  /** Events that occurred at the end of the block */
  readonly end_block_events?: readonly Event[];
  /** Updates to the validator set */
  readonly validator_updates?: readonly ValidatorUpdate[];
  /** Potential updates to the consensus parameters */
  readonly consensus_params_updates?: ConsensusParams;
}
```

8. `commit`: Provides commit information for a specific block height.
example:
```js
const commitResponse: CommitResponse = await rweb3.rigo.commit(height);
```

response type:
```typescript

/**
 * Represents a response containing the signed header.
 */
export interface CommitResponse {
  /** The signed header data */
  readonly signed_header: SignedHeader;
  /** The validator set at the height of the signed header */
  readonly canonical: boolean;
}
```


9. `validators`: Returns validators' data for a specific block height.
example:
```js
const validatorsResponse: ValidatorsResponse = await rweb3.rigo.validators(height, page, perPage);
```

response type:
```typescript
/**
 * Represents a response containing validator details for a specific block height.
 */
export interface ValidatorsResponse {
  /** The height of the block for which validators are provided */
  readonly block_height: number;
  /** List of validators for the given block height */
  readonly validators: readonly Validator[];
  /** Number of validators listed in the response */
  readonly count: number;
  /** Total number of validators */
  readonly total: number;
}
```

10. `genesis`: Returns the genesis block of the blockchain.
example:
```js
const genesisResponse: GenesisResponse = await rweb3.rigo.genesis();
```

response type:
```typescript
/**
 * Represents a response containing genesis information.
 */
export interface GenesisResponse {
  /** The genesis time */
  readonly genesis_time: ReadonlyDate;
  /** The chain ID */
  readonly chain_id: string;
  /** The initial height */
  readonly initial_height: number;
  /** Consensus parameters at genesis */
  readonly consensus_params: ConsensusParams;
  /** List of validators at genesis */
  readonly validators: readonly Validator[];
  /** App hash at genesis */
  readonly app_hash: HexString;
  /** The state of the app at genesis */
  readonly app_state: Record<string, unknown> | undefined;
}
```


11. `genesisChunked`: Provides the genesis block in chunks.
example:
```js
const genesisChunkedResponse: GenesisChunkedResponse = await rweb3.rigo.genesisChunked(chunk);
```

response type:
```typescript
/**
 * Represents a response containing a chunk of the genesis data.
 */
export interface GenesisChunkedResponse {
  /** Current chunk of the genesis data */
  chunk: string;
  /** Total number of chunks for the genesis data */
  total: string;
  /** Actual data for the current chunk */
  data: string;
}
```

12. `dumpConsensusState`: Provides the current consensus state.
example:

```js
const dumpConsensusStateResponse: DumpConsensusStateResponse = await rweb3.rigo.dumpConsensusState();
```

response type:
```typescript
/**
 * Represents the current consensus state of a node.
 */
export interface DumpConsensusStateResponse {
  /** Detailed state information about the current round of consensus */
  round_state: RoundState;
  /** Detailed information about the peers the node is connected to in the context of consensus */
  peers: PeerInfo[];
}
```

13. `consensusState`: Fetches consensus state information.
example:
```js
const consensusStateResponse: ConsensusStateResponse = await rweb3.rigo.consensusState();
```

response type:
```typescript
/**
 * Represents the consensus state of a blockchain node.
 */
export interface ConsensusStateResponse {
  readonly round_state: ConsensusRoundState;
}
```


14. `consensusParams`: Retrieves the consensus parameters at a specific block height.
example:
```js
const consensusParamsResponse: ConsensusParamsResponse = await rweb3.rigo.consensusParams(height);
```

response type:
```typescript
export interface ConsensusParamsResponse {
  block_height: number;
  consensus_params: ConsensusParams;
}
```


15. `unconfirmedTxs`: Provides a list of unconfirmed transactions upto a specified limit.
example:
```js
const unconfirmedTxsResponse: UnconfirmedTxsResponse = await rweb3.rigo.unconfirmedTxs(limit);
```

response type:
```typescript
/**
 * Represents the unconfirmed transactions in the mempool of a node.
 */
export interface UnconfirmedTxsResponse {
  /** Number of unconfirmed transactions */
  n_txs: string;
  /** Total number of unconfirmed transactions */
  total: string;
  /** Total size (in bytes) of unconfirmed transactions */
  total_bytes: string;
  /** List of unconfirmed transactions */
  txs: [];
}
```

16. `txSearch`: Searches and returns transactions based on a specified query string.
example:
```js
const txSearchResponse: TxSearchResponse = await rweb3.rigo.txSearch(query, parent, page, perPage, orderBy);
```

response type:
```typescript
/**
 * Represents a response containing a list of transactions that match a search query.
 */
export interface TxSearchResponse {
  /** List of transactions that match the search criteria */
  readonly txs: readonly TxResponse[];
  /** Total number of transactions that match the search criteria */
  readonly total_count: number;
}
```



17. `tx`: Fetches a transaction based on its hash.
example:
```js
const txResponse: TxResponse = await rweb3.rigo.tx("hash");
```

response type:
```typescript
/**
 * Represents a response containing transaction details.
 */
export interface TxResponse {
  /** The transaction data */
  readonly tx: HexString;
  /** The hash of the transaction */
  readonly hash: HexString;
  /** The height of the block containing the transaction */
  readonly height: number;
  /** Index of the transaction within the block */
  readonly index: number;
  /** Result data associated with the transaction */
  readonly result: TxData;
  /** Proof of the transaction (if available) */
  readonly proof?: TxProof;
  /** Result of the transaction execution */
  readonly tx_result: TxData;
}
```


18. `abciInfo`: Provides information on the Application Blockchain Interface (ABCI).
example:
```js
const abciInfoResponse: AbciInfoResponse = await rweb3.rigo.abciInfo();
```

response type:
```typescript
/**
 * Represents a response containing general information about the ABCI application.
 */
export interface AbciInfoResponse {
  response: {
    version: string;
    app_version: string;
    last_block_height?: number;
    last_block_app_hash?: HexString;
  };
}
```



19. `abciQuery`: Makes an ABCI query.
example:
```js
const abciQueryResponse: AbciQueryResponse = await rweb3.rigo.abciQuery(path, data, height, prove);
```
```

response type:
```typescript
/**
 * Represents a response to an ABCI query.
 */
export interface AbciQueryResponse {
  readonly key: HexString;
  readonly value: HexString;
  readonly proof?: QueryProof;
  readonly height?: number;
  readonly index?: number;
  readonly code?: number;
  readonly codespace: string;
  readonly log?: string;
  readonly info: string;
}
```



20. `checkTx`: Checks a specified transaction.
example:
```js
const checkTxResponse: CheckTxResponse = await rweb3.rigo.checkTx("TrxProto");
```

response type:
```typescript
/**
 * Represents the response after checking a transaction.
 */
export interface CheckTxResponse {
  code: number;
  data?: string;
  log: string;
  info: string;
  gas_wanted: string;
  gas_used: string;
  events: [];
  codespace: string;
  mempoolError?: string;
}
```


21. `numUnconfirmedTxs`: Returns the number of unconfirmed transactions.
example:
```js
const numUnconfirmedTxsResponse: NumUnconfirmedTxsResponse = await rweb3.rigo.numUnconfirmedTxs();
```

response type
```typescript
/**
 * Represents a response containing information about unconfirmed transactions.
 */
export interface NumUnconfirmedTxsResponse {
  readonly n_txs: number;
  /** Total number of unconfirmed transactions */
  readonly total: number;
  /** Total size (in bytes) of all unconfirmed transactions */
  readonly total_bytes: number;
  readonly txs: TxData[];
}
```


22. `broadcastTxAsync`: Asynchronously broadcasts a transaction on the network.
example:
```js
const broadcastTxAsyncResponse: BroadcastTxAsyncResponse = await rweb3.rigo.broadcastTxAsync("TrxProto");
```

response type:
```typescript

/**
 * Represents a response after broadcasting a transaction asynchronously.
 */
export interface BroadcastTxAsyncResponse {
  /** The hash of the broadcasted transaction */
  readonly hash: HexString;
}

```


23. `broadcastTxSync`: Synchronously broadcasts a transaction on the network.
example:
```js
const broadcastTxSyncResponse: BroadcastTxSyncResponse = await rweb3.rigo.broadcastTxSync("TrxProto");
```

response type:
```typescript
/**
 * Represents a response after broadcasting a transaction synchronously.
 */
export interface BroadcastTxSyncResponse extends TxData {
  /** The hash of the broadcasted transaction */
  readonly hash: HexString;
}
```



24. `broadcastTxCommit`: Broadcasts a transaction and waits for the transaction to commit.
example:
```js
const broadcastTxCommitResponse: BroadcastTxCommitResponse = await rweb3.rigo.broadcastTxCommit("TrxProto");
```

response type:
```typescript
/**
 * Represents a response after broadcasting a transaction and waiting for it to commit.
 */
export interface BroadcastTxCommitResponse {
  /** The height of the block containing the transaction */
  readonly height: number;
  /** The hash of the broadcasted transaction */
  readonly hash: HexString;
  /** Result of the check transaction */
  readonly check_tx: TxData;
  /** Result of the delivery transaction */
  readonly deliver_tx?: TxData;
}
```



25. `delegatee`: Fetches the delegatee of an address.
example:
```js
const delegateeResponse: DelegateeResponse = await rweb3.rigo.delegatee("address");
```

response type:
```typescript
/**
 * Represents the response related to a delegatee.
 */
export interface DelegateeResponse {
  key: string;
  log?: string;
  code?: number;
  value?: DelegateeValue;
}
```


26. `rule`: Fetches a set of rules.
example:
```js
const ruleResponse: RuleResponse = await rweb3.rigo.rule();
```

response type:
```typescript
/**
 * Represents the governance rules in the blockchain.
 */
export interface RuleResponse {
  value: {
    version: number; // Protocol or data structure version
    maxValidatorCnt: number; // Maximum number of validators allowed
    minValidatorStake: string; // Minimum stake amount required for a validator
    rewardPerPower: string; // Reward given per unit of computational power for validators
    lazyRewardBlocks: number; // Number of blocks before the rewards are distributed (latency)
    lazyApplyingBlocks: number; // Number of blocks before changes are applied (latency)
    gasPrice: string; // Price of the transaction fee (gas price)
    minTrxFee: string; // Minimum transaction fee required
    minVotingPeriodBlocks: number; // Minimum number of blocks for a voting period
    maxVotingPeriodBlocks: number; // Maximum number of blocks for a voting period
    minSelfStakeRatio: number; // Minimum ratio of stake that a validator must self-bond
    maxUpdatableStakeRatio: number; // Maximum ratio by which the stake can be updated frequently
    slashRatio: number; // Ratio of tokens to be slashed when a validator engages in malicious behavior
  };
}
```


27. `account`: Fetches account details of an address.
example:
```js
const getAccountResponse: AccountResponse = await rweb3.rigo.account("address");
```

response type:
```typescript

/**
 * Represents the details of an account on the blockchain.
 */
export interface AccountResponse {
  key: HexString;
  value: {
    address: HexString;
    nonce: number;
    balance: string;
  };
}
```


28. `proposals`: Fetches proposals related to a transaction hash.
example:
```js
const proposalsResponse: ProposalsResponse = await rweb3.rigo.proposals("txHash");
```


29. `stakes`: Fetches the stake of an address.
example:
```js
const stakesResponse: StakesResponse = await rweb3.rigo.stakes("address");
```

response type:
```typescript
/**
 * Represents the stakes related response.
 */
export interface StakesResponse {
  key: string;
  value?: StakesValue[];
}
```

30. `vmCall`: Makes a call to the VM.
example:
```js
const vmCallResponse: VmCallResponse = await rweb3.rigo.vmCall("0x1234");
```

response type:
```typescript
/**
 * Represents the response after making a call to a virtual machine (VM).
 */
export interface VmCallResponse {
  value: {
    /** Data returned by the VM after the call */
    returnData: any;
  };
}
```


**Note:** The following methods are only use websocket connection.

31. `subscribe`: Subscribes to a specified event.

example:
```typescript
const rweb3 = new RWeb3("ws://localhost:26657");

const query = "tm.event='NewBlockHeader'";
const headers = rweb3.rigo.subscribe(query);

const events: SubscriptionEvent[] = [];

const subscription = headers.subscribe({
  error: done.fail,
  complete: () => done.fail('subscription should not complete'),
  next: (event: SubscriptionEvent) => {
    events.push(event);
    expect(event.query).toEqual(query);

    if (events.length === 2) {
      // make sure they are consecutive heights
      subscription.unsubscribe();
    }
  },
});
```
32. `subscribeNewBlock`: Subscribes to new block events.
33. `subscribeNewBlockHeader`: Subscribes to new block header events.
34. `subscribeTx`: Subscribes to new transaction events.

**Note:** Please refer to the actual code to understand thoroughly the various parameters inputs and outputs.