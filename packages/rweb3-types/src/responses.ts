/*
    Copyright 2023 All Rigo Chain Developers

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/
import { ReadonlyDate } from 'readonly-date';
import { HexString } from './primitives_types';

/**
 * Represents a date object with additional nanoseconds precision.
 */
export interface ReadonlyDateWithNanoseconds extends ReadonlyDate {
    /** Optional nanoseconds value for higher precision */
    readonly nanoseconds?: number;
}

/**
 * Represents the public key for a validator using the ed25519 algorithm.
 */
export interface ValidatorEd25519Pubkey {
    /** Algorithm type, always set to 'ed25519' */
    readonly algorithm: 'ed25519';
    /** The actual public key data */
    readonly data: Uint8Array;
}

/**
 * Represents the public key for a validator using the secp256k1 algorithm.
 */
export interface ValidatorSecp256k1Pubkey {
    /** Algorithm type, always set to 'secp256k1' */
    readonly algorithm: 'secp256k1';
    /** The actual public key data */
    readonly data: Uint8Array;
}

/**
 * General representation of a validator's public key, irrespective of its specific algorithm.
 */
export interface ValidatorPubkey {
    /** Specifies the type of the public key, either 'ed25519' or 'secp256k1' */
    readonly type: 'tendermint/PubKeyEd25519' | 'tendermint/PubKeySecp256k1';
    /** The public key's value in string format */
    readonly value: string;
}

/**
 * Enumeration of different statuses for a block's ID.
 */
export enum BlockIdFlag {
    Unknown = 0,
    Absent = 1,
    Commit = 2,
    Nil = 3,
    Unrecognized = -1,
}

/**
 * Contains information about the signature associated with a block's commit.
 */
export interface CommitSignature {
    /** Indicates the status/type of the block ID */
    block_id_flag: BlockIdFlag;
    /** Address of the validator responsible for the signature */
    validator_address: HexString | undefined;
    /** Timestamp of when the signature was created, with optional nanosecond precision */
    timestamp: ReadonlyDateWithNanoseconds | undefined;
    /** Actual data of the signature */
    signature: HexString | undefined;
}

export type Response =
    | AbciInfoResponse
    | AbciQueryResponse
    | BlockResponse
    | BlockResultsResponse
    | BlockSearchResponse
    | BlockchainResponse
    | BroadcastTxAsyncResponse
    | BroadcastTxSyncResponse
    | BroadcastTxCommitResponse
    | CommitResponse
    | GenesisResponse
    | HealthResponse
    | NumUnconfirmedTxsResponse
    | StatusResponse
    | TxResponse
    | TxSearchResponse
    | ValidatorsResponse
    | NetInfoResponse;

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

/**
 * Represents a single operation in the proof of a query.
 */
export interface ProofOp {
    /** Type of the proof operation */
    readonly type: string;
    /** Key associated with the proof operation */
    readonly key: HexString;
    /** Data associated with the proof operation */
    readonly data: HexString;
}

/**
 * Represents a proof for a particular query.
 */
export interface QueryProof {
    /** List of proof operations involved in the query proof */
    readonly ops: readonly ProofOp[];
}

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

/**
 * Represents a response containing information about a block.
 */
export interface BlockResponse {
    /** The ID of the block */
    readonly block_id: BlockId;
    /** The actual block data */
    readonly block: Block;
}

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

/**
 * Represents a response for a block search query.
 */
export interface BlockSearchResponse {
    /** List of blocks matching the search criteria */
    readonly blocks: readonly BlockResponse[];
    /** Total count of blocks matching the search criteria */
    readonly total_count: number;
}

/**
 * Represents a response with information about the blockchain.
 */
export interface BlockchainResponse {
    /** The height of the last block in the blockchain */
    readonly last_height: number;
    /** Metadata for blocks in the blockchain */
    readonly block_metas: readonly BlockMeta[];
}

/**
 * Represents a response after broadcasting a transaction asynchronously.
 */
export interface BroadcastTxAsyncResponse {
    /** The hash of the broadcasted transaction */
    readonly hash: HexString;
}

/**
 * Represents a response after broadcasting a transaction synchronously.
 */
export interface BroadcastTxSyncResponse extends TxData {
    /** The hash of the broadcasted transaction */
    readonly hash: HexString;
}

/**
 * Checks if the synchronous transaction broadcast was successful.
 */
