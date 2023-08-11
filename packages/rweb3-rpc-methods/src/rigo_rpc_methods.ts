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

//192.168.252.60:26657/abci_info?
//192.168.252.60:26657/abci_query?path=_&data=_&height=_&prove=_
//192.168.252.60:26657/account?addr=_
//192.168.252.60:26657/block?height=_
//192.168.252.60:26657/block_by_hash?hash=_
//192.168.252.60:26657/block_results?height=_
//192.168.252.60:26657/block_search?query=_&page=_&per_page=_&order_by=_
//192.168.252.60:26657/blockchain?minHeight=_&maxHeight=_
//192.168.252.60:26657/broadcast_evidence?evidence=_
//192.168.252.60:26657/broadcast_tx_async?tx=_
//192.168.252.60:26657/broadcast_tx_commit?tx=_
//192.168.252.60:26657/broadcast_tx_sync?tx=_
//192.168.252.60:26657/check_tx?tx=_
//192.168.252.60:26657/commit?height=_
//192.168.252.60:26657/consensus_params?height=_
//192.168.252.60:26657/consensus_state?
//192.168.252.60:26657/delegatee?addr=_
//192.168.252.60:26657/dump_consensus_state?
//192.168.252.60:26657/genesis?
//192.168.252.60:26657/genesis_chunked?chunk=_
//192.168.252.60:26657/health?
//192.168.252.60:26657/net_info?
//192.168.252.60:26657/num_unconfirmed_txs?
//192.168.252.60:26657/proposals?txhash=_
//192.168.252.60:26657/rule?
//192.168.252.60:26657/stakes?addr=_
//192.168.252.60:26657/status?
//192.168.252.60:26657/subscribe?query=_
//192.168.252.60:26657/tx?hash=_&prove=_
//192.168.252.60:26657/tx_search?query=_&prove=_&page=_&per_page=_&order_by=_
//192.168.252.60:26657/unconfirmed_txs?limit=_
//192.168.252.60:26657/unsubscribe?query=_
//192.168.252.60:26657/unsubscribe_all?
//192.168.252.60:26657/validators?height=_&page=_&per_page=_
//192.168.252.60:26657/vm_call?addr=_&to=_&height=_&data=_


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
    // TODO : tx encode 되어 잇음.
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
