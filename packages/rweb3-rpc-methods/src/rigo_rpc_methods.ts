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

import {RWeb3RequestManager} from 'rweb3-core';
import {Bytes, TrxProto} from 'rweb3-utils';


export async function health(requestManager: RWeb3RequestManager) {
    return requestManager.send({
        method: 'health',
        params: {},
    })
}

export async function abciInfo(requestManager: RWeb3RequestManager) {
    return requestManager.send({
        method: 'abci_info',
        params: {},
    });
}


export async function broadcastTxCommit(requestManager: RWeb3RequestManager, tx: string) {

    let txhash = Buffer.from(tx).toString('base64')

    return requestManager.send({
        method: 'broadcast_tx_commit',
        params: {tx: txhash},
    });
}


export async function abciQuery(requestManager: RWeb3RequestManager, path: string, data: string, height: number | string, prove: boolean) {

    if (typeof height === 'number') {
        height = height.toString(10);
    }

    return requestManager.send({
        method: 'abci_query',
        params: {
            path: path,
            data: data,
            height: height,
            prove: prove
        },
    });
}


export async function account(requestManager: RWeb3RequestManager, addr: string) {
    return requestManager.send({
        method: 'account',
        params: {
            addr: addr,
        },
    });
}

export async function block(
    requestManager: RWeb3RequestManager,
    height: string | number,
) {

    if (typeof height === 'number') {
        height = height.toString(10);
    }

    return requestManager.send({
        method: 'block',
        params: {height: height},
    });
}


export async function blockByHash(requestManager: RWeb3RequestManager, hash: Bytes) {

    return requestManager.send({
        method: 'block_by_hash',
        params: {hash: Buffer.from(hash).toString('base64')},
    });
}


export async function blockResults(requestManager: RWeb3RequestManager, height: string | number) {

    if (typeof height === 'number') {
        height = height.toString(10);
    }

    return requestManager.send({
        method: 'block_results',
        params: {height: height},
    });
}

export async function blockSearch(requestManager: RWeb3RequestManager, query: string, page?: number | string, per_page?: number | string, order_by?: string) {

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
            order_by: order_by
        },
    });
}


export async function blockchain(requestManager: RWeb3RequestManager, minHeight?: number | string, maxHeight?: number | string) {

    if (minHeight && typeof minHeight === 'number') {
        minHeight = minHeight.toString(10);
    }

    if (maxHeight && typeof maxHeight === 'number') {
        maxHeight = maxHeight.toString(10);
    }

    return requestManager.send({
        method: 'blockchain',
        params: {
            minHeight: minHeight,
            maxHeight: maxHeight
        }
    });
}


export async function broadcastEvidence(requestManager: RWeb3RequestManager, evidence: string) {
    return requestManager.send({
        method: 'broadcast_evidence',
        params: {evidence: evidence},
    });
}


export async function broadcastTxAsync(requestManager: RWeb3RequestManager, tx: string) {
    return requestManager.send({
        method: 'broadcast_tx_async',
        params: {tx: tx},
    });
}


export async function broadcastTxSync(requestManager: RWeb3RequestManager, tx: string) {
    return requestManager.send({
        method: 'broadcast_tx_sync',
        params: {tx: tx},
    });
}

export async function checkTx(requestManager: RWeb3RequestManager, tx: string) {

    let txhash = Buffer.from(tx).toString('base64')

    return requestManager.send({
        method: 'check_tx',
        params: {tx: txhash},
    });
}


export async function commit(requestManager: RWeb3RequestManager, height?: number | string) {

    if (height && typeof height === 'number') {
        height = height.toString(10);
    }

    return requestManager.send({
        method: 'commit',
        params: {height: height},
    });
}


export async function consensusParams(requestManager: RWeb3RequestManager, height?: number | string) {

    if (height && typeof height === 'number') {
        height = height.toString(10);
    }

    return requestManager.send({
        method: 'consensus_params',
        params: {height: height},
    });
}

export async function consensusState(requestManager: RWeb3RequestManager) {

    return requestManager.send({
        method: 'consensus_state',
        params: {},
    });
}