export function broadcastTxSyncSuccess(res: BroadcastTxSyncResponse): boolean {
    // Code must be 0 on success
    return res.code === 0;
}

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

/**
 * Checks if the committed transaction broadcast was successful.
 */
export function broadcastTxCommitSuccess(response: BroadcastTxCommitResponse): boolean {
    // Code must be 0 on success
    // deliver_tx may be present but empty on failure
    return response.check_tx.code === 0 && !!response.deliver_tx && response.deliver_tx.code === 0;
}

/**
 * Represents a response containing the signed header.
 */
export interface CommitResponse {
    /** The signed header data */
    readonly signed_header: SignedHeader;
    /** The validator set at the height of the signed header */
    readonly canonical: boolean;
}

/**
 * Represents a signed header for a block.
 */
export interface SignedHeader {
    /** The header of the block */
    readonly header: Header;
    /** The commit associated with the block */
    readonly commit: Commit;
    /** Indicates if the header is canonical */
    readonly canonical: boolean;
}

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

/**
 * Represents a health check response. A value of `null` typically indicates the node is healthy.
 */
export type HealthResponse = null;

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

/**
 * Represents a response containing a list of transactions that match a search query.
 */
export interface TxSearchResponse {
    /** List of transactions that match the search criteria */
    readonly txs: readonly TxResponse[];
    /** Total number of transactions that match the search criteria */
    readonly total_count: number;
}

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

// Events

/**
 * Represents an event indicating a new block.
 */
export type NewBlockEvent = Block;

/**
 * Represents an event indicating a new block header.
 */
export type NewBlockHeaderEvent = Header;

/**
 * Represents an event associated with a transaction.
 */
export interface TxEvent {
    /** The transaction data */
    readonly tx: HexString;
    /** The hash of the transaction */
    readonly hash: HexString;
    /** The height of the block containing the transaction */
    readonly height: number;
    /** Result data associated with the transaction */
    readonly result: TxData;
}

/**
 * Represents an attribute of an event.
 */
export interface EventAttribute {
    /** Key associated with the attribute */
    readonly key: string;
    /** Value of the attribute */
    readonly value: string;
    /** Indicates if the attribute is indexed */
    readonly index: boolean;
}

/**
 * Represents a blockchain event with associated attributes.
 */
export interface Event {
    /** Type of the event */
    readonly type: string;
    /** Attributes associated with the event */
    readonly attributes: readonly EventAttribute[];
}

/**
 * Represents data associated with a transaction.
 */
export interface TxData {
    /** Status code of the transaction result */
    readonly code: number;
    /** Codespace (if available) */
    readonly codespace?: string;
    /** Log data associated with the transaction */
    readonly log?: string;
    /** Data returned by the transaction (if available) */
    readonly data?: HexString;
    /** Events triggered by the transaction */
    readonly events: readonly Event[];
    /** Information about the transaction */
    readonly info?: string;
    /** Gas limit specified for the transaction */
    readonly gas_wanted?: string;
    /** Actual amount of gas used by the transaction */
    readonly gas_used?: string;
}

/**
 * Represents the proof associated with a transaction.
 */
export interface TxProof {
    /** Transaction data for which the proof is generated */
    readonly data: HexString;
    /** Root hash of the Merkle tree */
    readonly root_hash: HexString;
    /** Details of the proof */
    readonly proof: {
        /** Total number of leaves in the Merkle tree */
        readonly total: number;
        /** Index of the leaf in the Merkle tree */
        readonly index: number;
        /** Hash of the leaf node */
        readonly leaf_hash: HexString;
        /** Hashes of the aunt nodes in the Merkle tree */
        readonly aunts: readonly HexString[];
    };
}

/**
 * Represents metadata associated with a block.
 */
export interface BlockMeta {
    /** Identifier of the block */
    readonly block_id: BlockId;
    /** Size of the block (in bytes) */
    readonly block_size: number;
    /** Header information of the block */
    readonly header: Header;
    /** Number of transactions in the block */
    readonly num_txs: number;
}

/**
 * Represents the identifier of a block.
 */
export interface BlockId {
    /** Hash of the block */
    readonly hash: HexString;
    /** Details of the block parts */
    readonly parts: {
        /** Total number of parts the block is divided into */
        readonly total: number;
        /** Combined hash of all the parts */
        readonly hash: HexString;
    };
}

