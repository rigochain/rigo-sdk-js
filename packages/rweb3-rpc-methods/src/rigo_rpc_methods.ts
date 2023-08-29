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

import { RWeb3RequestManager } from 'rweb3-core';
import { ConsensusParamsResponse, TrxProto } from 'rweb3-types';
import { Bytes } from 'rweb3-utils';

import {
    BlockchainResponse,
    BlockResponse,
    BlockResultsResponse,
    CommitResponse,
    GenesisResponse,
    NetInfoResponse,
    StatusResponse,
    GenesisChunkedResponse,
    ValidatorsResponse,
    DumpConsensusStateResponse,
    ConsensusStateResponse,
    NumUnconfirmedTxsResponse,
    UnconfirmedTxsResponse,
    TxResponse,
    AbciInfoResponse,
    AbciQueryResponse,
    CheckTxResponse,
    DelegateeResponse,
    RuleResponse,
    VmCallResponse,
    ProposalResponse,
    StakesResponse,
    AccountResponse,
    HealthResponse,
} from 'rweb3-types';

import { SubscriptionEvent } from 'rweb3-providers-ws';
import { Stream } from 'xstream';
import { buildQuery, Method, SubscribeRequest, SubscriptionEventType } from './requests';
import { TrxProtoUtils } from 'rweb3-accounts';

export async function health(requestManager: RWeb3RequestManager): Promise<HealthResponse> {
    return requestManager.send({
        method: 'health',
        params: {},
    });
}

export async function status(requestManager: RWeb3RequestManager): Promise<StatusResponse> {
    return requestManager.send({
        method: 'status',
        params: {},
    });
}

export async function netInfo(requestManager: RWeb3RequestManager): Promise<NetInfoResponse> {
    return requestManager.send({
        method: 'net_info',
        params: {},
    });
}

export async function blockchain(
    requestManager: RWeb3RequestManager,
    minHeight?: number | string,
    maxHeight?: number | string,
): Promise<BlockchainResponse> {
    if (minHeight && typeof minHeight === 'number') {
        minHeight = minHeight.toString(10);
    }

    if (maxHeight && typeof maxHeight === 'number') {
        maxHeight = maxHeight.toString(10);
    }

    // validator.validate(['int', 'int'], [minHeight, maxHeight]);

    return requestManager.send({
        method: 'blockchain',
        params: {
            minHeight: minHeight,
            maxHeight: maxHeight,
        },
    });
}

export async function block(
    requestManager: RWeb3RequestManager,
    height?: string | number,
): Promise<BlockResponse> {
    if (height && typeof height === 'number') {
        height = height.toString(10);
    }

    return requestManager.send({
        method: 'block',
        params: { height: height },
    });
}

export async function blockByHash(
    requestManager: RWeb3RequestManager,
    hash: string | Uint8Array,
): Promise<BlockResponse> {
    if (typeof hash === 'string') {
        hash = Bytes.fromHex(hash);
    }

    return requestManager.send({
        method: 'block_by_hash',
        params: { hash: Buffer.from(hash).toString('base64') },
    });
}

export async function blockResults(
    requestManager: RWeb3RequestManager,
    height?: string | number,
): Promise<BlockResultsResponse> {
    if (height && typeof height === 'number') {
        height = height.toString(10);
    }

    return requestManager.send({
        method: 'block_results',
        params: { height: height },
    });
}

export async function commit(
    requestManager: RWeb3RequestManager,
    height?: number | string,
): Promise<CommitResponse> {
    if (height && typeof height === 'number') {
        height = height.toString(10);
    }

    return requestManager.send({
        method: 'commit',
        params: { height: height },
    });
}

export async function validators(
    requestManager: RWeb3RequestManager,
    height: number | string,
    page?: number | string,
    per_page?: number | string,
): Promise<ValidatorsResponse> {
    if (typeof height === 'number') {
        height = height.toString(10);
    }

    if (page && typeof page === 'number') {
        page = page.toString(10);
    }

    if (per_page && typeof per_page === 'number') {
        per_page = per_page.toString(10);
    }

    return requestManager.send({
        method: 'validators',
        params: {
            height: height,
            page: page,
            per_page: per_page,
        },
    });
}

export async function genesis(requestManager: RWeb3RequestManager): Promise<GenesisResponse> {
    return requestManager.send({
        method: 'genesis',
        params: {},
    });
}

