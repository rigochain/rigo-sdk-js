# rweb3 rpc methods

## 개요
이 문서는 Rigo Chain 소프트웨어 시스템의 다양한 메소드의 동작에 대한 정보를 제공합니다. 각 기능은 `RWeb3RequestManager` 인스턴스인 `requestManager`가 필요합니다.
다음 섹션에서는 사용 가능한 함수, 필요한 매개변수 및 예상 반환 유형을 나열합니다.

## 기능 리스트

1. `health`: RWeb3 애플리케이션의 건강 상태를 확인합니다. `HealthResponse` Promise를 반환합니다.
예시:
```js
const healthResponse: HealthResponse = await rweb3.rigo.health();
```

응답 유형:
```typescript
/**
 * 건강 상태 확인 응답을 나타냅니다. `null`의 값은 일반적으로 노드가 건강하다는 것을 나타냅니다.
 */
export type HealthResponse = null;
```


2. `status`: RWeb3 애플리케이션의 상태를 제공합니다. `StatusResponse` Promise를 반환합니다.
예시:
```js
const statusResponse: StatusResponse = await rweb3.rigo.status();
```

응답 유형:
```typescript

/**
 * 노드의 상태 정보를 포함하는 응답을 나타냅니다.
 */
export interface StatusResponse {
  /** 노드에 대한 정보 */
  readonly node_info: NodeInfo;
  /** 노드의 동기화 상태에 대한 정보 */
  readonly sync_info: SyncInfo;
  /** 노드의 검증자에 대한 정보 */
  readonly validator_info: Validator;
}
```


3. `netInfo`: 네트워크에 대한 정보를 제공합니다. `NetInfoResponse` Promise를 반환합니다.
예시:
```js
const netInfoResponse: NetInfoResponse = await rweb3.rigo.netInfo();
```

응답 유형:
```typescript

/**
 * 노드의 네트워크 상태에 대한 정보를 제공합니다.
 */
export interface NetInfoResponse {
  /** 노드가 현재 연결을 수신하고 있는지를 나타냅니다 */
  listening: boolean;
  /** 노드가 수신하고 있는 주소 목록 */
  listeners: [];
  /** 노드가 현재 연결되어 있는 피어의 수 */
  n_peers: string;
  /** 노드가 연결된 피어에 대한 자세한 정보 */
  peers: [];
}
```


4. `blockchain`: 블록체인 데이터를 가져옵니다. 반환할 블록의 범위를 지정하는 데 `minHeight` 및 `maxHeight` 매개변수를 허용합니다. `BlockchainResponse` Promise를 반환합니다.
예시:
```js
const blockchainResponse: BlockchainResponse = await rweb3.rigo.blockchain(1, 10);
```

응답 유형:
```typescript
/**
 * 블록체인 정보에 대한 응답을 나타냅니다.
 */
export interface BlockchainResponse {
  /** 블록체인의 마지막 블록 높이 */
  readonly last_height: number;
  /** 블록체인의 블록의 메타데이터 */
  readonly block_metas: readonly BlockMeta[];
}
```




5. `block`: 특정 블록을 가져옵니다. `height` 매개변수는 체인에서 반환할 블록을 지정합니다. `BlockResponse` Promise를 반환합니다.
예시:
```js
const blockResponse: BlockResponse = await rweb3.rigo.block(1);
```

응답 유형:
```typescript
/**
 * 블록 정보가 포함된 응답을 나타냅니다.
 */
export interface BlockResponse {
  /** 블록의 ID */
  readonly block_id: BlockId;
  /** 실제 블록 데이터 */
  readonly block: Block;
}
```


6. `blockByHash`: 해시별 블록 정보를 가져옵니다. `string` 또는 `Uint8Array` 형식으로 해시를 허용합니다.
예시:
```js
const blockResponse: BlockResponse = await rweb3.rigo.blockByHash("hash");
```

응답 유형:
```typescript
/**
 * 블록 정보가 포함된 응답을 나타냅니다.
 */
export interface BlockResponse {
  /** 블록의 ID */
  readonly block_id: BlockId;
  /** 실제 블록 데이터 */
  readonly block: Block;
}
```

7. `blockResults`: 특정 블록 높이에 대한 블록 결과를 제공합니다. `height` 매개변수는 반환할 블록을 지정합니다.
예시:
```js
const blockResultsResponse: BlockResultsResponse = await rweb3.rigo.blockResults(height);
```

응답 유형:
```typescript
/**
 * 블록과 연관된 결과를 포함하는 응답을 나타냅니다.
 */
export interface BlockResultsResponse {
  /** 블록의 높이 */
  readonly height: number;
  /** 블록에서의 트랜잭션의 결과 */
  readonly txs_results?: readonly TxData[];
  /** 블록 시작 시 발생한 이벤트 */
  readonly begin_block_events?: readonly Event[];
  /** 블록 종료 시 발생한 이벤트 */
  readonly end_block_events?: readonly Event[];
  /** 검증자 세트의 업데이트 */
  readonly validator_updates?: readonly ValidatorUpdate[];
  /** 합의 매개변수의 가능한 업데이트 */
  readonly consensus_params_updates?: ConsensusParams;
}
```

