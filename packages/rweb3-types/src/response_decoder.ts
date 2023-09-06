import { JsonRpcResponseWithResult } from './json_rpc_types.js';
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
} from './encodings.js';
import { SubscriptionEvent } from './subscription_event.js';
import * as responses from './responses.js';
import {
    Block,
    BlockId,
    BlockIdFlag,
    BlockMeta,
    BlockParams,
    BlockTxs,
    Commit,
    CommitSignature,
    ConsensusParams,
    DateWithNanoseconds,
    Event,
    EvidenceParams,
    Header,
    NewBlockEvent,
    NewBlockHeaderEvent,
    TxProof,
    ValidatorParams,
    ValidatorUpdate,
    Version,
    VersionParams,
} from './responses.js';
import { apiToSmallInt } from './inthelpers.js';
import assert from 'assert';

export class ResponsesDecoder {
    public static decodeHealth(): responses.HealthResponse {
        return null;
    }

    public static decodeNetInfo(
        response: JsonRpcResponseWithResult<responses.NetInfoResponse>,
    ): responses.NetInfoResponse {
        return assertObject(response.result);
    }

    public static decodeAbciInfo(
        response: JsonRpcResponseWithResult<AbciInfoResult>,
    ): responses.AbciInfoResponse {
        return decodeAbciInfo(assertObject((response.result as AbciInfoResult).response));
    }

    public static decodeAbciQuery(
        response: JsonRpcResponseWithResult<AbciQueryResult>,
    ): responses.AbciQueryResponse {
        return decodeAbciQuery(assertObject((response.result as AbciQueryResult).response));
    }

    public static decodeCheckTx(
        response: JsonRpcResponseWithResult<responses.CheckTxResponse>,
    ): responses.CheckTxResponse {
        return response.result as responses.CheckTxResponse;
    }

    public static decodeBlock(
        response: JsonRpcResponseWithResult<RpcBlockResponse>,
    ): responses.BlockResponse {
        return decodeBlockResponse(response.result as RpcBlockResponse);
    }

    public static decodeBlockByHash(
        response: JsonRpcResponseWithResult<RpcBlockResponse>,
    ): responses.BlockResponse {
        return decodeBlockResponse(response.result as RpcBlockResponse);
    }

    public static decodeBlockResults(
        response: JsonRpcResponseWithResult<RpcBlockResultsResponse>,
    ): responses.BlockResultsResponse {
        return decodeBlockResults(response.result as RpcBlockResultsResponse);
    }

    public static decodeBlockSearch(
        response: JsonRpcResponseWithResult<RpcBlockSearchResponse>,
    ): responses.BlockSearchResponse {
        return decodeBlockSearch(response.result as RpcBlockSearchResponse);
    }

    public static decodeBlockchain(
        response: JsonRpcResponseWithResult<RpcBlockchainResponse>,
    ): responses.BlockchainResponse {
        return decodeBlockchain(response.result as RpcBlockchainResponse);
    }

    public static decodeBroadcastTxSync(
        response: JsonRpcResponseWithResult<RpcBroadcastTxSyncResponse>,
    ): responses.BroadcastTxSyncResponse {
        return decodeBroadcastTxSync(response.result as RpcBroadcastTxSyncResponse);
    }

    public static decodeBroadcastTxAsync(
        response: JsonRpcResponseWithResult<RpcBroadcastTxSyncResponse>,
    ): responses.BroadcastTxAsyncResponse {
        return ResponsesDecoder.decodeBroadcastTxSync(response);
    }

    public static decodeBroadcastTxCommit(
        response: JsonRpcResponseWithResult<RpcBroadcastTxCommitResponse>,
    ): responses.BroadcastTxCommitResponse {
        return decodeBroadcastTxCommit(response.result as RpcBroadcastTxCommitResponse);
    }

    public static decodeCommit(
        response: JsonRpcResponseWithResult<RpcCommitResponse>,
    ): responses.CommitResponse {
        return decodeCommitResponse(response.result as RpcCommitResponse);
    }

