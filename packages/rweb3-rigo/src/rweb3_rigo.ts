import {RWeb3Context} from 'rweb3-core';
import Bytes from "./utils/bytes";
import RpcMethodWrappers from "./rpc_method_wrappers";
import Account from "./account/account";
import {TrxProto} from "./trx/trx_pb";
import Subscriber from "./subscriber";

export class RWeb3Rigo extends RWeb3Context {
    public constructor() {
        super();
    }

    getUrl(): string {
        return new RpcMethodWrappers("http://192.168.252.60:26657").getUrl();
    }


    queryAccount(addr: string | Bytes, cb?: (_: any) => void) {
        return new RpcMethodWrappers("http://192.168.252.60:26657").queryAccount(addr, cb);
    }

    syncAccount(acct: Account, cb?: (_: any) => void) {
        return new RpcMethodWrappers("http://192.168.252.60:26657").syncAccount(acct, cb);
    }


    queryValidators(height: number | string, cb?: (_: any) => void) {
        return new RpcMethodWrappers("http://192.168.252.60:26657").queryValidators(height, cb);
    }

    queryStakes(addr: string | Bytes, cb?: (_: any) => void) {
        return new RpcMethodWrappers("http://192.168.252.60:26657").queryStakes(addr, cb);
    }

    queryDelegatee(addr: string | Bytes, cb?: (_: any) => void) {
        return new RpcMethodWrappers("http://192.168.252.60:26657").queryDelegatee(addr, cb);
    }

    broadcastTrxSync(tx: TrxProto, cb?: (_: any) => void) {
        return new RpcMethodWrappers("http://192.168.252.60:26657").broadcastTrxSync(tx, cb);
    }

    queryTrx(txhash: string | Uint8Array, cb?: (_: any) => void) {
        return new RpcMethodWrappers("http://192.168.252.60:26657").queryTrx(txhash, cb);
    }

    queryBlockByHeight(height: number | string, cb?: (_: any) => void) {
        return new RpcMethodWrappers("http://192.168.252.60:26657").queryBlockByHeight(height, cb);
    }

    queryBlockByHash(hash: string | Uint8Array, cb?: (_: any) => void) {
        return new RpcMethodWrappers("http://192.168.252.60:26657").queryBlockByHash(hash, cb);
    }

    queryRule(cb?: (_: any) => void) {
        return new RpcMethodWrappers("http://192.168.252.60:26657").queryRule(cb);
    }

    vmCall(addr: string, to: string, height: number, data: string, cb?: (_: any) => void) {
        return new RpcMethodWrappers("http://192.168.252.60:26657").vmCall(addr, to, height, data, cb);
    }

    subscribe(url: string, query: string, cb: (resp: string) => void): Subscriber {
        return new RpcMethodWrappers("http://192.168.252.60:26657").subscribe(url, query, cb);
    }

    createContract(jsonInterface?: any, address?: string) {
        return new RpcMethodWrappers("http://192.168.252.60:26657").createContract(jsonInterface, address);
    }


}
