import {RWeb3RequestManager} from 'rweb3-core';


export async function getBlockNumber(requestManager: RWeb3RequestManager) {
    return requestManager.send({
        method: 'eth_accounts',
        params: [],
    });
}
