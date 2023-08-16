import {ReadonlyDate} from "readonly-date";

export interface ReadonlyDateWithNanoseconds extends ReadonlyDate {
    readonly nanoseconds?: number;
}

export interface ValidatorEd25519Pubkey {
    readonly algorithm: "ed25519";
    readonly data: Uint8Array;
}

export interface ValidatorSecp256k1Pubkey {
    readonly algorithm: "secp256k1";
    readonly data: Uint8Array;
}

export type ValidatorPubkey = ValidatorEd25519Pubkey | ValidatorSecp256k1Pubkey;

export enum BlockIdFlag {
    Unknown = 0,
    Absent = 1,
    Commit = 2,
    Nil = 3,
    Unrecognized = -1,
}

export interface CommitSignature {
    block_id_flag: BlockIdFlag;
    validator_address: Uint8Array | undefined;
    timestamp: ReadonlyDateWithNanoseconds | undefined;
    signature: Uint8Array | undefined;
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

export interface AbciInfoResponse {
    readonly data?: string;
    readonly last_block_height?: number;
    readonly last_block_app_hash?: Uint8Array;
}

export interface ProofOp {
    readonly type: string;
    readonly key: Uint8Array;
    readonly data: Uint8Array;
}

export interface QueryProof {
    readonly ops: readonly ProofOp[];
}

export interface AbciQueryResponse {
    readonly key: Uint8Array;
    readonly value: Uint8Array;
    readonly proof?: QueryProof;
    readonly height?: number;
    readonly index?: number;
    readonly code?: number;
    readonly codespace: string;
    readonly log?: string;
    readonly info: string;
}

export interface BlockResponse {
    readonly block_id: BlockId;
    readonly block: Block;
}

export interface BlockResultsResponse {
    readonly height: number;
    readonly txs_results: readonly TxData[];
    readonly begin_block_events: readonly Event[];
    readonly end_block_events: readonly Event[];
    readonly validator_updates: readonly ValidatorUpdate[];
    readonly consensus_params_updates?: ConsensusParams;
}

export interface BlockSearchResponse {
    readonly blocks: readonly BlockResponse[];
    readonly total_count: number;
}

export interface BlockchainResponse {
    readonly last_height: number;
    readonly block_metas: readonly BlockMeta[];
}

/**
 * No transaction data in here because RPC method BroadcastTxAsync "returns right away, with no response"
 */
export interface BroadcastTxAsyncResponse {
    readonly hash: Uint8Array;
}

export interface BroadcastTxSyncResponse extends TxData {
    readonly hash: Uint8Array;
}

/**
 * Returns true iff transaction made it successfully into the transaction pool
 */
export function broadcastTxSyncSuccess(res: BroadcastTxSyncResponse): boolean {
    // code must be 0 on success
    return res.code === 0;
}

export interface BroadcastTxCommitResponse {
    readonly height: number;
    readonly hash: Uint8Array;
    readonly check_tx: TxData;
    readonly deliver_tx?: TxData;
}

/**
 * Returns true iff transaction made it successfully into a block
 * (i.e. success in `check_tx` and `deliver_tx` field)
 */
export function broadcastTxCommitSuccess(response: BroadcastTxCommitResponse): boolean {
    // code must be 0 on success
    // deliver_tx may be present but empty on failure
    return response.check_tx.code === 0 && !!response.deliver_tx && response.deliver_tx.code === 0;
}

export interface CommitResponse {
    readonly signed_header: SignedHeader;

}

export interface SignedHeader {
    readonly header: Header;
    readonly commit: Commit;
    readonly canonical: boolean;
}

export interface GenesisResponse {
    readonly genesis_time: ReadonlyDate;
    readonly chain_id: string;
    readonly consensus_params: ConsensusParams;
    readonly validators: readonly Validator[];
    readonly app_hash: Uint8Array;
    readonly app_state: Record<string, unknown> | undefined;
}

export interface GenesisChunkedResponse {
    chunk: string,
    total: string,
    data: string
}

export type HealthResponse = null;

export interface NumUnconfirmedTxsResponse {
    readonly total: number;
    readonly total_bytes: number;
}

export interface StatusResponse {
    readonly node_info: NodeInfo;
    readonly sync_info: SyncInfo;
    readonly validator_info: Validator;
}

/**
 * A transaction from RPC calls like search.
 *
 * Try to keep this compatible to TxEvent
 */
export interface TxResponse {
    readonly tx: Uint8Array;
    readonly hash: Uint8Array;
    readonly height: number;
    readonly index: number;
    readonly result: TxData;
    readonly proof?: TxProof;
}

export interface TxSearchResponse {
    readonly txs: readonly TxResponse[];
    readonly total_count: number;
}

export interface ValidatorsResponse {
    readonly block_height: number;
    readonly validators: readonly Validator[];
    readonly count: number;
    readonly total: number;
}

// Events

export interface NewBlockEvent extends Block {
}

export interface NewBlockHeaderEvent extends Header {
}

export interface TxEvent {
    readonly tx: Uint8Array;
    readonly hash: Uint8Array;
    readonly height: number;
    readonly result: TxData;
}

// Helper items used above

/**
 * An event attribute.
 *
 * In 0.35 the type of key and value was changed
 * from bytes to string, such that no base64 encoding is used anymore.
 */
export interface EventAttribute {
    readonly key: string;
    readonly value: string;
    readonly index: boolean;
}

export interface Event {
    readonly type: string;
    readonly attributes: readonly EventAttribute[];
}

export interface TxData {
    readonly code: number;
    readonly codespace?: string;
    readonly log?: string;
    readonly data?: Uint8Array;
    readonly events: readonly Event[];
    readonly gas_wanted: number;
    readonly gas_used: number;
}

export interface TxProof {
    readonly data: Uint8Array;
    readonly root_hash: Uint8Array;
    readonly proof: {
        readonly total: number;
        readonly index: number;
        readonly leaf_hash: Uint8Array;
        readonly aunts: readonly Uint8Array[];
    };
}

export interface BlockMeta {
    readonly block_id: BlockId;
    readonly block_size: number;
    readonly header: Header;
    readonly num_txs: number;
}

export interface BlockId {
    readonly hash: Uint8Array;
    readonly parts: {
        readonly total: number;
        readonly hash: Uint8Array;
    };
}

export interface Block {
    readonly header: Header;
    /**
     * For the block at height 1, last commit is not set.
     */
    readonly last_commit: Commit | null;
    readonly txs: readonly Uint8Array[];
    readonly evidence: readonly Evidence[];
}

/**
 * We lost track on how the evidence structure actually looks like.
 * This is any now and passed to the caller untouched.
 *
 * See also https://github.com/cosmos/cosmjs/issues/980.
 */
export type Evidence = any;

export interface Commit {
    readonly block_id: BlockId;
    readonly height: number;
    readonly round: number;
    readonly signatures: readonly CommitSignature[];
}

/**
 * raw values from https://github.com/tendermint/tendermint/blob/dfa9a9a30a666132425b29454e90a472aa579a48/types/vote.go#L44
 */
export enum VoteType {
    PreVote = 1,
    PreCommit = 2,
}

export interface Vote {
    readonly type: VoteType;
    readonly validator_address: Uint8Array;
    readonly validator_index: number;
    readonly height: number;
    readonly round: number;
    readonly timestamp: ReadonlyDate;
    readonly block_id: BlockId;
    readonly signature: Uint8Array;
}

export interface Version {
    readonly block: number;
    readonly app: number;
}

// https://github.com/tendermint/tendermint/blob/v0.31.8/docs/spec/blockchain/blockchain.md
export interface Header {
    // basic block info
    readonly version: Version;
    readonly chain_id: string;
    readonly height: number;
    readonly time: ReadonlyDateWithNanoseconds;

