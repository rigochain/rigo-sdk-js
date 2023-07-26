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

import Account from "../account/account";
import Bytes from "../utils/bytes";
import {TrxProto} from "../trx/trx_pb";
import {TrxBuilder} from '../trx/trx';
import axios from "axios";
import {JSONRPCClient} from "json-rpc-2.0";
import Subscriber from "./subscriber";
import Contract from "./contract";

export default class RWeb3 extends JSONRPCClient {

    constructor(public url: string) {
        super((jsonRPCRequest) =>
            axios.post(url, jsonRPCRequest)
                .then( response => {
                    if (response.status === 200) {
                        return this.receive(response.data); // response.data has JSONRPC header
                    } else if (jsonRPCRequest.id !== undefined) {
                        return Promise.reject(new Error(response.statusText));
                    }
                })
        )
    }

    private rpcall(method: string, params: object|Map<string, string>, cb?:(_:any)=>void): PromiseLike<any> {
        let _params = params
        if (params instanceof Map){
            _params = Object.fromEntries(params)
        }
        return this.request(method, _params)
            .then( resp => {
                // resp does not include JSONRPC header
                // resp: {code:..., log:..., info:..., key:..., value:{...}}
                if(cb) {
                    cb(resp)
                }
                return resp
            })
            .then( null, err => {
                console.error('catched error', 'code', err.code, 'data', err.data)
                throw err
            })
    }

    setUrl(url:string) {
        this.url = url
    }

    getUrl(): string {
        return this.url
    }


    queryAccount(addr: string|Bytes, cb?:(_:any)=>void) {
        if(addr instanceof Bytes) {
            addr = addr.toHex()
        }
        return this.rpcall("account",{addr: addr},cb)
    }
    syncAccount(acct: Account, cb?:(_:any)=>void) {
        return this.queryAccount(acct.address,cb)
            .then(resp => {
                acct.update(resp.value)
                return resp
            })
    }
    queryValidators(height:number|string, cb?:(_:any)=>void) {
        let params = {}
        if(height) {
            if(typeof height === 'number') {
                height = height.toString(10)
            }
            params = {height: height}
        }
        return this.rpcall('validators', params, cb)
    }
    queryStakes(addr: string|Bytes, cb?:(_:any)=>void) {
        return this.rpcall("stakes",{addr: addr},cb)
    }
    queryDelegatee(addr: string|Bytes, cb?:(_:any)=>void) {
        return this.rpcall("delegatee", {addr: addr}, cb)
    }
    broadcastTrxSync(tx: TrxProto, cb?:(_:any)=>void) {
        const wr = TrxProto.encode(tx)
        const txbz = wr.finish()

        return this.rpcall("broadcast_tx_sync", {tx:Buffer.from(txbz).toString('base64')},cb)
    }
    queryTrx(txhash: string|Uint8Array, cb?:(_:any)=>void) {
        if (typeof txhash === 'string') {
            txhash = Bytes.fromHex(txhash)
        }
        return this.rpcall("tx",{hash: Buffer.from(txhash).toString('base64'), prove:true},cb)
            .then(resp => {
                const txbytes = Bytes.b64ToBytes(resp.tx);
                resp.encoded = resp.tx;
                resp.tx = TrxBuilder.DecodeTrx(txbytes);
                return resp
            })
    }
    queryBlockByHeight(height: number|string, cb?:(_:any)=>void) {
        if(typeof height === 'number') {
            height = height.toString(10)
        }

        return this.rpcall('block', {height:height}, cb)
    }
    queryBlockByHash(hash: string|Uint8Array, cb?:(_:any)=>void) {
        if(typeof hash === 'string') {
            hash = Bytes.fromHex(hash)
        }
        return this.rpcall('block_by_hash', {hash: Buffer.from(hash).toString('base64')}, cb)
    }

    queryRule(cb?:(_:any)=>void) {
        return this.rpcall('rule', {}, cb)
    }

    vmCall(addr: string, to: string, height: number, data: string, cb?:(_:any)=>void) {
        console.log('addr : ' + addr);
        if(!addr.startsWith('0x')) {
            addr = '0x' + addr;
        }
        if(!to.startsWith('0x')) {
            to = '0x' + to;
        }
        const params = {
            addr: addr,
            to: to,
            height: height.toString(10),
            data: Buffer.from(Bytes.fromHex(data)).toString('base64')
        }
        return this.rpcall('vm_call', params, cb)
    }

    subscribe(url:string, query: string, cb: (resp:string)=>void): Subscriber {
        const evtListener = new Subscriber(url)
        evtListener.start(query, cb)
        return evtListener
    }

    createContract(jsonInterface?: any, address?: string) {
        if(address !== undefined && address.startsWith('0x')) {
            address = address.substring(2)
        }
        return new Contract(this, jsonInterface, address);
    }
}