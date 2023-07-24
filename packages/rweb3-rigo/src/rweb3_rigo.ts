import {RWeb3Context} from 'rweb3-core';
import Bytes from "./utils/bytes";
import Account from "./account/account";
import {TrxProto} from "./trx/trx_pb";
import {DataFormat, DEFAULT_RETURN_FORMAT} from 'rweb3-types';
import * as rpcMethodsWrappers from './rpc_method_wrappers.js';

export class RWeb3Rigo extends RWeb3Context {

    public constructor() {
        super();
    }

    getUrl(): string {

        // TODO : Validate RequestManger
        return this.requestManager.provider.getClientUrl();
    }


    /**
     * // 상세 주석 필요
     * @param addr
     **/
    queryAccount<ReturnFormat extends DataFormat = typeof DEFAULT_RETURN_FORMAT>(addr: string){
        return rpcMethodsWrappers.queryAccount(this, addr);
    }

    syncAccount<ReturnFormat extends DataFormat = typeof DEFAULT_RETURN_FORMAT>(acct: Account) {
    }


    queryValidators<ReturnFormat extends DataFormat = typeof DEFAULT_RETURN_FORMAT>(height: number | string) {
    }

    queryStakes<ReturnFormat extends DataFormat = typeof DEFAULT_RETURN_FORMAT>(addr: string | Bytes) {
    }

    queryDelegatee<ReturnFormat extends DataFormat = typeof DEFAULT_RETURN_FORMAT>(addr: string | Bytes) {
    }

    broadcastTrxSync<ReturnFormat extends DataFormat = typeof DEFAULT_RETURN_FORMAT>(tx: TrxProto) {
    }

    queryTrx<ReturnFormat extends DataFormat = typeof DEFAULT_RETURN_FORMAT>(txhash: string | Uint8Array) {
    }

    queryBlockByHeight<ReturnFormat extends DataFormat = typeof DEFAULT_RETURN_FORMAT>(height: number | string) {
    }

    queryBlockByHash<ReturnFormat extends DataFormat = typeof DEFAULT_RETURN_FORMAT>(hash: string | Uint8Array) {
    }

    queryRule<ReturnFormat extends DataFormat = typeof DEFAULT_RETURN_FORMAT>(cb?: (_: any) => void) {
    }

    vmCall<ReturnFormat extends DataFormat = typeof DEFAULT_RETURN_FORMAT>(addr: string, to: string, height: number, data: string) {
    }

    subscribe<ReturnFormat extends DataFormat = typeof DEFAULT_RETURN_FORMAT>(url: string, query: string, cb: (resp: string) => void) {
    }

    createContract<ReturnFormat extends DataFormat = typeof DEFAULT_RETURN_FORMAT>(jsonInterface?: any, address?: string) {
    }


}
