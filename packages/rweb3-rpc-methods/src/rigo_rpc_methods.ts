import {RWeb3RequestManager} from 'rweb3-core';
import {Bytes} from 'rweb3-utils';
import {TrxProto} from 'rweb3-types';


export async function queryAccount(requestManager: RWeb3RequestManager, addr: string) {

    // TODO : tx encode 되어 잇음.
    return requestManager.send(
        {
            method: 'account',
            params: {
                addr: addr
            }
        });
}

export async function queryValidators(requestManager: RWeb3RequestManager, height: number | string) {

    return requestManager.send(
        {
            method: 'validators',
            params: {height: height}
        });

}

export async function queryStakes(requestManager: RWeb3RequestManager, addr: string | Bytes) {
    return requestManager.send(
        {
            method: 'stakes',
            params: {addr: addr}
        });
}

export async function queryDelegatee(requestManager: RWeb3RequestManager, addr: string) {
    return requestManager.send(
        {
            method: 'delegatee',
            params: {addr: addr}
        });
}


export async function broadcastTrxSync(requestManager: RWeb3RequestManager, tx: TrxProto) {
    const wr = TrxProto.encode(tx)
    const txbz = wr.finish()

    return requestManager.send(
        {
            method: 'broadcast_tx_sync',
            params: {tx: Buffer.from(txbz).toString('base64')}
        });

}

export async function queryTrx(requestManager: RWeb3RequestManager, txhash: string | Uint8Array) {
    return requestManager.send(
        {
            method: 'tx',
            params: {hash: Buffer.from(txhash).toString('base64'), prove: true}
        });
}

export async function queryBlockByHeight(requestManager: RWeb3RequestManager, height: string | number) {

    return requestManager.send(
        {
            method: 'block',
            params: {height: height}
        });

}

export async function queryBlockByHash(requestManager: RWeb3RequestManager, hash: Bytes) {

    return requestManager.send(
        {
            method: 'block_by_hash',
            params: {hash: Buffer.from(hash).toString('base64')}
        });

}

export async function queryRule(requestManager: RWeb3RequestManager) {

    return requestManager.send(
        {
            method: 'rule',
            params: {}
        });

}


export async function vmCall(requestManager: RWeb3RequestManager, addr: string, to: string, height: number, data: string) {

    if (!addr.startsWith('0x')) {
        addr = '0x' + addr;
    }
    if (!to.startsWith('0x')) {
        to = '0x' + to;
    }

    return requestManager.send(
        {
            method: 'vm_call',
            params: {
                addr: addr,
                to: to,
                height: height.toString(10),
                data: Buffer.from(Bytes.fromHex(data)).toString('base64')
            }
        });
}