export async function genesisChunked(
    requestManager: RWeb3RequestManager,
    chunk: number | string,
): Promise<GenesisChunkedResponse> {
    if (typeof chunk === 'number') {
        chunk = chunk.toString(10);
    }

    return requestManager.send({
        method: 'genesis_chunked',
        params: {
            chunk: chunk,
        },
    });
}

export async function dumpConsensusState(
    requestManager: RWeb3RequestManager,
): Promise<DumpConsensusStateResponse> {
    return requestManager.send({
        method: 'dump_consensus_state',
        params: {},
    });
}

export async function consensusState(
    requestManager: RWeb3RequestManager,
): Promise<ConsensusStateResponse> {
    return requestManager.send({
        method: 'consensus_state',
        params: {},
    });
}

export async function consensusParams(
    requestManager: RWeb3RequestManager,
    height?: number | string,
): Promise<ConsensusParamsResponse> {
    if (height && typeof height === 'number') {
        height = height.toString(10);
    }

    return requestManager.send({
        method: 'consensus_params',
        params: { height: height },
    });
}

export async function unconfirmedTxs(
    requestManager: RWeb3RequestManager,
    limit: number | string,
): Promise<UnconfirmedTxsResponse> {
    if (typeof limit === 'number') {
        limit = limit.toString(10);
    }

    return requestManager.send({
        method: 'unconfirmed_txs',
        params: {
            limit: limit,
        },
    });
}

export async function txSearch(
    requestManager: RWeb3RequestManager,
    query: string,
    prove?: boolean,
    page?: number | string,
    per_page?: number | string,
    order_by?: string,
) {
    if (page && typeof page === 'number') {
        page = page.toString(10);
    }

    if (per_page && typeof per_page === 'number') {
        per_page = per_page.toString(10);
    }

    return requestManager.send({
        method: 'tx_search',
        params: {
            query: query,
            prove: prove,
            page: page,
            per_page: per_page,
            order_by: order_by,
        },
    });
}

export async function tx(
    requestManager: RWeb3RequestManager,
    hash: string | Uint8Array,
): Promise<TxResponse> {
    if (typeof hash === 'string') {
        hash = Bytes.fromHex(hash);
    }

    return requestManager.send({
        method: 'tx',
        params: { hash: Buffer.from(hash).toString('base64'), prove: true },
    });
}

export async function abciInfo(requestManager: RWeb3RequestManager): Promise<AbciInfoResponse> {
    return requestManager.send({
        method: 'abci_info',
        params: {},
    });
}

export async function abciQuery(
    requestManager: RWeb3RequestManager,
    path: string,
    data: string,
    height?: number | string,
    prove?: boolean,
): Promise<AbciQueryResponse> {
    if (height && typeof height === 'number') {
        height = height.toString(10);
    }

    return requestManager.send({
        method: 'abci_query',
        params: {
            path: path,
            data: data,
            height: height,
            prove: prove,
        },
    });
}

export async function checkTx(
    requestManager: RWeb3RequestManager,
    tx: TrxProto,
): Promise<CheckTxResponse> {
    const wr = TrxProtoUtils.encode(tx);
    const txbz = wr.finish();

    return requestManager.send({
        method: 'check_tx',
        params: { tx: Buffer.from(txbz).toString('base64') },
    });
}

export async function numUnconfirmedTxs(
    requestManager: RWeb3RequestManager,
): Promise<NumUnconfirmedTxsResponse> {
    return requestManager.send({
        method: 'num_unconfirmed_txs',
        params: {},
    });
}

export async function broadcastEvidence(requestManager: RWeb3RequestManager, evidence: string) {
    return requestManager.send({
        method: 'broadcast_evidence',
        params: { evidence: evidence },
    });
}

export async function broadcastTxAsync(requestManager: RWeb3RequestManager, tx: TrxProto) {
    const wr = TrxProtoUtils.encode(tx);
    const txbz = wr.finish();

    return requestManager.send({
        method: 'broadcast_tx_async',
        params: { tx: Buffer.from(txbz).toString('base64') },
    });
}

export async function broadcastTxSync(requestManager: RWeb3RequestManager, tx: TrxProto) {
    const wr = TrxProtoUtils.encode(tx);
    const txbz = wr.finish();

    return requestManager.send({
        method: 'broadcast_tx_sync',
        params: { tx: Buffer.from(txbz).toString('base64') },
    });
}

