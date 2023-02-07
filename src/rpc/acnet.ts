import Account from "../account/account";
import ACNClient from "./acn_client";
import Bytes from "../utils/bytes";
import {TrxProto} from "../proto/trx";
import {decodeTrx} from '../trxs/trx';

export default class ACNet {
    static client:ACNClient
    static getClient():ACNClient {
        if(!ACNet.client) {
            throw Error("there is no ACNClient")
        }
        return ACNet.client
    }
    static setUrl(url:string) {
        if(!ACNet.client || ACNet.client.url !== url) {
            this.client = new ACNClient(url)
        }
    }
    static getUrl():string {
        return ACNet.client.url
    }

    static queryAccount(addr: string|Bytes, cb?:(_:any)=>void) {
        if(addr instanceof Bytes) {
            addr = addr.toHex()
        }
        return ACNet.client.rpcall("account",{addr: addr},cb)
    }
    static syncAccount(acct: Account, cb?:(_:any)=>void) {
        return ACNet.queryAccount(acct.address,cb)
            .then(resp => {
                acct.update(resp.value)
                return resp
            })
    }
    static queryValidators(height:number|string, cb?:(_:any)=>void) {
        let params = {}
        if(height) {
            if(typeof height === 'number') {
                height = height.toString(10)
            }
            params = {height: height}
        }
        return ACNet.client.rpcall('validators', params, cb)
    }
    static queryStakes(addr: string|Bytes, cb?:(_:any)=>void) {
        return ACNet.client.rpcall("stakes",{addr: addr},cb)
    }
    static queryDeslegatee(addr: string|Bytes, cb?:(_:any)=>void) {
        return ACNet.client.rpcall("stakes",{addr: addr},cb)
    }

    static broadcastTrxSync(tx: TrxProto, cb?:(_:any)=>void) {
        const wr = TrxProto.encode(tx)
        const txbz = wr.finish()

        return ACNet.client.rpcall("broadcast_tx_sync", {tx:Buffer.from(txbz).toString('base64')},cb)
    }
    static queryTrx(txhash: string|Uint8Array, cb?:(_:any)=>void) {
        if (typeof txhash === 'string') {
            txhash = Bytes.fromHex(txhash)
        }
        return ACNet.client.rpcall("tx",{hash: Buffer.from(txhash).toString('base64'), prove:true},cb)
            .then(resp => {
                const txbytes = Bytes.b64ToBytes(resp.tx);
                resp.encoded = resp.tx;
                resp.tx = decodeTrx(txbytes);
                return resp
            })
    }
    static queryBlockByHeight(height: number|string, cb?:(_:any)=>void) {
        if(typeof height === 'number') {
            height = height.toString(10)
        }

        return ACNet.client.rpcall('block', {height:height}, cb)
    }
    static queryBlockByHash(hash: string|Uint8Array, cb?:(_:any)=>void) {
        if(typeof hash === 'string') {
            hash = Bytes.fromHex(hash)
        }
        return ACNet.client.rpcall('block_by_hash', {hash: Buffer.from(hash).toString('base64')}, cb)
    }

    static queryRule(cb?:(_:any)=>void) {
        return ACNet.client.rpcall('rule', {}, cb)
    }
}