8. `commit`: 특정 블록 높이에 대한 커밋 정보를 제공합니다.
예시:
```js
const commitResponse: CommitResponse = await rweb3.rigo.commit(height);
```

응답 유형:
```typescript

/**
 * 서명된 헤더를 포함하는 응답을 나타냅니다.
 */
export interface CommitResponse {
  /** 서명된 헤더 데이터 */
  readonly signed_header: SignedHeader;
  /** 서명된 헤더의 높이에 따른 검증자 세트 */
  readonly canonical: boolean;
}
```


9. `validators`: 특정 블록 높이에 대한 검증자 데이터를 반환합니다.
예시:
```js
const validatorsResponse: ValidatorsResponse = await rweb3.rigo.validators(height, page, perPage);
```

응답 유형:
```typescript
/**
 * 특정 블록 높이에 대한 검증자의 세부 정보가 포함된 응답을 나타냅니다.
 */
export interface ValidatorsResponse {
  /** 검증자가 제공되는 블록의 높이 */
  readonly block_height: number;
  /** 주어진 블록 높이에 대한 검증자 목록 */
  readonly validators: readonly Validator[];
  /** 응답에 나열된 검증자 수 */
  readonly count: number;
  /** 검증자의 총 수 */
  readonly total: number;
}
```

10. `genesis`: 블록체인의 제네시스 블록을 반환합니다.
예시:
```js
const genesisResponse: GenesisResponse = await rweb3.rigo.genesis();
```

응답 유형:
```typescript
/**
 * 제네시스 정보가 포함된 응답을 나타냅니다.
 */
export interface GenesisResponse {
  /** 제네시스 시간 */
  readonly genesis_time: ReadonlyDate;
  /** 체인 ID */
  readonly chain_id: string;
  /** 초기 높이 */
  readonly initial_height: number;
  /** 제네시스에서의 합의 매개변수 */
  readonly consensus_params: ConsensusParams;
  /** 제네시스에서의 검증자 목록 */
  readonly validators: readonly Validator[];
  /** 제네시스에서의 앱 해시 */
  readonly app_hash: HexString;
  /** 제네시스에서의 앱 상태 */
  readonly app_state: Record<string, unknown> | undefined;
}
```


11. `genesisChunked`: 제네시스 블록을 청크로 제공합니다.
예시:
```js
const genesisChunkedResponse: GenesisChunkedResponse = await rweb3.rigo.genesisChunked(chunk);
```

응답 유형:
```typescript
/**
 * 제네시스 데이터 청크를 포함한 응답을 나타냅니다.
 */
export interface GenesisChunkedResponse {
  /** 제네시스 데이터의 현재 청크 */
  chunk: string;
  /** 제네시스 데이터에 대한 청크의 총 수 */
  total: string;
  /** 현재 청크에 대한 실제 데이터 */
  data: string;
}
```

12. `dumpConsensusState`: 현재 합의 상태를 제공합니다.
예시:

```js
const dumpConsensusStateResponse: DumpConsensusStateResponse = await rweb3.rigo.dumpConsensusState();
```

응답 유형:
```typescript
/**
 * 노드의 현재 합의 상태를 나타냅니다.
 */
export interface DumpConsensusStateResponse {
  /** 현재 합의 라운드에 대한 자세한 상태 정보 */
  round_state: RoundState;
  /** 합의 문맥에 있는 노드가 연결된 피어에 대한 자세한 정보 */
  peers: PeerInfo[];
}
```

13. `consensusState`: 합의 상태 정보를 가져옵니다.
예시:
```js
const consensusStateResponse: ConsensusStateResponse = await rweb3.rigo.consensusState();
```

응답 유형:
```typescript
/**
 * 블록체인 노드의 합의 상태를 나타냅니다.
 */
export interface ConsensusStateResponse {
  readonly round_state: ConsensusRoundState;
}
```


14. `consensusParams`: 특정 블록 높이에서의 합의 매개변수를 검색합니다.
예시:
```js
const consensusParamsResponse: ConsensusParamsResponse = await rweb3.rigo.consensusParams(height);
```

응답 유형:
```typescript
export interface ConsensusParamsResponse {
  block_height: number;
  consensus_params: ConsensusParams;
}
```


15. `unconfirmedTxs`: 지정된 한도까지 미확인 거래 목록을 제공합니다.
예시:
```js
const unconfirmedTxsResponse: UnconfirmedTxsResponse = await rweb3.rigo.unconfirmedTxs(limit);
```

응답 유형:
```typescript
/**
 * 노드의 mempool에서 미확인 거래를 나타냅니다.
 */
export interface UnconfirmedTxsResponse {
  /** 미확인 거래 수 */
  n_txs: string;
  /** 모든 미확인 거래의 총 수 */
  total: string;
  /** 미확인 거래의 전체 크기(바이트 단위) */
  total_bytes: string;
  /** 미확인 거래 목록 */
  txs: [];
}
```