export async function broadcastTxCommit(requestManager: RWeb3RequestManager, tx: TrxProto) {
    const wr = TrxProtoUtils.encode(tx);
    const txbz = wr.finish();

    return requestManager.send({
        method: 'broadcast_tx_commit',
        params: { tx: Buffer.from(txbz).toString('base64') },
    });
}

// end tendermint apis

// start not tendermint apis

export async function delegatee(
    requestManager: RWeb3RequestManager,
    addr: string,
): Promise<DelegateeResponse> {
    if (!addr.startsWith('0x')) {
        addr = '0x' + addr;
    }

    return requestManager.send({
        method: 'delegatee',
        params: { addr: addr },
    });
}

export async function rule(requestManager: RWeb3RequestManager): Promise<RuleResponse> {
    return requestManager.send({
        method: 'rule',
        params: {},
    });
}

export async function account(
    requestManager: RWeb3RequestManager,
    addr: string,
): Promise<AccountResponse> {
    if (!addr.startsWith('0x')) {
        addr = '0x' + addr;
    }

    return requestManager.send({
        method: 'account',
        params: {
            addr: addr,
        },
    });
}

export async function proposals(
    requestManager: RWeb3RequestManager,
    txHash: string,
): Promise<ProposalResponse> {
    return requestManager.send({
        method: 'proposals',
        params: {
            txhash: Buffer.from(txHash).toString('base64'),
        },
    });
}

export async function stakes(
    requestManager: RWeb3RequestManager,
    addr: string,
): Promise<StakesResponse> {
    if (!addr.startsWith('0x')) {
        addr = '0x' + addr;
    }

    return requestManager.send({
        method: 'stakes',
        params: { addr: addr },
    });
}

export async function vmCall(
    requestManager: RWeb3RequestManager,
    addr: string,
    to: string,
    height: number,
    data: string,
): Promise<VmCallResponse> {
    if (!addr.startsWith('0x')) {
        addr = '0x' + addr;
    }
    if (!to.startsWith('0x')) {
        to = '0x' + to;
    }

    return requestManager.send({
        method: 'vm_call',
        params: {
            addr: addr,
            to: to,
            height: height.toString(10),
            data: Buffer.from(Bytes.fromHex(data)).toString('base64'),
        },
    });
}

export async function blockSearch(
    requestManager: RWeb3RequestManager,
    query: string,
    page?: number | string,
    per_page?: number | string,
    order_by?: string,
) {
    if (typeof page === 'number') {
        page = page.toString(10);
    }

    if (typeof per_page === 'number') {
        per_page = per_page.toString(10);
    }

    return requestManager.send({
        method: 'block_search',
        params: {
            query: query,
            page: page,
            per_page: per_page,
            order_by: order_by,
        },
    });
}

export function subscribe(
    requestManager: RWeb3RequestManager,
    query: string,
): Stream<SubscriptionEvent> {
    console.log('subscribe query 3', query);
    return requestManager.subscribe({
        method: 'subscribe',
        params: {
            query: query,
        },
    });
}

export function subscribeNewBlock(requestManager: RWeb3RequestManager): Stream<SubscriptionEvent> {
    const request = { type: SubscriptionEventType.NewBlock };
    return subscribe(
        requestManager,
        encodeSubscribeQuery({
            method: Method.Subscribe,
            query: request,
        }),
    );
}

export function subscribeNewBlockHeader(
    requestManager: RWeb3RequestManager,
): Stream<SubscriptionEvent> {
    const request = { type: SubscriptionEventType.NewBlockHeader };

    return subscribe(
        requestManager,
        encodeSubscribeQuery({
            method: Method.Subscribe,
            query: request,
        }),
    );
}

export function subscribeTx(
    requestManager: RWeb3RequestManager,
    query?: string,
): Stream<SubscriptionEvent> {
    const request = { type: SubscriptionEventType.Tx, raw: query };

    return subscribe(
        requestManager,
        encodeSubscribeQuery({
            method: Method.Subscribe,
            query: request,
        }),
    );
}

function encodeSubscribeQuery(req: SubscribeRequest): string {
    const eventTag = { key: 'tm.event', value: req.query.type };
    return buildQuery({ tags: [eventTag], raw: req.query.raw });
}