export async function delegatee(requestManager: RWeb3RequestManager, addr: string) {
    return requestManager.send({
        method: 'delegatee',
        params: {addr: addr},
    });
}

export async function dumpConsensusState(requestManager: RWeb3RequestManager) {
    return requestManager.send({
        method: 'dump_consensus_state',
        params: {},
    });
}

export async function genesis(requestManager: RWeb3RequestManager) {
    return requestManager.send({
        method: 'genesis',
        params: {},
    });
}

export async function genesisChunked(requestManager: RWeb3RequestManager, chunk: number | string) {

    if (typeof chunk === 'number') {
        chunk = chunk.toString(10);
    }

    return requestManager.send({
        method: 'genesis_chunked',
        params: {
            chunk: chunk
        },
    });
}


export async function netInfo(requestManager: RWeb3RequestManager) {
    return requestManager.send({
        method: 'net_info',
        params: {},
    });
}

export async function numUnconfirmedTxs(requestManager: RWeb3RequestManager) {
    return requestManager.send({
        method: 'num_unconfirmed_txs',
        params: {},
    });
}

export async function proposals(requestManager: RWeb3RequestManager, tx: string) {

    let txhash = Buffer.from(tx).toString('base64')

    return requestManager.send({
        method: 'proposals',
        params: {
            txhash: txhash
        },
    });
}


export async function rule(requestManager: RWeb3RequestManager) {
    return requestManager.send({
        method: 'rule',
        params: {},
    });
}


export async function stakes(requestManager: RWeb3RequestManager, addr: string) {

    if (!addr.startsWith('0x')) {
        addr = '0x' + addr;
    }

    return requestManager.send({
        method: 'stakes',
        params: {addr: addr},
    });
}



// TODO : WebSocket 전용
export async function subscribe(requestManager: RWeb3RequestManager, query: string) {
    return requestManager.send({
        method: 'subscribe',
        params: {
            query: query
        },
    });
}

export async function tx(requestManager: RWeb3RequestManager, txhash: string | Uint8Array) {

    return requestManager.send({
        method: 'tx',
        params: {hash: Buffer.from(txhash).toString('base64'), prove: true},
    });
}



export async function txSearch(requestManager: RWeb3RequestManager, query: string, prove: boolean, page: number | string, per_page: number | string, order_by: string) {

    if (typeof page === 'number') {
        page = page.toString(10);
    }

    if (typeof per_page === 'number') {
        per_page = per_page.toString(10);
    }


    return requestManager.send({
        method: 'tx_search',
        params: {
            query: query,
            prove: prove,
            page: page,
            per_page: per_page,
            order_by: order_by
        },
    });
}

export async function unconfirmedTxs(requestManager: RWeb3RequestManager, limit: number | string) {

    if(typeof limit === 'number') {
        limit = limit.toString(10);
    }

    return requestManager.send({
        method: 'unconfirmed_txs',
        params: {
            limit: limit
        },
    });
}

export async function status(requestManager: RWeb3RequestManager) {
    return requestManager.send({
        method: 'status',
        params: {},
    });
}





// TODO : WEB SOCKET 전용
export async function unsubscribe(requestManager: RWeb3RequestManager, query: string) {
    return requestManager.send({
        method: 'unsubscribe',
        params: {
            query: query
        },
    });
}


// TODO : WEB SOCKET 전용
export async function unsubscribeAll(requestManager: RWeb3RequestManager) {
    return requestManager.send({
        method: 'unsubscribe_all',
        params: {}
    });
}


export async function validators(
    requestManager: RWeb3RequestManager,
    height: number | string,
) {
    return requestManager.send({
        method: 'validators',
        params: {height: height},
    });
}

export async function broadcastTrxSync(requestManager: RWeb3RequestManager, tx: TrxProto) {

    const wr = TrxProto.encode(tx);
    const txbz = wr.finish();

    return requestManager.send({
        method: 'broadcast_tx_sync',
        params: {tx: Buffer.from(txbz).toString('base64')},
    });
}

export async function vmCall(
    requestManager: RWeb3RequestManager,
    addr: string,
    to: string,
    height: number,
    data: string,
) {

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
