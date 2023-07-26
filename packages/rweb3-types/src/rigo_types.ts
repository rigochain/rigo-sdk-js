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


import {Bytes, HexString, Numbers} from './primitives_types.js';
import {AccessList, Common, Hardfork, ValidChains} from "./eth_types";

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


//
// {
// 	key: 'DF976A96545DAD0E0B14FED615587A89BA980B84',
// 		value: {
// 	address: 'DF976A96545DAD0E0B14FED615587A89BA980B84',
// 		nonce: '0',
// 		balance: '0'
// }
// }
export interface AddressBase<AddressType> {
    key: AddressType;
    value: {
        address: AddressType;
        nonce: Numbers;
        balance: Numbers;
    }
}

// {
//      *   block_height: '1153',
//      *   validators: [
//      *     {
//      *       address: '735DC3FC8BCCFD7810BCC14DB49234C1BCE7758B',
//      *       pub_key: [Object],
//      *       voting_power: '91000010',
//      *       proposer_priority: '0'
//      *     }
//      *   ],
//      *   count: '1',
//      *   total: '1'
//      * }

export interface Validators {
    block_height: String;
    validators: Validator[];
    count: String;
    total: String;
}


export interface Validator {
    address: Address;
    pub_key: [];    // TODO : pub_key type
    voting_power: String;
    proposer_priority: String;
}

export interface StakeValue {
    key: String;
    value: Object;
}

export interface Transaction {

    hash: TransactionHash;
    height: String;
    index: Numbers;
    tx_result: {
        code: Numbers;
        data: String;
        log: String;
        info: String;
        gas_wanted: String;
        gas_used: String;
        events: [];
        codespace: String;
    },
    tx: String;
    proof: {
        root_hash: String;
        data: String;
        proof: {
            total: String;
            index: String;
            leaf_hash: String;
            aunts: [];
        }
    }
}

export interface Block {
    block_id: {
        hash: String;
        parts: {
            total: Numbers;
            hash: String;
        }
    },
    block: {
        header: {
            version: Object;
            chain_id: String;
            height: String;
            time: String;
            last_block_id: Object;
            last_commit_hash: String;
            data_hash: String;
            validators_hash: String;
            next_validators_hash: String;
            consensus_hash: String;
            app_hash: String;
            last_results_hash: String;
            evidence_hash: String;
            proposer_address: Address;

        },
        data: {
            txs: []
        },
        evidence: {
            evidence: []
        },
        last_commit: {
            height: String;
            round: Numbers;
            block_id: Object;
            signatures: []
        }
    }
}

export interface Rule {
    value: {
        version: String;
        maxValidatorCnt: String;
        minValidatorStake: String;
        rewardPerPower: String;
        lazyRewardBlocks: String;
        lazyApplyingBlocks: String;
        gasPrice: String;
        minTrxFee: String;
        minVotingPeriodBlocks: String;
        maxVotingPeriodBlocks: String;
        minSelfStakeRatio: String;
        maxUpdatableStakeRatio: String;
        slashRatio: String;
    }
}