/**
 * Represents a blockchain block with its contents.
 */
export interface Block {
    /** Header information of the block */
    readonly header: Header;
    /** Details of the last commit */
    readonly last_commit: Commit | null;
    readonly data: BlockTxs;
    /** Any evidence associated with the block */
    readonly evidence: readonly Evidence[];
}

export interface BlockTxs {
    /** Transactions included in the block */
    readonly txs: readonly HexString[];
}

/** Placeholder type for evidence associated with a block. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Evidence = any;

/**
 * Represents the commit information associated with a block.
 */
export interface Commit {
    /** Identifier of the block for which the commit is made */
    readonly block_id: BlockId;
    /** Height of the block */
    readonly height: number;
    /** Round in which the block was committed */
    readonly round: number;
    /** Signatures associated with the commit */
    readonly signatures: readonly CommitSignature[];
}

/** Enum representing different types of votes. */
export enum VoteType {
    PreVote = 1,
    PreCommit = 2,
}

/**
 * Represents a vote made by a validator.
 */
export interface Vote {
    /** Type of the vote (either PreVote or PreCommit) */
    readonly type: VoteType;
    /** Address of the validator making the vote */
    readonly validator_address: HexString;
    /** Index of the validator in the validator set */
    readonly validator_index: number;
    /** Height of the block for which the vote is made */
    readonly height: number;
    /** Round in which the vote was made */
    readonly round: number;
    /** Timestamp of the vote */
    readonly timestamp: ReadonlyDate;
    /** Identifier of the block for which the vote is made */
    readonly block_id: BlockId;
    /** Signature of the validator for the vote */
    readonly signature: HexString;
}

/**
 * Represents version information for a blockchain node.
 */
export interface Version {
    /** Version number for the blockchain protocol */
    readonly block: number;
    /** Version number for the application running on the node */
    readonly app: string;
}

/**
 * Represents the header information of a block.
 */
export interface Header {
    /** Version details associated with the block */
    readonly version: Version;
    /** Identifier of the blockchain chain */
    readonly chain_id: string;
    /** Height of the block in the blockchain */
    readonly height: number;
    /** Timestamp indicating when the block was generated */
    readonly time: ReadonlyDateWithNanoseconds;
    /** Identifier of the last block in the blockchain */
    readonly last_block_id: BlockId | null;
    /** Hash of the last commit associated with the previous block */
    readonly last_commit_hash: HexString;
    /** Hash of the data within the block */
    readonly data_hash: HexString;
    /** Hash of the current validator set */
    readonly validators_hash: HexString;
    /** Hash of the next validator set */
    readonly next_validators_hash: HexString;
    /** Hash of the consensus state after processing the block */
    readonly consensus_hash: HexString;
    /** Hash representing the application state after processing the block */
    readonly app_hash: HexString;
    /** Hash of the results from executing the transactions in the last block */
    readonly last_results_hash: HexString;
    /** Hash of the evidence (if any) included in the block */
    readonly evidence_hash: HexString;
    /** Address of the validator that proposed the block */
    readonly proposer_address: HexString;
}

/**
 * Represents information about a node in the blockchain network.
 */
export interface NodeInfo {
    /** Unique identifier of the node */
    readonly id: HexString;
    /** Address where the node is listening for incoming connections */
    readonly listen_addr: string;
    /** Name of the network to which the node belongs */
    readonly network: string;
    /** Version of the node software */
    readonly version: string;
    /** List of channels supported by the node */
    readonly channels: string;
    /** Display name of the node */
    readonly moniker: string;
    /** Other miscellaneous information about the node */
    readonly other: Map<string, string>;
    /** Protocol versions supported by the node */
    readonly protocol_version: {
        readonly p2p: number;
        readonly block: number;
        readonly app: string;
    };
}

/**
 * Represents the synchronization status of a node.
 */
export interface SyncInfo {
    /** Hash of the earliest known application state */
    readonly earliest_app_hash?: HexString;
    /** Hash of the earliest known block */
    readonly earliest_block_hash?: HexString;
    /** Height of the earliest known block */
    readonly earliest_block_height?: number;
    /** Timestamp of the earliest known block */
    readonly earliest_block_time?: ReadonlyDate;
    /** Hash of the latest block in the node's blockchain */
    readonly latest_block_hash: HexString;
    /** Hash of the latest application state in the node's blockchain */
    readonly latest_app_hash: HexString;
    /** Height of the latest block in the node's blockchain */
    readonly latest_block_height: number;
    /** Timestamp of the latest block */
    readonly latest_block_time: ReadonlyDate;
    /** Indicates if the node is currently catching up with the blockchain network */
    readonly catching_up: boolean;
}