    public static decodeGenesis(
        response: JsonRpcResponseWithResult<GenesisResult>,
    ): responses.GenesisResponse {
        return decodeGenesis(assertObject((response.result as GenesisResult).genesis));
    }

    public static decodeGenesisChunked(
        response: JsonRpcResponseWithResult<responses.GenesisChunkedResponse>,
    ): responses.GenesisChunkedResponse {
        return response.result as responses.GenesisChunkedResponse;
    }

    public static decodeDumpConsensusState(
        response: JsonRpcResponseWithResult<responses.DumpConsensusStateResponse>,
    ): responses.DumpConsensusStateResponse {
        return response.result as responses.DumpConsensusStateResponse;
    }

    public static decodeConsensusState(
        response: JsonRpcResponseWithResult<responses.ConsensusStateResponse>,
    ): responses.ConsensusStateResponse {
        return response.result as responses.ConsensusStateResponse;
    }

    public static decodeConsensusParams(
        response: JsonRpcResponseWithResult<responses.ConsensusParamsResponse>,
    ): responses.ConsensusParamsResponse {
        return response.result as responses.ConsensusParamsResponse;
    }

    public static decodeUnconfirmedTxs(
        response: JsonRpcResponseWithResult<responses.UnconfirmedTxsResponse>,
    ): responses.UnconfirmedTxsResponse {
        return response.result as responses.UnconfirmedTxsResponse;
    }

    public static decodeNumUnconfirmedTxs(
        response: JsonRpcResponseWithResult<RpcNumUnconfirmedTxsResponse>,
    ): responses.NumUnconfirmedTxsResponse {
        return decodeNumUnconfirmedTxs(response.result as RpcNumUnconfirmedTxsResponse);
    }

    public static decodeStatus(
        response: JsonRpcResponseWithResult<RpcStatusResponse>,
    ): responses.StatusResponse {
        return decodeStatus(response.result as RpcStatusResponse);
    }

    public static decodeNewBlockEvent(event: SubscriptionEvent): NewBlockEvent {
        return decodeBlock(event.data.value.block as RpcBlock);
    }

    public static decodeNewBlockHeaderEvent(event: SubscriptionEvent): NewBlockHeaderEvent {
        return decodeHeader(event.data.value.header as RpcHeader);
    }

    public static decodeTx(
        response: JsonRpcResponseWithResult<RpcTxResponse>,
    ): responses.TxResponse {
        return decodeTxResponse(response.result as RpcTxResponse);
    }

    public static decodeTxSearch(
        response: JsonRpcResponseWithResult<RpcTxSearchResponse>,
    ): responses.TxSearchResponse {
        return decodeTxSearch(response.result as RpcTxSearchResponse);
    }

    public static decodeValidators(
        response: JsonRpcResponseWithResult<RpcValidatorsResponse>,
    ): responses.ValidatorsResponse {
        return decodeValidators(response.result as RpcValidatorsResponse);
    }

    public static decodeDelegatee(
        response: JsonRpcResponseWithResult<responses.DelegateeResponse>,
    ): responses.DelegateeResponse {
        return response.result as responses.DelegateeResponse;
    }

    public static decodeRule(
        response: JsonRpcResponseWithResult<responses.RuleResponse>,
    ): responses.RuleResponse {
        return response.result as responses.RuleResponse;
    }

    public static decodeAccount(
        response: JsonRpcResponseWithResult<RpcAccountResponse>,
    ): responses.AccountResponse {
        return decodeAccount(response.result as RpcAccountResponse);
    }

    public static decodeStakes(
        response: JsonRpcResponseWithResult<responses.StakesResponse>,
    ): responses.StakesResponse {
        return response.result as responses.StakesResponse;
    }

    public static decodeVmCall(
        response: JsonRpcResponseWithResult<responses.VmCallResponse>,
    ): responses.VmCallResponse {
        return response.result as responses.VmCallResponse;
    }
}

export function fromRfc3339WithNanoseconds(dateTimeString: string): DateWithNanoseconds {
    const out: DateWithNanoseconds = fromRfc3339(dateTimeString);
    const nanosecondsMatch = dateTimeString.match(/\.(\d+)Z$/);
    const nanoseconds = nanosecondsMatch ? nanosecondsMatch[1].slice(3) : '';
    out.nanoseconds = parseInt(nanoseconds.padEnd(6, '0'), 10);
    return out;
}

