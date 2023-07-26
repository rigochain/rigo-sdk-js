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

import { HexString, Numbers } from './primitives_types.js';

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

export interface AddressBase<AddressType> {
    key: AddressType;
    value: {
        address: AddressType;
        nonce: Numbers;
        balance: Numbers;
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
