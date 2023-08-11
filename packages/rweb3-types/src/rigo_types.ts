/*
    Copyright 2023 All Rigo Chain Developers

    Licensed under the Apache License, Version 2.0 (the License);
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an AS IS BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/

import {HexString, Numbers} from './primitives_types.js';

export type ValueTypes = 'address' | 'bool' | 'string' | 'int256' | 'uint256' | 'bytes' | 'bigint';
// Hex encoded 32 bytes
export type HexString32Bytes = HexString;
// Hex encoded 16 bytes
export type HexString16Bytes = HexString;
// Hex encoded 8 bytes
export type HexString8Bytes = HexString;
// Hex encoded 1 byte
export type HexStringSingleByte = HexString;
// Hex encoded 1 byte
export type HexStringBytes = HexString;
// Hex encoded 256 byte
export type HexString256Bytes = HexString;
// Hex encoded unsigned integer
export type Uint = HexString;
// Hex encoded unsigned integer 32 bytes
export type Uint256 = HexString;
// Hex encoded address
export type Address = HexString;

export type Topic = HexString32Bytes;

export type TransactionHash = HexString;
export type Uncles = HexString32Bytes[];

export enum BlockTags {
    EARLIEST = 'earliest',
    LATEST = 'latest',
    PENDING = 'pending',
    SAFE = 'safe',
    FINALIZED = 'finalized',
}

export type BlockTag = `${BlockTags}`;

export type BlockNumberOrTag = Numbers | BlockTag;

export interface Proof {
    readonly address: HexString;
    readonly nonce: string;
    readonly balance: string;
}

export interface TransactionInput {
    readonly [key: string]: unknown;

    readonly to?: HexString; // If its a contract creation tx then no address wil be specified.
    readonly from?: HexString;
    readonly data?: string;
    readonly input?: string;
    readonly gas: HexString;
    readonly gasLimit?: string;
    readonly gasPrice?: string;
    readonly maxPriorityFeePerGas?: string;
    readonly maxFeePerGas?: string;
    readonly nonce: string;
    readonly value: string;
    readonly blockNumber?: HexString;
    readonly transactionIndex?: HexString;
    readonly type?: HexString;
    readonly chainId?: HexString;
}

export type TransactionOutput = {
    readonly [key: string]: unknown;
    readonly to?: HexString; // If its a contract creation tx then no address wil be specified.
    readonly from?: HexString;
    readonly input: string;
    readonly gas?: Numbers;
    readonly gasLimit?: string;
    readonly nonce: Numbers;
    readonly value: Numbers;
    readonly blockNumber?: Numbers;
    readonly transactionIndex?: Numbers;
} & (
    | { maxPriorityFeePerGas: Numbers; maxFeePerGas: Numbers; gasPrice?: never }
    | { maxPriorityFeePerGas?: never; maxFeePerGas?: never; gasPrice: Numbers }
    );

export interface LogsInput {
    readonly blockHash?: HexString;
    readonly transactionHash?: HexString;
    readonly logIndex?: HexString;
    readonly id?: string;
    readonly blockNumber?: HexString;
    readonly transactionIndex?: HexString;
    readonly address: HexString;
    readonly topics: HexString[];
    readonly data: HexString;
}

export interface LogsOutput {
    readonly id?: string;
    readonly removed: boolean;
    readonly logIndex?: Numbers;
    readonly transactionIndex?: Numbers;
    readonly transactionHash?: HexString32Bytes;
    readonly blockHash?: HexString32Bytes;
    readonly blockNumber?: Numbers;
    readonly address: string;
    readonly topics: HexString[];
    readonly data: HexString;
}

export interface BlockInput {
    readonly gasLimit: HexString;
    readonly gasUsed: HexString;
    readonly size: HexString;
    readonly timestamp: HexString;
    readonly number?: HexString;
    readonly difficulty?: HexString;
    readonly totalDifficulty?: HexString;
    readonly transactions?: TransactionInput[];
    readonly miner?: HexString;
    readonly baseFeePerGas?: HexString;
}

export interface BlockOutput {
    readonly gasLimit: bigint | number;
    readonly gasUsed: bigint | number;
    readonly size: bigint | number;
    readonly timestamp: bigint | number;
    readonly number?: bigint | number;
    readonly difficulty?: bigint | number;
    readonly totalDifficulty?: bigint | number;
    readonly transactions?: TransactionOutput[];
    readonly miner?: HexString;
    readonly baseFeePerGas?: bigint | number;
    readonly parentHash?: HexString32Bytes;
}

export interface BlockHeaderOutput {
    readonly gasLimit: Numbers;
    readonly gasUsed: Numbers;
    readonly timestamp: Numbers;
    readonly number?: Numbers;
    readonly difficulty?: Numbers;
    readonly totalDifficulty?: Numbers;
    readonly transactions?: TransactionOutput[];
    readonly miner?: HexString;
    readonly baseFeePerGas?: Numbers;
    readonly parentHash?: HexString32Bytes;
    readonly sha3Uncles: HexString32Bytes[];
}

export interface ReceiptInput {
    readonly [x: string]: unknown;

    readonly blockNumber?: HexString;
    readonly transactionIndex?: HexString;
    readonly cumulativeGasUsed: HexString;
    readonly gasUsed: HexString;
    readonly logs?: LogsInput[];
    readonly contractAddress?: HexString;
    readonly status?: string;
    readonly effectiveGasPrice?: HexString;
}

export interface ReceiptOutput {
    readonly blockNumber?: bigint | number;
    readonly transactionIndex?: bigint | number;
    readonly cumulativeGasUsed: bigint | number;
    readonly gasUsed: bigint | number;
    readonly logs?: LogsOutput[];
    readonly contractAddress?: HexString;
    readonly status: boolean;
    readonly effectiveGasPrice?: bigint | number;
}

export interface PostInput {
    readonly ttl?: HexString;
    readonly workToProve?: HexString;
    readonly priority?: HexString;
    readonly expiry?: HexString;
    readonly sent?: HexString;
    readonly workProved?: HexString;
    readonly topics?: HexString[];
}

export interface PostOutput {
    readonly ttl?: bigint | number;
    readonly workToProve?: bigint | number;
    readonly priority?: bigint | number;
    readonly expiry?: bigint | number;
    readonly sent?: bigint | number;
    readonly workProved?: bigint | number;
    readonly topics?: string[];
}

export interface SyncInput {
    readonly startingBlock: HexString;
    readonly currentBlock: HexString;
    readonly highestBlock: HexString;
    readonly knownStates?: HexString;
    readonly pulledStates?: HexString;
}

export interface SyncOutput {
    readonly startingBlock: Numbers;
    readonly currentBlock: Numbers;
    readonly highestBlock: Numbers;
    readonly knownStates?: Numbers;
    readonly pulledStates?: Numbers;
}

export type Receipt = Record<string, unknown>;

type FilterOption = Record<string, Numbers | Numbers[] | boolean | boolean[]>;

// https://github.com/ethereum/execution-apis/blob/main/src/schemas/filter.json#L28
export interface Filter {
    readonly fromBlock?: BlockNumberOrTag;
    readonly toBlock?: BlockNumberOrTag;
    readonly address?: Address | Address[];
    readonly blockHash?: Address;
    // Using null type intentionally to match specifications
    // eslint-disable-next-line @typescript-eslint/ban-types
    readonly topics?: (null | Topic | Topic[])[];
    readonly filter?: FilterOption;
}

export interface AccessListEntry {
    readonly address?: Address;
    readonly storageKeys?: HexString32Bytes[];
}

export type AccessList = AccessListEntry[];

export type AccessListResult = {
    readonly accessList?: AccessList;
    readonly gasUsed?: Numbers;
};

export type ValidChains = 'goerli' | 'kovan' | 'mainnet' | 'rinkeby' | 'ropsten' | 'sepolia';

// This list of hardforks is expected to be in order
// keep this in mind when making changes to it
export enum HardforksOrdered {
    chainstart = 'chainstart',
    frontier = 'frontier',
    homestead = 'homestead',
    dao = 'dao',
    tangerineWhistle = 'tangerineWhistle',
    spuriousDragon = 'spuriousDragon',
    byzantium = 'byzantium',
    constantinople = 'constantinople',
    petersburg = 'petersburg',
    istanbul = 'istanbul',
    muirGlacier = 'muirGlacier',
    berlin = 'berlin',
    london = 'london',
    altair = 'altair',
    arrowGlacier = 'arrowGlacier',
    grayGlacier = 'grayGlacier',
    bellatrix = 'bellatrix',
    merge = 'merge',
    capella = 'capella',
    shanghai = 'shanghai',
}

export type Hardfork = `${HardforksOrdered}`;

export interface LogBase<NumberType, ByteType> {
    readonly removed?: boolean;
    readonly logIndex?: NumberType;
    readonly transactionIndex?: NumberType;
    readonly transactionHash?: ByteType;
    readonly blockHash?: ByteType;
    readonly blockNumber?: NumberType;
    readonly address?: Address;
    readonly data?: ByteType;
    readonly topics?: ByteType[];
    readonly id?: string;
}

export interface Log extends LogBase<Numbers, any> {
    readonly id?: string;
}

export interface TransactionReceiptBase<numberType, hashByteType, logsBloomByteType, logsType> {
    readonly transactionHash: hashByteType;
    readonly transactionIndex: numberType;
    readonly blockHash: hashByteType;
    readonly blockNumber: numberType;
    readonly from: Address;
    readonly to: Address;
    readonly cumulativeGasUsed: numberType;
    readonly gasUsed: numberType;
    readonly effectiveGasPrice?: numberType;
    readonly contractAddress?: Address;
    readonly logs: logsType[];
    readonly logsBloom: logsBloomByteType;
    readonly root: hashByteType;
    readonly status: numberType;
    readonly type?: numberType;
}

export type TransactionReceipt = TransactionReceiptBase<Numbers, any, any, Log>;

export interface CustomChain {
    name?: string;
    networkId: Numbers;
    chainId: Numbers;
}

export interface Common {
    customChain: CustomChain;
    baseChain?: ValidChains;
    hardfork?: Hardfork;
}


export interface ResponseData<Base> {
    response: Base
}

export interface AbciInfo {
    version: string;
    app_version: string;
    last_block_height: string;
    last_block_app_hash: string;
}


export interface AddressBase<AddressType> {
    key: AddressType;
    value: {
        address: AddressType;
        nonce: string;
        balance: string;
    };
}

export interface Validators {
    block_height: string;
    validators: Validator[];
    count: string;
    total: string;
}

export interface Validator {
    address: Address;
    pub_key: []; // TODO : pub_key type
    voting_power: string;
    proposer_priority: string;
}

export interface StakeValue {
    key: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any;
}

export interface Transaction {
    hash: TransactionHash;
    height: string;
    index: Numbers;
    tx_result: {
        code: Numbers;
        data: string;
        log: string;
        info: string;
        gas_wanted: string;
        gas_used: string;
        events: [];
        codespace: string;
    };
    tx: string;
    proof: {
        root_hash: string;
        data: string;
        proof: {
            total: string;
            index: string;
            leaf_hash: string;
            aunts: [];
        };
    };
}

export interface Block {
    block_id: {
        hash: string;
        parts: {
            total: Numbers;
            hash: string;
        };
    };
    block: {
        header: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            version: any;
            chain_id: string;
            height: string;
            time: string;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            last_block_id: any;
            last_commit_hash: string;
            data_hash: string;
            validators_hash: string;
            next_validators_hash: string;
            consensus_hash: string;
            app_hash: string;
            last_results_hash: string;
            evidence_hash: string;
            proposer_address: Address;
        };
        data: {
            txs: [];
        };
        evidence: {
            evidence: [];
        };
        last_commit: {
            height: string;
            round: Numbers;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            block_id: any;
            signatures: [];
        };
    };
}

export interface BlockResult {
    height: string,
    txs_results: [],
    begin_block_events: [],
    end_block_events: [],
    validator_updates: [],
    consensus_params_updates: {
        block: {
            max_bytes: string,
            max_gas: string,
            time_iota_ms: string
        },
        evidence: {
            max_age: string
        },
        validator: {
            pub_key_types: string[]
        }
    }
}

export interface BlockSearch {
    blocks: Block[];
    total_count: string;
}


export interface Blockcahin {
    last_height: string,
    block_metas: []
}


export interface CheckTx {
    code: string,
    data: string,
    log: string,
    info: string,
    gas_wanted: string,
    gas_used: string,
    events: [],
    codespace: string
}

export interface Commit {
    "signed_header": {
        "header": {
            "version": { "block": string, "app": string },
            "chain_id": string,
            "height": string,
            "time": string,
            "last_block_id": { "hash": string, "parts": { "total": number, "hash": string } },
            "last_commit_hash": string,
            "data_hash": string,
            "validators_hash": string,
            "next_validators_hash": string,
            "consensus_hash": string,
            "app_hash": string,
            "last_results_hash": string,
            "evidence_hash": string,
            "proposer_address": string
        },
        "commit": {
            "height": string,
            "round": number,
            "block_id": {
                "hash": string,
                "parts": { "total": number, "hash": string }
            },
            "signatures": [{
                "block_id_flag": number,
                "validator_address": string,
                "timestamp": string,
                "signature": string
            }]
        }
    },
    "canonical": boolean
}


export interface ConsensusParams {
    "block_height": string,
    "consensus_params": {
        "block": { "max_bytes": string, "max_gas": string, "time_iota_ms": string },
        "evidence": { "max_age_num_blocks": string, "max_age_duration": string, "max_bytes": string },
        "validator": { "pub_key_types": [] },
        "version": { "app_version": string }
    }
}

export interface ConsensusState {
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


export interface Delegatee {
    "code": number,
    "log": string,
    "key": string
}

export interface DumpConsensusState {
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

export interface Genesis {

    "genesis": {
        "genesis_time": string,
        "chain_id": string,
        "initial_height": string,
        "consensus_params": {
            "block": { "max_bytes": string, "max_gas": string, "time_iota_ms": string },
            "evidence": {
                "max_age_num_blocks": string,
                "max_age_duration": string,
                "max_bytes": string
            },
            "validator": { "pub_key_types": [] },
            "version": { "app_version": string }
        },
        "validators": [{
            "address": string,
            "pub_key": {
                "type": string,
                "value": string
            },
            "power": string,
            "name": string
        }],
        "app_hash": string,
        "app_state": {
            "assetHolders": [{
                "address": string,
                "balance": string
            }],
            "govRule": {
                "version": string,
                "maxValidatorCnt": string,
                "minValidatorStake": string,
                "rewardPerPower": string,
                "lazyRewardBlocks": string,
                "lazyApplyingBlocks": string,
                "gasPrice": string,
                "minTrxFee": string,
                "minVotingPeriodBlocks": string,
                "maxVotingPeriodBlocks": string,
                "minSelfStakeRatio": string,
                "maxUpdatableStakeRatio": string,
                "slashRatio": string
            }
        }
    }
}


export interface GenesisChunked {
    chunk: string,
    total: string,
    data: string
}

export interface NetInfo {
    "listening": boolean,
    "listeners": [],
    "n_peers": string,
    "peers": []
}

export interface NumUnconfirmedTxs {
    "n_txs": string,
    "total": string,
    "total_bytes": string,
    "txs": any[]
}


export interface Rule {
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

export interface TxSearch {
    txs: [];
    total_count: string;
}


export interface UnconfirmedTxs {
    "n_txs": string,
    "total": string,
    "total_bytes": string,
    "txs": []
}