function decodeBlockchain(data: RpcBlockchainResponse): responses.BlockchainResponse {
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
        app: data.app ?? '0',
    };
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

function decodeAbciInfo(data: RpcAbciInfoResponse): responses.AbciInfoResponse {
    return {
        response: {
            version: data.version,
            app_version: data.app_version,
            last_block_height: may(apiToSmallInt, data.last_block_height),
            last_block_app_hash: data.last_block_app_hash,
        },
    };
}

function decodeAccount(data: RpcAccountResponse): responses.AccountResponse {
    return {
        key: assertNotEmpty(data.key),
        value: {
            address: assertNotEmpty(data.value.address),
            nonce: apiToSmallInt(assertNotEmpty(data.value.nonce)),
            balance: assertNotEmpty(data.value.balance),
        },
    };
}

function decodeCommitResponse(data: RpcCommitResponse): responses.CommitResponse {
    return {
        canonical: assertBoolean(data.canonical),
        signed_header: {
            header: decodeHeader(data.signed_header.header),
            commit: decodeCommit(data.signed_header.commit),
            canonical: assertBoolean(data.canonical),
        },
    };
}

export function decodeValidatorGenesis(data: RpcValidatorGenesis): responses.Validator {
    return {
        address: assertNotEmpty(data.address),
        pub_key: {
            type: 'tendermint/PubKeyEd25519',
            value: assertNotEmpty(data.pub_key),
        },
        power: assertNotEmpty(data.power),
        name: data.name,
    };
}

