/*
import {RWeb3RequestManager} from 'rweb3-core';
import {Bytes} from 'rweb3-utils';



export async function queryBlockByHeight(height: number | string, cb?: (_: any) => void) {
    if (typeof height === 'number') {
        height = height.toString(10)
    }

    return this.rpcall('block', {height: height}, cb)
}

export async function queryBlockByHash(hash: string | Uint8Array, cb?: (_: any) => void) {
    if (typeof hash === 'string') {
        hash = Bytes.fromHex(hash)
    }

    return this.rpcall('block_by_hash', {hash: Buffer.from(hash).toString('base64')}, cb)
}*/