/**
 * Represents a validator in the blockchain network.
 */
export interface Validator {
    /** Address of the validator */
    readonly address: HexString;
    /** Public key of the validator */
    readonly pub_key: ValidatorPubkey;
    /** Voting power of the validator in the consensus algorithm */
    readonly power: string;
    /** Name of the validator */
    readonly name?: string;
}

/**
 * Represents an update to a validator's details.
 */
export interface ValidatorUpdate {
    /** Public key of the validator */
    readonly pubkey: string;
    /** Updated voting power of the validator */
    readonly voting_power: string;
}

export interface ConsensusParamsResponse {
    block_height: number;
    consensus_params: ConsensusParams;
}

/**
 * Represents consensus parameters governing the blockchain network.
 */
export interface ConsensusParams {
    /** Parameters related to the blocks in the blockchain */
    readonly block: BlockParams;
    /** Parameters related to evidence handling in the blockchain */
    readonly evidence: EvidenceParams;

    /** Parameters related to the transactions in the blockchain */
    readonly validator: ValidatorParams;

    /** Parameters related to the version of the blockchain protocol */
    readonly version: VersionParams;
}

/**
 * Represents the parameters related to evidence handling in the blockchain.
 */
export interface ValidatorParams {
    readonly pub_key_types: string[];
}

/**
 * Represents the parameters related to evidence handling in the blockchain.
 */
export interface VersionParams {
    /** Version number for the blockchain protocol */
    readonly app_version: number;
}

/**
 * Represents parameters associated with blocks in the blockchain.
 */
export interface BlockParams {
    /** Maximum size of a block (in bytes) */
    readonly max_bytes: number;
    /** Maximum amount of gas that can be used in a block */
    readonly max_gas: number;
    /** Time interval between blocks (in milliseconds) */
    readonly time_iota_ms: number;
}

/**
 * Represents the size limitations for a transaction.
 */
export interface TxSizeParams {
    /** Maximum size of a transaction (in bytes) */
    readonly max_bytes: number;
    /** Maximum amount of gas that can be used in a transaction */
    readonly max_gas: number;
}

/**
 * Represents the gossip parameters for a block.
 */
export interface BlockGossipParams {
    /** Size of a part of the block (in bytes) used for gossiping */
    readonly block_part_size_bytes: number;
}

/**
 * Represents the evidence parameters for the blockchain.
 */
export interface EvidenceParams {
    /** Maximum age (in number of blocks) of evidence that can be submitted */
    readonly max_age_num_blocks: number;
    /** Maximum age (in duration) of evidence that can be submitted */
    readonly max_age_duration: number;
    /** Maximum number of evidence that can be submitted in a single transaction */
    readonly max_bytes: number;
}

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

/**
 * Represents the current consensus state of a node.
 */
export interface DumpConsensusStateResponse {
    /** Detailed state information about the current round of consensus */
    round_state: RoundState;
    /** Detailed information about the peers the node is connected to in the context of consensus */
    peers: PeerInfo[];
}

export interface PeerInfo {
    node_address: string;
    peer_state: PeerState;
}

export interface PeerState {
    round_state: PeerRoundState;
    stats: {
        votes: string;
        block_parts: string;
    };
}

export interface PeerRoundState {
    height: number;
    round: number;
    step: number;
    start_time: ReadonlyDate;
    proposal: boolean;
    proposal_block_part_set_header: {
        total: number;
        hash: string;
    };
    proposal_block_parts?: null;
    proposal_pol_round: number;
    proposal_pol: string;
    prevotes: string;
    precommits: string;
    last_commit_round: number;
    last_commit: string;
    catchup_commit_round: number;
    catchup_commit: string;
}

