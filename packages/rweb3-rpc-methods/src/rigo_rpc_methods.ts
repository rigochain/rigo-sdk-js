import {RWeb3RequestManager} from 'rweb3-core';


export async function getBlockNumber(requestManager: RWeb3RequestManager) {
    // return requestManager.send({
    //     method: 'eth_accounts',
    //     params: [],
    // });
}


export async function queryAccount(requestManager: RWeb3RequestManager, addr: string) {

    return requestManager.send(
        {
            method: 'account',
            params: {
                addr: addr
            }
        });
}

export async function queryValidators(requestManager: RWeb3RequestManager, height: number | string) {

}

export async function queryStakes(requestManager: RWeb3RequestManager, addr: string) {


}

export async function queryDelegatee(requestManager: RWeb3RequestManager, addr: string) {

}


export async function broadcastTrxSync(requestManager: RWeb3RequestManager, addr: string) {


}

export async function queryTrx(requestManager: RWeb3RequestManager, addr: string) {

}

export async function queryBlockByHeight(requestManager: RWeb3RequestManager, addr: string) {

}

export async function queryBlockByHash(requestManager: RWeb3RequestManager, addr: string) {


}

export async function queryRule(requestManager: RWeb3RequestManager, addr: string) {


}

export async function vmCall(requestManager: RWeb3RequestManager, addr: string) {


}