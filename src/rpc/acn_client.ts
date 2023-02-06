import axios from 'axios';
import {JSONRPCClient} from "json-rpc-2.0";
import Account from "../account/account";
import Bytes from "../utils/bytes";

export default class ACNClient extends JSONRPCClient      {
    constructor(public url: string) {
        super((jsonRPCRequest) =>
            axios.post(url, jsonRPCRequest)
                .then( response => {
                    if (response.status === 200) {
                        return this.receive(response.data);
                    } else if (jsonRPCRequest.id !== undefined) {
                        return Promise.reject(new Error(response.statusText));
                    }
                }))
    }

    rpcall(method: string, params: object|Map<string, string>, cb?:(_:any)=>void) {
        let _params = params
        if (params instanceof Map){
            _params = Object.fromEntries(params)
        }
        return this.request(method, _params)
            .then( resp => {
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

    getUrl(): string {
        return this.url
    }
}