export interface RoundState {
    /** Height of the current block being proposed */
    readonly height: number;
    /** Current round number in the consensus process */
    readonly round: number;
    /** Current step number in the consensus process */
    readonly step: number;
    /** Timestamp indicating when the current round started */
    readonly start_time: ReadonlyDate;
    /** Timestamp indicating when the last block was committed */
    readonly commit_time: ReadonlyDate;
    /** Information about the validators for the current round */
    readonly validators: DumpConsensusValidators;
    /** Round number in which the current block was locked in */
    readonly locked_round: number;
    /** Round number in which the current block was deemed valid */
    readonly valid_round: string;
    /** Current votes for the block in this round */
    readonly votes: Vote[];
    /** Round number in which the current block was committed */
    readonly commit_round: number;
    /** Information about the last commit for the previous block */
    readonly last_commit: LastCommitInfo;
    /** Information about the validators from the last round */
    readonly last_validators: DumpConsensusValidators;
    /** Indicates if a timeout was triggered for a precommit in the current round */
    readonly triggered_timeout_precommit: boolean;
}

export interface Vote {
    readonly round: number;
    readonly prevotes: string[];
    readonly prevotes_bit_array: string;
    readonly precommits: string[];
    readonly precommits_bit_array: string;
}

export interface LastCommitInfo {
    /** Votes for the last commit */
    readonly votes: string[];
    /** Bitmap representing which validators voted in the last commit */
    readonly votes_bit_array: string;
    /** Majorities detected by each peer */
    readonly peer_maj_23s?: {};
}

export interface DumpConsensusValidators {
    /** List of validators from the last round */
    readonly validators: DumpConsensusValidator[];
    /** Validator that proposed the last block */
    readonly proposer: DumpConsensusValidator;
}

export interface DumpConsensusValidator {
    /** Address of the validator */
    readonly address: HexString;
    /** Public key of the validator */
    readonly pub_key: ValidatorPubkey;
    /** Voting power of the validator in the consensus algorithm */
    readonly voting_power: string;
    readonly proposer_priority: string;
}

/**
 * Represents the consensus state of a blockchain node.
 */
export interface ConsensusStateResponse {
    readonly round_state: ConsensusRoundState;
}

export interface ConsensusRoundState {
    /** A combination of block height, consensus round, and step */
    readonly 'height/round/step': string;
    /** Timestamp when the current round started */
    readonly start_time: ReadonlyDate;
    /** Hash of the proposed block for the current round */
    readonly proposal_block_hash?: string;
    /** Hash of the block that the node has locked on for the current round */
    readonly locked_block_hash?: string;
    /** Hash of the block that the node considers valid for the current round */
    readonly valid_block_hash?: string;
    /** Voting details for each height */
    readonly height_vote_set: HeightVoteSet[];
    /** Proposer details for the current block */
    readonly proposer: { address: string; index: number };
}

export interface HeightVoteSet {
    /** Consensus round number */
    round: number;
    /** List of prevotes for the round */
    prevotes: string[];
    /** Bitmap indicating which validators prevoted */
    prevotes_bit_array: string;
    /** List of precommits for the round */
    precommits: string[];
    /** Bitmap indicating which validators precommitted */
    precommits_bit_array: string;
}

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

/**
 * Represents the response related to a delegatee.
 */
export interface DelegateeResponse {
    key: string;
    log?: string;
    code?: number;
    value?: DelegateeValue;
}

export interface DelegateeValue {
    address: string;
    pubKey: string;
    selfAmount: string;
    selfPower: number;
    totalAmount: string;
    totalPower: number;
    rewardAmount: string;
    stakes: DelegateeStake[];
}

export interface DelegateeStake {
    owner: string;
    to: string;
    amount: string;
    power: number;
    ReceivedReward: string;
    txhash: string;
    startHeight: number;
    refundHeight: number;
}

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

/**
 * Represents the stakes related response.
 */
export interface StakesResponse {
    key: string;
    value?: StakesValue[];
}

export interface StakesValue {
    owner: string;
    to: string;
    amount: string;
    power: number;
    ReceivedReward: string;
    txhash: string;
    startHeight: number;
    refundHeight: number;
}

/**
 * Represents a governance proposal response.
 */
export interface ProposalResponse {
    // Add fields as needed.
}

/**
 * Represents the response after making a call to a virtual machine (VM).
 */
export interface VmCallResponse {
    value: {
        /** Data returned by the VM after the call */
        returnData: any;
    };
}

export interface DateWithNanoseconds extends Date {
    /** Nanoseconds after the time stored in a vanilla Date (millisecond granularity) */
    nanoseconds?: number;
}
