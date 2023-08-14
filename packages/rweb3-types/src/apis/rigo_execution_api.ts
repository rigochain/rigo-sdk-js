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
    CheckTx,
    Delegatee,
    NumUnconfirmedTxs,
    TxSearch,
} from '../rigo_types';

import * as responses from "../responses";
import {TxSearchResponse} from "../responses";

export type AddressAPI = AddressBase<HexString>;

/* eslint-disable camelcase */
export type RigoExecutionAPI = {

    // start tendermint apis
    health: () => void;
    status: () => responses.StatusResponse;
    net_info: () => responses.NetInfoResponse;
    blockchain: (minHeight?: string | number, maxHeight?: string | number) => responses.BlockchainResponse;
    block: (height?: string | number) => responses.BlockResponse;
    block_by_hash: (hash: Uint8Array) => responses.BlockchainResponse;
    block_results: (height?: string | number) => responses.BlockResultsResponse;
    commit: (height: string) => responses.CommitResponse;
    validators: (height: string) => responses.ValidatorsResponse;
    genesis: () => responses.GenesisResponse;
    genesis_chunked: (chunk: number | string) => responses.GenesisChunkedResponse;
    dump_consensus_state: () => responses.DumpConsensusStateResponse;
    consensus_state: () => responses.ConsensusStateResponse;
    consensus_params: (height?: number | string) => responses.ConsensusParams;
    unconfirmed_txs: (limit?: number | string) => responses.UnconfirmedTxsResponse;
    tx_search: (query: string, prove?: boolean, page?: number | string, per_page?: number | string, order_by?: string) => responses.TxSearchResponse;
    block_search: (query: string, page: string, per_page: string, order_by: string) => responses.BlockSearchResponse;
    tx: (hash: string) => responses.TxResponse;

    // end tendermint apis



    abci_info: () => ResponseData<AbciInfo>;
    account: (addr: string) => AddressAPI;
    broadcast_evidence: (evidence: string) => ResponseData<null>;
    broadcast_tx_async: (tx: string) => ResponseData<null>;
    check_tx: (tx: string) => CheckTx;
    delegatee: (addr: string) => Delegatee;
    num_unconfirmed_txs: () => NumUnconfirmedTxs;
    // TODO :  proposal: (proposalId: string) => Proposal; 필요함
    rule: () => Rule;
    stakes: (addr: string) => StakeValue;


};
