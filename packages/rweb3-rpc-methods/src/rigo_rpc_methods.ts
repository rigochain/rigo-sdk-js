import {RWeb3RequestManager} from 'rweb3-core';
import {RWeb3APIType} from 'rweb3-types';


export async function getBlockNumber(requestManager: RWeb3RequestManager) {
    // return requestManager.send({
    //     method: 'eth_accounts',
    //     params: [],
    // });
}


export async function queryAccount(requestManager: RWeb3RequestManager, address: string) {
    console.log("queryAccount")
    return requestManager.send(
        RWeb3APIType.GET,
        {
        method: 'queryAccount',
        params: [
            address
        ],
    });
}