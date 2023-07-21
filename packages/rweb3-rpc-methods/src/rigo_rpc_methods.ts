import {RWeb3RequestManager} from 'rweb3-core';


export async function getBlockNumber(requestManager: RWeb3RequestManager) {
    // return requestManager.send({
    //     method: 'eth_accounts',
    //     params: [],
    // });
}


export async function queryAccount(requestManager: RWeb3RequestManager, address: string) {
    console.log("queryAccount")
    return requestManager.send({
        method: 'get',
        function: 'queryAccount',
        params: [
            address
        ],
    });
}