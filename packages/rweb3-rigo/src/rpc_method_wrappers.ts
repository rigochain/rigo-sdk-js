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

import {DataFormat, RigoExecutionAPI, TrxProto} from 'rweb3-types';
import {RWeb3Context} from 'rweb3-core';
import {rigoRpcMethods} from 'rweb3-rpc-methods';
import {Bytes} from 'rweb3-utils';

export async function queryAccount<ReturnFormat extends DataFormat>(
    web3Context: RWeb3Context<RigoExecutionAPI>,
    addr: string
) {
    return rigoRpcMethods.queryAccount(
        web3Context.requestManager,
        addr);


}

export async function queryValidators<ReturnFormat extends DataFormat>(
    web3Context: RWeb3Context<RigoExecutionAPI>,
    height: number | string
) {
    return rigoRpcMethods.queryValidators(
        web3Context.requestManager,
        height);
}

export async function queryStakes<ReturnFormat extends DataFormat>(
    web3Context: RWeb3Context<RigoExecutionAPI>,
    addr: string
) {
    return rigoRpcMethods.queryStakes(
        web3Context.requestManager,
        addr);
}

export async function queryDelegatee<ReturnFormat extends DataFormat>(
    web3Context: RWeb3Context<RigoExecutionAPI>,
    addr: string
) {
    return rigoRpcMethods.queryDelegatee(
        web3Context.requestManager,
        addr);
}

export async function broadcastTrxSync<ReturnFormat extends DataFormat>(
    web3Context: RWeb3Context<RigoExecutionAPI>,
    tx: TrxProto
) {
    return rigoRpcMethods.broadcastTrxSync(
        web3Context.requestManager,
        tx);
}


export async function queryTrx<ReturnFormat extends DataFormat>(
    web3Context: RWeb3Context<RigoExecutionAPI>,
    txhash: string | Uint8Array
) {
    return rigoRpcMethods.queryTrx(
        web3Context.requestManager,
        txhash);
}

export async function queryBlockByHeight<ReturnFormat extends DataFormat>(
    web3Context: RWeb3Context<RigoExecutionAPI>,
    height: number | string
) {
    return rigoRpcMethods.queryBlockByHeight(
        web3Context.requestManager,
        height);
}

export async function queryBlockByHash<ReturnFormat extends DataFormat>(
    web3Context: RWeb3Context<RigoExecutionAPI>,
    byteHash: Bytes
) {
    return rigoRpcMethods.queryBlockByHash(
        web3Context.requestManager,
        byteHash);
}

export async function queryRule<ReturnFormat extends DataFormat>(
    web3Context: RWeb3Context<RigoExecutionAPI>
) {
    return rigoRpcMethods.queryRule(
        web3Context.requestManager
    );
}


export async function vmCall<ReturnFormat extends DataFormat>(
    web3Context: RWeb3Context<RigoExecutionAPI>,
    addr: string,
    to: string,
    height: number,
    data: string
) {
    return rigoRpcMethods.vmCall(
        web3Context.requestManager,
        addr,
        to,
        height,
        data
    );
}