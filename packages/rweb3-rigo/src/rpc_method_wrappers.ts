﻿/*
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

import {RigoExecutionAPI} from 'rweb3-types';
import {RWeb3Context} from 'rweb3-core';
import {rigoRpcMethods} from 'rweb3-rpc-methods';
import {TrxProto} from "rweb3-types";


export async function health(web3Context: RWeb3Context<RigoExecutionAPI>) {
    return rigoRpcMethods.health(web3Context.requestManager);
}

export async function status(web3Context: RWeb3Context<RigoExecutionAPI>) {
    return rigoRpcMethods.status(web3Context.requestManager);
}

export async function netInfo(web3Context: RWeb3Context<RigoExecutionAPI>) {
    return rigoRpcMethods.netInfo(web3Context.requestManager);
}

export async function blockchain(web3Context: RWeb3Context<RigoExecutionAPI>, minHeight?: number | string, maxHeight?: number | string) {
    return rigoRpcMethods.blockchain(web3Context.requestManager, minHeight, maxHeight);
}

export async function block(web3Context: RWeb3Context<RigoExecutionAPI>, height?: string | number) {
    return rigoRpcMethods.block(web3Context.requestManager, height);
}


export async function blockByHash(web3Context: RWeb3Context<RigoExecutionAPI>, hash: Uint8Array) {
    return rigoRpcMethods.blockByHash(web3Context.requestManager, hash);
}

export async function blockResults(web3Context: RWeb3Context<RigoExecutionAPI>, height?: string | number) {
    return rigoRpcMethods.blockResults(web3Context.requestManager, height);
}

export async function commit(
    web3Context: RWeb3Context<RigoExecutionAPI>,
    height?: number | string
) {
    return rigoRpcMethods.commit(web3Context.requestManager, height);
}


export async function validators(
    web3Context: RWeb3Context<RigoExecutionAPI>,
    height?: number | string,
    page?: number | string,
    per_page?: number | string
) {
    return rigoRpcMethods.validators(web3Context.requestManager, height, page, per_page);
}

export async function genesis(web3Context: RWeb3Context<RigoExecutionAPI>) {
    return rigoRpcMethods.genesis(web3Context.requestManager);
}


export async function genesisChunked(web3Context: RWeb3Context<RigoExecutionAPI>, chunk: number | string) {
    return rigoRpcMethods.genesisChunked(web3Context.requestManager, chunk);
}

export async function dumpConsensusState(web3Context: RWeb3Context<RigoExecutionAPI>) {
    return rigoRpcMethods.dumpConsensusState(web3Context.requestManager);
}

export async function consensusState(web3Context: RWeb3Context<RigoExecutionAPI>) {
    return rigoRpcMethods.consensusState(web3Context.requestManager);
}

export async function consensusParams(web3Context: RWeb3Context<RigoExecutionAPI>, height?: number | string) {
    return rigoRpcMethods.consensusParams(web3Context.requestManager, height);
}

export async function unconfirmedTxs(web3Context: RWeb3Context<RigoExecutionAPI>, limit: number | string) {
    return rigoRpcMethods.unconfirmedTxs(web3Context.requestManager, limit);
}

export async function txSearch(web3Context: RWeb3Context<RigoExecutionAPI>, query: string, prove?: boolean, page?: number | string, per_page?: number | string, order_by?: string) {
    return rigoRpcMethods.txSearch(web3Context.requestManager, query, prove, page, per_page, order_by);
}

export async function tx(web3Context: RWeb3Context<RigoExecutionAPI>, hash: string | Uint8Array) {
    return rigoRpcMethods.tx(web3Context.requestManager, hash);
}

export async function abciInfo(web3Context: RWeb3Context<RigoExecutionAPI>) {
    return rigoRpcMethods.abciInfo(web3Context.requestManager);
}

export async function abciQuery(web3Context: RWeb3Context<RigoExecutionAPI>, path: string, data: string, height?: number | string, prove?: boolean) {
    return rigoRpcMethods.abciQuery(web3Context.requestManager, path, data, height, prove);
}

export async function checkTx(web3Context: RWeb3Context<RigoExecutionAPI>, tx: string) {
    return rigoRpcMethods.checkTx(web3Context.requestManager, tx);
}

export async function numUnconfirmedTxs(web3Context: RWeb3Context<RigoExecutionAPI>) {
    return rigoRpcMethods.numUnconfirmedTxs(web3Context.requestManager);
}


export async function broadcastEvidence(web3Context: RWeb3Context<RigoExecutionAPI>, evidence: string) {
    return rigoRpcMethods.broadcastEvidence(web3Context.requestManager, evidence);
}

export async function broadcastTxSync(web3Context: RWeb3Context<RigoExecutionAPI>, tx: TrxProto) {
    return rigoRpcMethods.broadcastTxSync(web3Context.requestManager, tx);
}

export async function broadcastTxAsync(web3Context: RWeb3Context<RigoExecutionAPI>, tx: TrxProto) {
    return rigoRpcMethods.broadcastTxAsync(web3Context.requestManager, tx);
}

export async function broadcastTxCommit(web3Context: RWeb3Context<RigoExecutionAPI>, tx: TrxProto) {
    return rigoRpcMethods.broadcastTxCommit(web3Context.requestManager, tx);
}

export async function delegatee(web3Context: RWeb3Context<RigoExecutionAPI>, addr: string) {
    return rigoRpcMethods.delegatee(web3Context.requestManager, addr);
}

export async function rule(web3Context: RWeb3Context<RigoExecutionAPI>) {
    return rigoRpcMethods.rule(web3Context.requestManager);
}

export async function account(web3Context: RWeb3Context<RigoExecutionAPI>, addr: string) {
    return rigoRpcMethods.account(web3Context.requestManager, addr);
}

export async function proposals(web3Context: RWeb3Context<RigoExecutionAPI>, txHash: string) {
    return rigoRpcMethods.proposals(web3Context.requestManager, txHash);
}

export async function stakes(web3Context: RWeb3Context<RigoExecutionAPI>, addr: string) {
    return rigoRpcMethods.stakes(web3Context.requestManager, addr);
}
export async function vmCall(
    web3Context: RWeb3Context<RigoExecutionAPI>,
    addr: string,
    to: string,
    height: number,
    data: string,
) {
    return rigoRpcMethods.vmCall(web3Context.requestManager, addr, to, height, data);
}