    /**
     * Block ID of the previous block. This can be `null` when the currect block is height 1.
     */
    readonly last_block_id: BlockId | null;

    /**
     * Hashes of block data.
     *
     * This is `sha256("")` for height 1 🤷‍
     */
    readonly last_commit_hash: Uint8Array;
    /**
     * This is `sha256("")` as long as there is no data 🤷‍
     */
    readonly data_hash: Uint8Array;

    // hashes from the app output from the prev block
    readonly validators_hash: Uint8Array;
    readonly next_validators_hash: Uint8Array;
    readonly consensus_hash: Uint8Array;
    /**
     * This can be an empty string for height 1 and turn into "0000000000000000" later on 🤷‍
     */
    readonly app_hash: Uint8Array;
    /**
     * This is `sha256("")` as long as there is no data 🤷‍
     */
    readonly last_results_hash: Uint8Array;

    // consensus info
    /**
     * This is `sha256("")` as long as there is no data 🤷‍
     */
    readonly evidence_hash: Uint8Array;
    readonly proposer_address: Uint8Array;
}

export interface NodeInfo {
    readonly id: Uint8Array;
    /** IP and port */
    readonly listen_addr: string;
    readonly network: string;
    /**
     * The Tendermint version. Can be empty (see https://github.com/cosmos/cosmos-sdk/issues/7963).
     */
    readonly version: string;
    readonly channels: string; // ???
    readonly moniker: string;
    readonly other: Map<string, string>;
    readonly protocol_version: {
        readonly p2p: number;
        readonly block: number;
        readonly app: number;
    };
}

export interface SyncInfo {
    readonly earliest_app_hash?: Uint8Array;
    readonly earliest_block_hash?: Uint8Array;
    readonly earliest_block_height?: number;
    readonly earliest_block_time?: ReadonlyDate;
    readonly latest_block_hash: Uint8Array;
    readonly latest_app_hash: Uint8Array;
    readonly latest_block_height: number;
    readonly latest_block_time: ReadonlyDate;
    readonly catching_up: boolean;
}

export interface Validator {
    readonly address: Uint8Array;
    readonly pubkey?: ValidatorPubkey;
    readonly voting_power: bigint;
    readonly proposer_priority?: number;
}

export interface ValidatorUpdate {
    readonly pubkey: ValidatorPubkey;
    readonly voting_power: bigint;
}

export interface ConsensusParams {
    readonly block: BlockParams;
    readonly evidence: EvidenceParams;
}

export interface BlockParams {
    readonly max_bytes: number;
    readonly max_gas: number;
}

export interface TxSizeParams {
    readonly max_bytes: number;
    readonly max_gas: number;
}

export interface BlockGossipParams {
    readonly block_part_size_bytes: number;
}

export interface EvidenceParams {
    readonly max_age_num_blocks: number;
    readonly max_age_duration: number;
}


// TODO : 상세히 작성해야됨
export interface NetInfoResponse {
    listening: boolean,
    listeners: [],
    n_peers: string,
    peers: []
}


// TODO : 재 작성
export interface DumpConsensusStateResponse {
    "round_state": {
        "height": string,
        "round": number,
        "step": number,
        "start_time": string,
        "commit_time": string,
        "validators": {
            "validators": [],
            "proposer": {
                "address": string,
                "pub_key": {
                    "type": string,
                    "value": string
                },
                "voting_power": string,
                "proposer_priority": string
            }
        },
        "locked_round": number,
        "valid_round": string,
        "votes": [],
        "commit_round": number,
        "last_commit": {
            "votes": [],
            "votes_bit_array": string,
            "peer_maj_23s": {}
        },
        "last_validators": {
            "validators": [],
            "proposer": {
                "address": string,
                "pub_key": {
                    "type": string,
                    "value": string
                },
                "voting_power": string,
                "proposer_priority": string
            }
        },
        "triggered_timeout_precommit": boolean
    },
    "peers": []
}

// TODO : 재 작성
export interface ConsensusStateResponse {
    "round_state": {
        "height/round/step": string,
        "start_time": string,
        "proposal_block_hash": string,
        "locked_block_hash": string,
        "valid_block_hash": string,
        "height_vote_set": [{
            "round": number,
            "prevotes": [],
            "prevotes_bit_array": string,
            "precommits": [],
            "precommits_bit_array": string
        }],
        "proposer": { "address": string, "index": number }
    }
}

// TODO : 재 작성
export interface UnconfirmedTxsResponse {
    "n_txs": string,
    "total": string,
    "total_bytes": string,
    "txs": []
}


export interface CheckTxResponse {
    code: string,
    data: string,
    log: string,
    info: string,
    gas_wanted: string,
    gas_used: string,
    events: [],
    codespace: string
}


export interface DelegateeResponse {
    "code": number,
    "log": string,
    "key": string
}


export interface RuleResponse {
    value: {
        version: string;
        maxValidatorCnt: string;
        minValidatorStake: string;
        rewardPerPower: string;
        lazyRewardBlocks: string;
        lazyApplyingBlocks: string;
        gasPrice: string;
        minTrxFee: string;
        minVotingPeriodBlocks: string;
        maxVotingPeriodBlocks: string;
        minSelfStakeRatio: string;
        maxUpdatableStakeRatio: string;
        slashRatio: string;
    };
}

export interface AccountResponse {
    key: string;
    value: {
        address: string;
        nonce: string;
        balance: string;
    };
}


export interface StakesResponse {
    key: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any;
}

export interface ProposalResponse {

}

export interface VmCallResponse {

}