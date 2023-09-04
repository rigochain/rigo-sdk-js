import { ReadonlyDate } from 'readonly-date';
import { JsonRpcResponseWithResult } from './json_rpc_types';
import {
    assertArray,
    assertBoolean,
    assertNotEmpty,
    assertNumber,
    assertObject,
    assertSet,
    assertString,
    dictionaryToStringMap,
    may,
} from './encodings';
import { apiToBigInt, apiToSmallInt } from './inthelpers';
import { HexString } from './primitives_types';
import { fromRfc3339 } from './rfc3339';
import { fromBase64 } from './base64';
import assert from 'assert';
import { SubscriptionEvent } from './subscription_event';

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
export interface NewBlockEvent extends Block {}

/**
 * Represents an event indicating a new block header.
 */
export interface NewBlockHeaderEvent extends Header {}

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
    readonly gas_wanted?: number;
    /** Actual amount of gas used by the transaction */
    readonly gas_used?: number;
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
    readonly app: number;
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
        readonly app: number;
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
    readonly power: bigint;
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
    readonly voting_power: bigint;
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
    readonly voting_power: bigint;
    readonly proposer_priority: bigint;
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
        rewardPerPower: bigint; // Reward given per unit of computational power for validators
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
    key: string;
    value: {
        address: string;
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

interface AbciInfoResult {
    readonly response: RpcAbciInfoResponse;
}

interface RpcBlockchainResponse {
    readonly last_height: string;
    readonly block_metas: readonly RpcBlockMeta[];
}

interface RpcBlockId {
    /** hex encoded */
    readonly hash: string;
    readonly parts: {
        readonly total: number;
        /** hex encoded */
        readonly hash: HexString;
    };
}

interface RpcBlockVersion {
    readonly block: string;
    readonly app?: string;
}

interface RpcHeader {
    readonly version: RpcBlockVersion;
    readonly chain_id: string;
    readonly height: string;
    readonly time: string;

    readonly last_block_id: RpcBlockId;

    /** hex encoded */
    readonly last_commit_hash: string;
    /** hex encoded */
    readonly data_hash: string;

    /** hex encoded */
    readonly validators_hash: string;
    /** hex encoded */
    readonly next_validators_hash: string;
    /** hex encoded */
    readonly consensus_hash: string;
    /** hex encoded */
    readonly app_hash: string;
    /** hex encoded */
    readonly last_results_hash: string;

    /** hex encoded */
    readonly evidence_hash: string;
    /** hex encoded */
    readonly proposer_address: string;
}

interface RpcBlockMeta {
    readonly block_id: RpcBlockId;
    readonly block_size: string;
    readonly header: RpcHeader;
    readonly num_txs: string;
}

interface RpcAbciQueryResponse {
    /**
     * Base64 encoded
     *
     * This can be null since this iy a byte slice and due to
     * https://github.com/tendermint/tendermint/blob/v0.34.19/abci/types/result.go#L50
     */
    readonly key?: string | null;
    /**
     * Base64 encoded
     *
     * This can be null since this is a byte slice and due to
     * https://github.com/tendermint/tendermint/blob/v0.34.19/abci/types/result.go#L50
     */
    readonly value?: string | null;
    readonly proofOps?: RpcQueryProof | null;
    readonly height?: string;
    /** An integer; can be negative */
    readonly index?: string;
    readonly code?: number; // only for errors
    readonly codespace?: string;
    readonly log?: string;
    readonly info?: string;
}

export interface RpcQueryProof {
    readonly ops: readonly RpcProofOp[];
}

export interface RpcProofOp {
    readonly type: string;
    /** base64 encoded */
    readonly key: string;
    /** base64 encoded */
    readonly data: string;
}

function decodeQueryProof(data: RpcQueryProof): QueryProof {
    return {
        ops: data.ops.map((op) => ({
            type: op.type,
            key: op.key,
            data: op.data,
        })),
    };
}

function decodeAbciQuery(data: RpcAbciQueryResponse): AbciQueryResponse {
    return {
        key: assertString(data.key ?? ''),
        value: assertString(data.value ?? ''),
        proof: may(decodeQueryProof, data.proofOps),
        height: may(apiToSmallInt, data.height),
        code: may(apiToSmallInt, data.code),
        codespace: assertString(data.codespace ?? ''),
        index: may(apiToSmallInt, data.index),
        log: data.log,
        info: assertString(data.info ?? ''),
    };
}

interface AbciQueryResult {
    readonly response: RpcAbciQueryResponse;
}

type RpcSignature = {
    readonly block_id_flag: number;
    /** hex encoded */
    readonly validator_address: string;
    readonly timestamp: string;
    /**
     * Base64 encoded signature.
     * There are cases when this is not set, see https://github.com/cosmos/cosmjs/issues/704#issuecomment-797122415.
     */
    readonly signature: string | null;
};
// We lost track on how the evidence structure actually looks like.
// This is any now and passed to the caller untouched.
type RpcEvidence = any;

interface RpcCommit {
    readonly block_id: RpcBlockId;
    readonly height: string;
    readonly round: string;
    readonly signatures: readonly RpcSignature[];
}

interface RpcBlock {
    readonly header: RpcHeader;
    readonly last_commit: RpcCommit;
    readonly data: {
        /** Raw tx bytes, base64 encoded */
        readonly txs?: readonly string[];
    };
    // It's currently unclear why the deep nesting is requied.
    // See https://github.com/tendermint/tendermint/issues/7697.
    readonly evidence?: {
        readonly evidence?: readonly RpcEvidence[];
    };
}

interface RpcBlockResponse {
    readonly block_id: RpcBlockId;
    readonly block: RpcBlock;
}

function decodeBlockResponse(data: RpcBlockResponse): BlockResponse {
    return {
        block_id: decodeBlockId(data.block_id),
        block: decodeBlock(data.block),
    };
}

function decodeBlockIdFlag(blockIdFlag: number): BlockIdFlag {
    assert(blockIdFlag in BlockIdFlag);
    return blockIdFlag;
}

/**
 * In some cases a timestamp is optional and set to the value 0 in Go.
 * This can lead to strings like "0001-01-01T00:00:00Z" (see https://github.com/cosmos/cosmjs/issues/704#issuecomment-797122415).
 * This decoder tries to clean up such encoding from the API and turn them
 * into undefined values.
 */
function decodeOptionalTime(timestamp: string): DateWithNanoseconds | undefined {
    const nonZeroTime = timestamp && !timestamp.startsWith('0001-01-01');
    return nonZeroTime ? fromRfc3339WithNanoseconds(timestamp) : undefined;
}

function decodeCommitSignature(data: RpcSignature): CommitSignature {
    return {
        block_id_flag: decodeBlockIdFlag(data.block_id_flag),
        validator_address: data.validator_address ? data.validator_address : undefined,
        timestamp: decodeOptionalTime(data.timestamp),
        signature: data.signature ? data.signature : undefined,
    };
}

function decodeCommit(data: RpcCommit): Commit {
    return {
        block_id: decodeBlockId(assertObject(data.block_id)),
        height: apiToSmallInt(assertNotEmpty(data.height)),
        round: apiToSmallInt(data.round),
        signatures: assertArray(data.signatures).map(decodeCommitSignature),
    };
}

function decodeBlockData(data: RpcBlock['data']): BlockTxs {
    return {
        txs: data.txs ? assertArray(data.txs).map(assertString) : [],
    };
}

function decodeBlock(data: RpcBlock): Block {
    return {
        header: decodeHeader(assertObject(data.header)),
        // For the block at height 1, last commit is not set. This is represented in an empty object like this:
        // { height: '0', round: 0, block_id: { hash: '', parts: [Object] }, signatures: [] }
        last_commit: data.last_commit.block_id.hash
            ? decodeCommit(assertObject(data.last_commit))
            : null,
        data: decodeBlockData(data.data),
        // Lift up .evidence.evidence to just .evidence
        // See https://github.com/tendermint/tendermint/issues/7697
        evidence: data.evidence?.evidence ?? [],
    };
}

interface RpcBlockResultsResponse {
    readonly height: string;
    readonly txs_results: readonly RpcTxData[] | null;
    readonly begin_block_events: readonly RpcEvent[] | null;
    readonly end_block_events: readonly RpcEvent[] | null;
    readonly validator_updates: readonly RpcValidatorUpdate[] | null;
    readonly consensus_param_updates: RpcConsensusParams | null;
}

interface RpcBlockParams {
    readonly max_bytes: string;
    readonly max_gas: string;
    readonly time_iota_ms: string;
}

interface RpcEvidenceParams {
    readonly max_age_num_blocks: string;
    readonly max_age_duration: string;
    readonly max_bytes: string;
}

interface RpcValidatorParams {
    readonly pub_key_types: readonly string[];
}

interface RpcVersionParams {
    readonly app_version: string;
}

function decodeBlockParams(data: RpcBlockParams): BlockParams {
    return {
        max_bytes: apiToSmallInt(assertNotEmpty(data.max_bytes)),
        max_gas: apiToSmallInt(assertNotEmpty(data.max_gas)),
        time_iota_ms: apiToSmallInt(assertNotEmpty(data.time_iota_ms)),
    };
}

function decodeConsensusParams(data: RpcConsensusParams): ConsensusParams {
    return {
        block: decodeBlockParams(assertObject(data.block)),
        evidence: decodeEvidenceParams(assertObject(data.evidence)),
        validator: decodeValidatorParams(assertObject(data.validator)),
        version: decodeVersionParams(assertObject(data.version)),
    };
}

function decodeValidatorParams(data: RpcValidatorParams): ValidatorParams {
    return {
        pub_key_types: assertArray(data.pub_key_types).map(assertString),
    };
}

function decodeVersionParams(data: RpcVersionParams): VersionParams {
    return {
        app_version: apiToSmallInt(data.app_version),
    };
}

function decodeEvidenceParams(data: RpcEvidenceParams): EvidenceParams {
    return {
        max_age_num_blocks: apiToSmallInt(assertNotEmpty(data.max_age_num_blocks)),
        max_age_duration: apiToSmallInt(assertNotEmpty(data.max_age_duration)),
        max_bytes: apiToSmallInt(assertNotEmpty(data.max_bytes)),
    };
}

interface RpcConsensusParams {
    readonly block: RpcBlockParams;
    readonly evidence: RpcEvidenceParams;
    readonly validator: RpcValidatorParams;
    readonly version: RpcVersionParams;
}

// for block results
interface RpcValidatorUpdate {
    readonly pub_key: string;
    // When omitted, this means zero (see https://github.com/cosmos/cosmjs/issues/1177#issuecomment-1160115080)
    readonly power?: string;
}

interface RpcEvent {
    readonly type: string;
    /** Can be omitted (see https://github.com/cosmos/cosmjs/pull/1198) */
    readonly attributes?: readonly RpcAttribute[];
}

interface RpcAttribute {
    /** base64 encoded */
    readonly key: string;
    /** base64 encoded */
    readonly value?: string | null;
    readonly index: boolean;
}

interface RpcTxData {
    readonly codespace?: string;
    readonly code?: number;
    readonly log?: string;
    /** base64 encoded */
    readonly data?: string;
    readonly events?: readonly RpcEvent[];
    readonly gas_wanted?: string;
    readonly gas_used?: string;
}

export function decodeValidatorUpdate(data: RpcValidatorUpdate): ValidatorUpdate {
    return {
        pubkey: assertObject(data.pub_key),
        voting_power: apiToBigInt(data.power ?? '0'),
    };
}

function decodeAttributes(attributes: readonly RpcAttribute[]): EventAttribute[] {
    return assertArray(attributes).map(decodeAttribute);
}

function decodeAttribute(attribute: RpcAttribute): EventAttribute {
    return {
        key: assertNotEmpty(attribute.key),
        value: assertString(attribute.value ?? ''),
        index: attribute.index,
    };
}

export function decodeEvent(event: RpcEvent): Event {
    return {
        type: event.type,
        attributes: event.attributes ? decodeAttributes(event.attributes) : [],
    };
}

interface RpcBlockSearchResponse {
    readonly blocks: readonly RpcBlockResponse[];
    readonly total_count: string;
}

function decodeEvents(events: readonly RpcEvent[]): readonly Event[] {
    return assertArray(events).map(decodeEvent);
}

function decodeTxData(data: RpcTxData): TxData {
    return {
        code: apiToSmallInt(assertNumber(data.code ?? 0)),
        codespace: data.codespace,
        log: data.log,
        data: data.data,
        events: data.events ? decodeEvents(data.events) : [],
        gas_wanted: apiToSmallInt(data.gas_wanted ?? 0),
        gas_used: apiToSmallInt(data.gas_used ?? 0),
    };
}

function decodeBlockResults(data: RpcBlockResultsResponse): BlockResultsResponse {
    return {
        height: apiToSmallInt(assertNotEmpty(data.height)),
        txs_results: (data.txs_results || []).map(decodeTxData),
        validator_updates: (data.validator_updates || []).map(decodeValidatorUpdate),
        consensus_params_updates: may(decodeConsensusParams, data.consensus_param_updates),
        begin_block_events: decodeEvents(data.begin_block_events || []),
        end_block_events: decodeEvents(data.end_block_events || []),
    };
}

function decodeBlockSearch(data: RpcBlockSearchResponse): BlockSearchResponse {
    return {
        total_count: apiToSmallInt(assertNotEmpty(data.total_count)),
        blocks: assertArray(data.blocks).map(decodeBlockResponse),
    };
}

interface RpcBroadcastTxSyncResponse extends RpcTxData {
    /** hex encoded */
    readonly hash: string;
}

function decodeBroadcastTxSync(data: RpcBroadcastTxSyncResponse): BroadcastTxSyncResponse {
    return {
        ...decodeTxData(data),
        hash: assertNotEmpty(data.hash),
    };
}

interface RpcBroadcastTxCommitResponse {
    readonly height: string;
    /** hex encoded */
    readonly hash: string;
    readonly check_tx: RpcTxData;
    readonly deliver_tx?: RpcTxData;
}

function decodeBroadcastTxCommit(data: RpcBroadcastTxCommitResponse): BroadcastTxCommitResponse {
    return {
        height: apiToSmallInt(data.height),
        hash: assertNotEmpty(data.hash),
        check_tx: decodeTxData(assertObject(data.check_tx)),
        deliver_tx: may(decodeTxData, data.deliver_tx),
    };
}

interface RpcCommitResponse {
    readonly signed_header: {
        readonly header: RpcHeader;
        readonly commit: RpcCommit;
    };
    readonly canonical: boolean;
}

interface RpcGenesisResponse {
    readonly genesis_time: string;
    readonly chain_id: string;
    readonly consensus_params: RpcConsensusParams;
    // The validators key is used to specify a set of validators for testnets or PoA blockchains.
    // PoS blockchains use the app_state.genutil.gentxs field to stake and bond a number of validators in the first block.
    readonly validators?: readonly RpcValidatorGenesis[];
    /** hex encoded */
    readonly app_hash: string;
    readonly app_state: Record<string, unknown> | undefined;
}

interface RpcValidatorGenesis {
    /** hex-encoded */
    readonly address: string;
    readonly pub_key: string;
    readonly power: string;
    readonly name?: string;
}

interface GenesisResult {
    readonly genesis: RpcGenesisResponse;
}
function decodeCommitResponse(data: RpcCommitResponse): CommitResponse {
    return {
        canonical: assertBoolean(data.canonical),
        signed_header: {
            header: decodeHeader(data.signed_header.header),
            commit: decodeCommit(data.signed_header.commit),
            canonical: assertBoolean(data.canonical),
        },
    };
}

export function decodeValidatorGenesis(data: RpcValidatorGenesis): Validator {
    return {
        address: assertNotEmpty(data.address),
        pub_key: {
            type: 'tendermint/PubKeyEd25519',
            value: assertNotEmpty(data.pub_key),
        },
        power: apiToBigInt(assertNotEmpty(data.power)),
        name: data.name,
    };
}

function decodeGenesis(data: RpcGenesisResponse): GenesisResponse {
    return {
        genesis_time: fromRfc3339WithNanoseconds(assertNotEmpty(data.genesis_time)),
        chain_id: assertNotEmpty(data.chain_id),
        initial_height: 1,
        consensus_params: decodeConsensusParams(data.consensus_params),
        validators: data.validators ? assertArray(data.validators).map(decodeValidatorGenesis) : [],
        app_hash: assertSet(data.app_hash), // empty string in kvstore app
        app_state: data.app_state,
    };
}

interface RpcNumUnconfirmedTxsResponse {
    readonly total: string;
    readonly total_bytes: string;
    readonly n_txs: string;
    readonly txs: readonly RpcTxData[];
}

function decodeNumUnconfirmedTxs(data: RpcNumUnconfirmedTxsResponse): NumUnconfirmedTxsResponse {
    return {
        n_txs: apiToSmallInt(assertNotEmpty(data.n_txs)),
        total: apiToSmallInt(assertNotEmpty(data.total)),
        total_bytes: apiToSmallInt(assertNotEmpty(data.total_bytes)),
        txs: assertArray(data.txs).map(decodeTxData),
    };
}

interface RpcNodeInfo {
    /** hex encoded */
    readonly id: string;
    /** IP and port */
    readonly listen_addr: string;
    readonly network: string;
    readonly version: string;
    readonly channels: string; // ???
    readonly moniker: string;
    readonly protocol_version: {
        readonly p2p: string;
        readonly block: string;
        readonly app: string;
    };
    /**
     * Additional information. E.g.
     * {
     *   "tx_index": "on",
     *   "rpc_address":"tcp://0.0.0.0:26657"
     * }
     */
    readonly other: Record<string, unknown>;
}

interface RpcSyncInfo {
    /** hex encoded */
    readonly earliest_app_hash: string;
    /** hex encoded */
    readonly earliest_block_hash: string;
    readonly earliest_block_height: string;
    readonly earliest_block_time: string;
    /** hex encoded */
    readonly latest_block_hash: string;
    /** hex encoded */
    readonly latest_app_hash: string;
    readonly latest_block_height: string;
    readonly latest_block_time: string;
    readonly catching_up: boolean;
}

// this is in status
interface RpcValidatorInfo {
    /** hex encoded */
    readonly address: string;
    readonly pub_key: string;
    readonly voting_power: string;
    readonly name?: string;
}

interface RpcStatusResponse {
    readonly node_info: RpcNodeInfo;
    readonly sync_info: RpcSyncInfo;
    readonly validator_info: RpcValidatorInfo;
}

function decodeNodeInfo(data: RpcNodeInfo): NodeInfo {
    return {
        id: assertNotEmpty(data.id),
        listen_addr: assertNotEmpty(data.listen_addr),
        network: assertNotEmpty(data.network),
        version: assertString(data.version), // Can be empty (https://github.com/cosmos/cosmos-sdk/issues/7963)
        channels: assertNotEmpty(data.channels),
        moniker: assertNotEmpty(data.moniker),
        other: dictionaryToStringMap(data.other),
        protocol_version: {
            app: apiToSmallInt(assertNotEmpty(data.protocol_version.app)),
            block: apiToSmallInt(assertNotEmpty(data.protocol_version.block)),
            p2p: apiToSmallInt(assertNotEmpty(data.protocol_version.p2p)),
        },
    };
}

function decodeSyncInfo(data: RpcSyncInfo): SyncInfo {
    const earliestBlockHeight = data.earliest_block_height
        ? apiToSmallInt(data.earliest_block_height)
        : undefined;
    const earliestBlockTime = data.earliest_block_time
        ? fromRfc3339WithNanoseconds(data.earliest_block_time)
        : undefined;

    return {
        earliest_app_hash: data.earliest_app_hash ? data.earliest_app_hash : undefined,
        earliest_block_hash: data.earliest_block_hash ? data.earliest_block_hash : undefined,
        earliest_block_height: earliestBlockHeight || undefined,
        earliest_block_time: earliestBlockTime?.getTime() ? earliestBlockTime : undefined,
        latest_block_hash: assertNotEmpty(data.latest_block_hash),
        latest_app_hash: assertNotEmpty(data.latest_app_hash),
        latest_block_time: fromRfc3339WithNanoseconds(assertNotEmpty(data.latest_block_time)),
        latest_block_height: apiToSmallInt(assertNotEmpty(data.latest_block_height)),
        catching_up: assertBoolean(data.catching_up),
    };
}

export function decodeValidatorInfo(data: RpcValidatorInfo): Validator {
    return {
        pub_key: {
            type: 'tendermint/PubKeyEd25519',
            value: assertNotEmpty(data.pub_key),
        },
        power: apiToBigInt(assertNotEmpty(data.voting_power)),
        address: assertNotEmpty(data.address),
        name: data.name,
    };
}

function decodeStatus(data: RpcStatusResponse): StatusResponse {
    return {
        node_info: decodeNodeInfo(data.node_info),
        sync_info: decodeSyncInfo(data.sync_info),
        validator_info: decodeValidatorInfo(data.validator_info),
    };
}

interface RpcTxResponse {
    /** Raw tx bytes, base64 encoded */
    readonly tx: string;
    readonly tx_result: RpcTxData;
    readonly height: string;
    readonly index: number;
    /** hex encoded */
    readonly hash: string;
    readonly proof?: RpcTxProof;
}

interface RpcTxProof {
    /** base64 encoded */
    readonly data: string;
    /** hex encoded */
    readonly root_hash: string;
    readonly proof: {
        readonly total: string;
        readonly index: string;
        /** base64 encoded */
        readonly leaf_hash: string;
        /** base64 encoded */
        readonly aunts: readonly string[];
    };
}

function decodeTxProof(data: RpcTxProof): TxProof {
    return {
        data: assertNotEmpty(data.data),
        root_hash: assertNotEmpty(data.root_hash),
        proof: {
            total: apiToSmallInt(assertNotEmpty(data.proof.total)),
            index: apiToSmallInt(assertNotEmpty(data.proof.index)),
            leaf_hash: assertNotEmpty(data.proof.leaf_hash),
            aunts: assertArray(data.proof.aunts).map(assertNotEmpty),
        },
    };
}

interface RpcTxSearchResponse {
    readonly txs: readonly RpcTxResponse[];
    readonly total_count: string;
}

function decodeTxSearch(data: RpcTxSearchResponse): TxSearchResponse {
    return {
        total_count: apiToSmallInt(assertNotEmpty(data.total_count)),
        txs: assertArray(data.txs).map(decodeTxResponse),
    };
}

function decodeTxResponse(data: RpcTxResponse): TxResponse {
    return {
        tx: assertNotEmpty(data.tx),
        hash: assertNotEmpty(data.hash),
        height: apiToSmallInt(assertNotEmpty(data.height)),
        index: apiToSmallInt(assertNumber(data.index)),
        result: decodeTxData(assertObject(data.tx_result)),
        proof: may(decodeTxProof, data.proof),
        tx_result: decodeTxData(assertObject(data.tx_result)),
    };
}

interface RpcValidatorsResponse {
    readonly block_height: string;
    readonly validators: readonly RpcValidatorInfo[];
    readonly count: string;
    readonly total: string;
}

function decodeValidators(data: RpcValidatorsResponse): ValidatorsResponse {
    return {
        block_height: apiToSmallInt(assertNotEmpty(data.block_height)),
        validators: assertArray(data.validators).map(decodeValidatorInfo),
        count: apiToSmallInt(assertNotEmpty(data.count)),
        total: apiToSmallInt(assertNotEmpty(data.total)),
    };
}

export class ResponsesDecoder {
    public static decodeHealth(): HealthResponse {
        return null;
    }

    public static decodeAbciInfo(
        response: JsonRpcResponseWithResult<AbciInfoResult>,
    ): AbciInfoResponse {
        return decodeAbciInfo(assertObject((response.result as AbciInfoResult).response));
    }

    public static decodeAbciQuery(
        response: JsonRpcResponseWithResult<AbciQueryResult>,
    ): AbciQueryResponse {
        return decodeAbciQuery(assertObject((response.result as AbciQueryResult).response));
    }

    public static decodeBlock(
        response: JsonRpcResponseWithResult<RpcBlockResponse>,
    ): BlockResponse {
        return decodeBlockResponse(response.result as RpcBlockResponse);
    }

    public static decodeBlockResults(
        response: JsonRpcResponseWithResult<RpcBlockResultsResponse>,
    ): BlockResultsResponse {
        return decodeBlockResults(response.result as RpcBlockResultsResponse);
    }

    public static decodeBlockSearch(
        response: JsonRpcResponseWithResult<RpcBlockSearchResponse>,
    ): BlockSearchResponse {
        return decodeBlockSearch(response.result as RpcBlockSearchResponse);
    }

    public static decodeBlockchain(
        response: JsonRpcResponseWithResult<RpcBlockchainResponse>,
    ): BlockchainResponse {
        return decodeBlockchain(response.result as RpcBlockchainResponse);
    }

    public static decodeBroadcastTxSync(
        response: JsonRpcResponseWithResult<RpcBroadcastTxSyncResponse>,
    ): BroadcastTxSyncResponse {
        return decodeBroadcastTxSync(response.result as RpcBroadcastTxSyncResponse);
    }

    public static decodeBroadcastTxAsync(
        response: JsonRpcResponseWithResult<RpcBroadcastTxSyncResponse>,
    ): BroadcastTxAsyncResponse {
        return ResponsesDecoder.decodeBroadcastTxSync(response);
    }

    public static decodeBroadcastTxCommit(
        response: JsonRpcResponseWithResult<RpcBroadcastTxCommitResponse>,
    ): BroadcastTxCommitResponse {
        return decodeBroadcastTxCommit(response.result as RpcBroadcastTxCommitResponse);
    }

    public static decodeCommit(
        response: JsonRpcResponseWithResult<RpcCommitResponse>,
    ): CommitResponse {
        return decodeCommitResponse(response.result as RpcCommitResponse);
    }

    public static decodeGenesis(
        response: JsonRpcResponseWithResult<GenesisResult>,
    ): GenesisResponse {
        return decodeGenesis(assertObject((response.result as GenesisResult).genesis));
    }

    public static decodeNumUnconfirmedTxs(
        response: JsonRpcResponseWithResult<RpcNumUnconfirmedTxsResponse>,
    ): NumUnconfirmedTxsResponse {
        return decodeNumUnconfirmedTxs(response.result as RpcNumUnconfirmedTxsResponse);
    }

    public static decodeStatus(
        response: JsonRpcResponseWithResult<RpcStatusResponse>,
    ): StatusResponse {
        return decodeStatus(response.result as RpcStatusResponse);
    }

    public static decodeNewBlockEvent(event: SubscriptionEvent): NewBlockEvent {
        return decodeBlock(event.data.value.block as RpcBlock);
    }

    public static decodeNewBlockHeaderEvent(event: SubscriptionEvent): NewBlockHeaderEvent {
        return decodeHeader(event.data.value.header as RpcHeader);
    }

    public static decodeTx(response: JsonRpcResponseWithResult<RpcTxResponse>): TxResponse {
        return decodeTxResponse(response.result as RpcTxResponse);
    }

    public static decodeTxSearch(
        response: JsonRpcResponseWithResult<RpcTxSearchResponse>,
    ): TxSearchResponse {
        return decodeTxSearch(response.result as RpcTxSearchResponse);
    }

    public static decodeValidators(
        response: JsonRpcResponseWithResult<RpcValidatorsResponse>,
    ): ValidatorsResponse {
        return decodeValidators(response.result as RpcValidatorsResponse);
    }
}

function decodeBlockchain(data: RpcBlockchainResponse): BlockchainResponse {
    return {
        last_height: apiToSmallInt(assertNotEmpty(data.last_height)),
        block_metas: assertArray(data.block_metas).map(decodeBlockMeta),
    };
}

function decodeBlockMeta(data: RpcBlockMeta): BlockMeta {
    return {
        block_id: decodeBlockId(data.block_id),
        block_size: apiToSmallInt(assertNotEmpty(data.block_size)),
        header: decodeHeader(data.header),
        num_txs: apiToSmallInt(assertNotEmpty(data.num_txs)),
    };
}

function decodeBlockVersion(data: RpcBlockVersion): Version {
    return {
        block: apiToSmallInt(data.block),
        app: apiToSmallInt(data.app ?? 0),
    };
}

export interface DateWithNanoseconds extends Date {
    /** Nanoseconds after the time stored in a vanilla Date (millisecond granularity) */
    nanoseconds?: number;
}

export function fromRfc3339WithNanoseconds(dateTimeString: string): DateWithNanoseconds {
    const out: DateWithNanoseconds = fromRfc3339(dateTimeString);
    const nanosecondsMatch = dateTimeString.match(/\.(\d+)Z$/);
    const nanoseconds = nanosecondsMatch ? nanosecondsMatch[1].slice(3) : '';
    out.nanoseconds = parseInt(nanoseconds.padEnd(6, '0'), 10);
    return out;
}

function decodeHeader(data: RpcHeader): Header {
    return {
        version: decodeBlockVersion(data.version),
        chain_id: assertNotEmpty(data.chain_id),
        height: apiToSmallInt(assertNotEmpty(data.height)),
        time: fromRfc3339WithNanoseconds(assertNotEmpty(data.time)),

        // When there is no last block ID (i.e. this block's height is 1), we get an empty structure like this:
        // { hash: '', parts: { total: 0, hash: '' } }
        last_block_id: data.last_block_id.hash ? decodeBlockId(data.last_block_id) : null,

        last_commit_hash: assertSet(data.last_commit_hash),
        data_hash: assertSet(data.data_hash),

        validators_hash: assertSet(data.validators_hash),
        next_validators_hash: assertSet(data.next_validators_hash),
        consensus_hash: assertSet(data.consensus_hash),
        app_hash: assertSet(data.app_hash),
        last_results_hash: assertSet(data.last_results_hash),

        evidence_hash: assertSet(data.evidence_hash),
        proposer_address: assertNotEmpty(data.proposer_address),
    };
}

function decodeBlockId(data: RpcBlockId): BlockId {
    return {
        hash: assertNotEmpty(data.hash),
        parts: {
            total: assertNotEmpty(data.parts.total),
            hash: assertNotEmpty(data.parts.hash),
        },
    };
}

function decodeAbciInfo(data: RpcAbciInfoResponse): AbciInfoResponse {
    return {
        response: {
            version: data.version,
            app_version: data.app_version,
            last_block_height: may(apiToSmallInt, data.last_block_height),
            last_block_app_hash: data.last_block_app_hash,
        },
    };
}

interface RpcAbciInfoResponse {
    readonly version: string;
    readonly app_version: string;
    readonly last_block_height?: string;
    /** base64 encoded */
    readonly last_block_app_hash?: string;
}
