# Transactions

## Data structure

### TrxProto

```ts
export interface TrxProto {
  version: number;
  time: Long;
  nonce: Long;
  from: Uint8Array;
  to: Uint8Array;
  Amount: Uint8Array;
  Gas: Uint8Array;
  type: number;
  Payload: Uint8Array;
  sig: Uint8Array;
}
```

### Transaction Payload
#### TrxPayloadTransferProto

It is equal to `TrxProto`

#### TrxPayloadStakingProto

It is equal to `TrxProto`

#### TrxPayloadUnstakingProto

```ts
export interface TrxPayloadUnstakingProto {
  txHash: Uint8Array;
}
```

- `txHash`: 

#### TrxPayloadProposalProto

#### TrxPayloadVotingProto
## 