function decodeGenesis(data: RpcGenesisResponse): responses.GenesisResponse {
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

function decodeNumUnconfirmedTxs(
    data: RpcNumUnconfirmedTxsResponse,
): responses.NumUnconfirmedTxsResponse {
    return {
        n_txs: apiToSmallInt(assertNotEmpty(data.n_txs)),
        total: apiToSmallInt(assertNotEmpty(data.total)),
        total_bytes: apiToSmallInt(assertNotEmpty(data.total_bytes)),
        txs: data.txs ? assertArray(data.txs).map(decodeTxData) : [],
    };
}

function decodeNodeInfo(data: RpcNodeInfo): responses.NodeInfo {
    return {
        id: assertNotEmpty(data.id),
        listen_addr: assertNotEmpty(data.listen_addr),
        network: assertNotEmpty(data.network),
        version: assertString(data.version), // Can be empty (https://github.com/cosmos/cosmos-sdk/issues/7963)
        channels: assertNotEmpty(data.channels),
        moniker: assertNotEmpty(data.moniker),
        other: dictionaryToStringMap(data.other),
        protocol_version: {
            app: assertNotEmpty(data.protocol_version.app),
            block: apiToSmallInt(assertNotEmpty(data.protocol_version.block)),
            p2p: apiToSmallInt(assertNotEmpty(data.protocol_version.p2p)),
        },
    };
}

function decodeSyncInfo(data: RpcSyncInfo): responses.SyncInfo {
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

export function decodeValidatorInfo(data: RpcValidatorInfo): responses.Validator {
    return {
        pub_key: {
            type: 'tendermint/PubKeyEd25519',
            value: assertNotEmpty(data.pub_key),
        },
        power: assertNotEmpty(data.voting_power),
        address: assertNotEmpty(data.address),
        name: data.name,
    };
}

function decodeStatus(data: RpcStatusResponse): responses.StatusResponse {
    return {
        node_info: decodeNodeInfo(data.node_info),
        sync_info: decodeSyncInfo(data.sync_info),
        validator_info: decodeValidatorInfo(data.validator_info),
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

function decodeTxSearch(data: RpcTxSearchResponse): responses.TxSearchResponse {
    return {
        total_count: apiToSmallInt(assertNotEmpty(data.total_count)),
        txs: assertArray(data.txs).map(decodeTxResponse),
    };
}

function decodeTxResponse(data: RpcTxResponse): responses.TxResponse {
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

function decodeValidators(data: RpcValidatorsResponse): responses.ValidatorsResponse {
    return {
        block_height: apiToSmallInt(assertNotEmpty(data.block_height)),
        validators: assertArray(data.validators).map(decodeValidatorInfo),
        count: apiToSmallInt(assertNotEmpty(data.count)),
        total: apiToSmallInt(assertNotEmpty(data.total)),
    };
}

function decodeBlockResponse(data: RpcBlockResponse): responses.BlockResponse {
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

export function decodeValidatorUpdate(data: RpcValidatorUpdate): ValidatorUpdate {
    return {
        pubkey: assertObject(data.pub_key),
        voting_power: data.power ?? '0',
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

function decodeBlockResults(data: RpcBlockResultsResponse): responses.BlockResultsResponse {
    return {
        height: apiToSmallInt(assertNotEmpty(data.height)),
        txs_results: (data.txs_results || []).map(decodeTxData),
        validator_updates: (data.validator_updates || []).map(decodeValidatorUpdate),
        consensus_params_updates: may(decodeConsensusParams, data.consensus_param_updates),
        begin_block_events: decodeEvents(data.begin_block_events || []),
        end_block_events: decodeEvents(data.end_block_events || []),
    };
}

function decodeBlockSearch(data: RpcBlockSearchResponse): responses.BlockSearchResponse {
    return {
        total_count: apiToSmallInt(assertNotEmpty(data.total_count)),
        blocks: assertArray(data.blocks).map(decodeBlockResponse),
    };
}

function decodeBroadcastTxSync(
    data: RpcBroadcastTxSyncResponse,
): responses.BroadcastTxSyncResponse {
    return {
        ...decodeTxData(data),
        hash: assertNotEmpty(data.hash),
    };
}

function decodeBroadcastTxCommit(
    data: RpcBroadcastTxCommitResponse,
): responses.BroadcastTxCommitResponse {
    return {
        height: apiToSmallInt(data.height),
        hash: assertNotEmpty(data.hash),
        check_tx: decodeTxData(assertObject(data.check_tx)),
        deliver_tx: may(decodeTxData, data.deliver_tx),
    };
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

function decodeAbciQuery(data: RpcAbciQueryResponse): responses.AbciQueryResponse {
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

import { HexString } from './primitives_types.js';
import { EventAttribute, QueryProof, TxData } from './responses.js';
import { fromRfc3339 } from './rfc3339.js';

interface RpcAbciInfoResponse {
    readonly version: string;
    readonly app_version: string;
    readonly last_block_height?: string;
    /** base64 encoded */
    readonly last_block_app_hash?: string;
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

interface RpcTxSearchResponse {
    readonly txs: readonly RpcTxResponse[];
    readonly total_count: string;
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

interface RpcBroadcastTxSyncResponse extends RpcTxData {
    /** hex encoded */
    readonly hash: string;
}

interface RpcBroadcastTxCommitResponse {
    readonly height: string;
    /** hex encoded */
    readonly hash: string;
    readonly check_tx: RpcTxData;
    readonly deliver_tx?: RpcTxData;
}

interface RpcBlockSearchResponse {
    readonly blocks: readonly RpcBlockResponse[];
    readonly total_count: string;
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

interface RpcBlockResponse {
    readonly block_id: RpcBlockId;
    readonly block: RpcBlock;
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

interface RpcAccountResponse {
    readonly key: string;
    readonly value: {
        address: string;
        nonce: string;
        balance: string;
    };
}

interface RpcValidatorsResponse {
    readonly block_height: string;
    readonly validators: readonly RpcValidatorInfo[];
    readonly count: string;
    readonly total: string;
}

interface RpcNumUnconfirmedTxsResponse {
    readonly total: string;
    readonly total_bytes: string;
    readonly n_txs: string;
    readonly txs: readonly RpcTxData[];
}

interface AbciQueryResult {
    readonly response: RpcAbciQueryResponse;
}

interface GenesisResult {
    readonly genesis: RpcGenesisResponse;
}

interface AbciInfoResult {
    readonly response: RpcAbciInfoResponse;
}