16. `txSearch`: 지정된 쿼리 문자열에 따라 거래를 검색하고 반환합니다.
예시:
```js
const txSearchResponse: TxSearchResponse = await rweb3.rigo.txSearch(query, parent, page, perPage, orderBy);
```

응답 유형:
```typescript
/**
 * 검색 쿼리와 일치하는 거래 목록이 포함된 응답을 나타냅니다.
 */
export interface TxSearchResponse {
  /** 검색 기준과 일치하는 거래 목록 */
  readonly txs: readonly TxResponse[];
  /** 검색 기준과 일치하는 거래의 총 수 */
  readonly total_count: number;
}
```



17. `tx`: 해시를 기반으로 거래를 가져옵니다.
예시:
```js
const txResponse: TxResponse = await rweb3.rigo.tx("hash");
```

응답 유형:
```typescript
/**
 * 거래 상세 정보를 포함하는 응답을 나타냅니다.
 */
export interface TxResponse {
  /** 거래 데이터 */
  readonly tx: HexString;
  /** 거래의 해시 */
  readonly hash: HexString;
  /** 거래를 포함하는 블록의 높이 */
  readonly height: number;
  /** 블록 내의 거래 인덱스 */
  readonly index: number;
  /** 거래와 관련된 결과 데이터 */
  readonly result: TxData;
  /** 거래의 증명 (있으면) */
  readonly proof?: TxProof;
  /** 거래 실행 결과 */
  readonly tx_result: TxData;
}
```


18. `abciInfo`: Application Blockchain Interface (ABCI)에 대한 정보를 제공합니다.
예시:
```js
const abciInfoResponse: AbciInfoResponse = await rweb3.rigo.abciInfo();
```

응답 유형:
```typescript
/**
 * ABCI 애플리케이션에 대한 일반 정보를 포함하는 응답을 나타냅니다.
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



19. `abciQuery`: ABCI 쿼리를 만듭니다.
예시:
```js
const abciQueryResponse: AbciQueryResponse = await rweb3.rigo.abciQuery(path, data, height, prove);
```

응답 유형:
```typescript
/**
 * ABCI 쿼리에 대한 응답을 나타냅니다.
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



20. `checkTx`: 지정된 거래를 확인합니다.
예시:
```js
const checkTxResponse: CheckTxResponse = await rweb3.rigo.checkTx("TrxProto");
```

응답 유형:
```typescript
/**
 * 거래를 확인한 후의 응답을 나타냅니다.
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


21. `numUnconfirmedTxs`: 미확인 거래의 수를 반환합니다.
예시:
```js
const numUnconfirmedTxsResponse: NumUnconfirmedTxsResponse = await rweb3.rigo.numUnconfirmedTxs();
```

응답 유형:
```typescript
/**
 * 미확인 거래에 대한 정보를 포함하는 응답을 나타냅니다.
 */
export interface NumUnconfirmedTxsResponse {
  readonly n_txs: number;
  /** 미확인 거래의 총 수 */
  readonly total: number;
  /** 모든 미확인 거래의 전체 크기(바이트 단위) */
  readonly total_bytes: number;
  readonly txs: TxData[];
}
```


22. `broadcastTxAsync`: 거래를 네트워크에 비동기적으로 브로드캐스트합니다.
예시:
```js
const broadcastTxAsyncResponse: BroadcastTxAsyncResponse = await rweb3.rigo.broadcastTxAsync("TrxProto");
```

응답 유형:
```typescript

/**
 * 거래를 비동기적으로 브로드캐스트한 후의 응답을 나타냅니다.
 */
export interface BroadcastTxAsyncResponse {
  /** 브로드캐스트된 거래의 해시 */
  readonly hash: HexString;
}

```


23. `broadcastTxSync`: 거래를 네트워크에 동기적으로 브로드캐스트합니다.
예시:
```js
const broadcastTxSyncResponse: BroadcastTxSyncResponse = await rweb3.rigo.broadcastTxSync("TrxProto");
```

응답 유형:
```typescript
/**
 * 거래를 동기적으로 브로드캐스트한 후의 응답을 나타냅니다.
 */
export interface BroadcastTxSyncResponse extends TxData {
  /** 브로드캐스트된 거래의 해시 */
  readonly hash: HexString;
}
```



24. `broadcastTxCommit`: 거래를 브로드캐스트하고 거래가 커밋되길 기다립니다.
예시:
```js
const broadcastTxCommitResponse: BroadcastTxCommitResponse = await rweb3.rigo.broadcastTxCommit("TrxProto");
```

응답 유형:
```typescript
/**
 * 트랜잭션을 브로드캐스트하고 커밋될 때까지 대기한 후의 응답을 나타냅니다.
 */
export interface BroadcastTxCommitResponse {
    /** 트랜잭션을 포함한 블록의 높이 */
    readonly height: number;
    /** 브로드캐스트된 트랜잭션의 해시 */
    readonly hash: HexString;
    /** 체크 트랜잭션의 결과 */
    readonly check_tx: TxData;
    /** 배송 트랜잭션의 결과 */
    readonly deliver_tx?: TxData;
}
```