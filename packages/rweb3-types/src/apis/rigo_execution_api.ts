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

import {HexString} from '../primitives_types.js';
import {
    AddressBase,
    StakeValue,
    Transaction,
    Rule,
    AbciInfo,
    ResponseData,
    BlockResult,
    Blockcahin,
    CheckTx,
    ConsensusState,
    Delegatee,
    DumpConsensusState, Genesis, GenesisChunked, NetInfo, NumUnconfirmedTxs, TxSearch, UnconfirmedTxs
} from '../rigo_types';

import * as responses from "../responses";

export type AddressAPI = AddressBase<HexString>;

/* eslint-disable camelcase */
export type RigoExecutionAPI = {

    abci_info: () => ResponseData<AbciInfo>;
    account: (addr: string) => AddressAPI;
    block: (height: string) => responses.BlockResponse;
    block_by_hash: (hash: string) => responses.Block;
    block_results: (height: string) => BlockResult;
    block_search: (query: string, page: string, per_page: string, order_by: string) => responses.BlockSearchResponse;
    blockchain: (minHeight: string, maxHeight: string) => Blockcahin;
    broadcast_evidence: (evidence: string) => ResponseData<null>;
    broadcast_tx_async: (tx: string) => ResponseData<null>;
    check_tx: (tx: string) => CheckTx;
    commit: (height: string) => responses.Commit;
    consensus_params: (height: string) => responses.ConsensusParams;
    consensus_state: () => ConsensusState;
    delegatee: (addr: string) => Delegatee;
    dump_consensus_state: () => DumpConsensusState;
    genesis: () => Genesis;
    genesis_chunked: () => GenesisChunked;
    net_info: () => NetInfo;
    num_unconfirmed_txs: () => NumUnconfirmedTxs;
    // TODO :  proposal: (proposalId: string) => Proposal; 필요함
    rule: () => Rule;
    stakes: (addr: string) => StakeValue;
    tx: (txhash: string) => Transaction;
    tx_search: (query: string, prove: boolean, page: string, per_page: string, order_by: string) => TxSearch;
    validators: (height: string) => responses.ValidatorsResponse;
    unconfirmed_txs: (limit: string) => UnconfirmedTxs;

};
