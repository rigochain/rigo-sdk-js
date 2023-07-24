import {DataFormat, RigoExecutionAPI} from 'rweb3-types';
import {RWeb3Context} from 'rweb3-core';
import {rigoRpcMethods} from 'rweb3-rpc-methods';

export async function queryAccount<ReturnFormat extends DataFormat>(
    web3Context: RWeb3Context<RigoExecutionAPI>,
    addr: string) {

    return rigoRpcMethods.queryAccount(
        web3Context.requestManager,
        addr);
}