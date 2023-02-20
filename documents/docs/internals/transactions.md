# Transactions

## Description

블록체인에 기록된 상태 정보를 변경하는 방법은, 트랜잭션(Transaction: Tx)을 블록체인 네트워크에 제출하고 이것이 모든 노드들에 의하여 실행되어야 한다.
제출되는 Tx은 상태의 변경 내용과 함께, 제출하는 계정(Account)의 전자서명을 포함한다.

`arcanex-sdk-js` 는 트랜잭션의 생성, 서명, 인코딩을 위한 API를 제공한다.

ARCANEX 의 트랜잭션은 다음과 같이 구성된다.

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

- `version`: 
ARCANEX 네트워크의 트랜잭션 종류는 다음과 같다.

- **Transfer** : ARCANEX 의 자산(Native Cryptocurrency)을 전송.
- **Staking** : ARCANEX 의 자산(Native Cryptocurrency)을 지분(Stake)로 전환.
- **Unstaking** : ARCANEX 의 지분(Stake)를 자산으로 전환.
- **Governance Proposal** : ARCANEX 의 거버넌스 규칙 변경을 제안.
- **Voting to proposal** : 거버넌스 규칙 제안에 대하여 투표.




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

