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

import {RWeb3Context} from 'rweb3-core';
import {Bytes, TrxProto} from 'rweb3-utils';
import * as rpcMethodsWrappers from './rpc_method_wrappers.js';
import {consensusParams, unconfirmedTxs} from "./rpc_method_wrappers.js";

export class RWeb3Rigo extends RWeb3Context {
    public constructor() {
        super();
    }

    getUrl(): string {
        // TODO : Validate RequestManger
        return this.requestManager.provider.getClientUrl();
    }

    health() {
        return rpcMethodsWrappers.health(this);
    }

    status() {
        return rpcMethodsWrappers.status(this);
    }

    netInfo() {
        return rpcMethodsWrappers.netInfo(this);
    }

    blockchain(minHeight?: number | string, maxHeight?: number | string) {
        return rpcMethodsWrappers.blockchain(this, minHeight, maxHeight);
    }

    block(height?: string | number) {
        return rpcMethodsWrappers.block(this, height);
    }

    blockByHash(hash: Uint8Array) {
        return rpcMethodsWrappers.blockByHash(this, hash);
    }

    blockResults(height?: string | number) {
        return rpcMethodsWrappers.blockResults(this, height);
    }

    commit(height?: string | number) {
        return rpcMethodsWrappers.commit(this, height);
    }

    validators(height?: string | number, page?: number, per_page?: number) {
        return rpcMethodsWrappers.validators(this, height, page, per_page);
    }

    genesis() {
        return rpcMethodsWrappers.genesis(this);
    }

    genesisChunked(chunk: number | string) {
        return rpcMethodsWrappers.genesisChunked(this, chunk);
    }

    dumpConsensusState() {
        return rpcMethodsWrappers.dumpConsensusState(this);
    }

    consensusState() {
        return rpcMethodsWrappers.consensusState(this);
    }

    consensusParams(height?: string | number) {
        return rpcMethodsWrappers.consensusParams(this, height);
    }

    unconfirmedTxs(limit?: number) {
        return rpcMethodsWrappers.unconfirmedTxs(this, limit);
    }

    txSearch(query: string, prove?: boolean, page?: number, per_page?: number) {
        return rpcMethodsWrappers.txSearch(this, query, prove, page, per_page);
    }

    tx(hash: string | Uint8Array) {
        return rpcMethodsWrappers.tx(this, hash);
    }





    account(addr: string) {
        return rpcMethodsWrappers.account(this, addr);
    }


    /**
     * { key: '8DC41A86B91EB88D82489C4D037AE9FFCA65CFBF', value: null }
     **/
    stakes(addr: string) {
        if (!addr.startsWith('0x')) {
            addr = '0x' + addr;
        }

        return rpcMethodsWrappers.stakes(this, addr);
    }

    delegatee(addr: string) {
        return rpcMethodsWrappers.delegatee(this, addr);
    }

    broadcastTrxSync(tx: TrxProto) {
        return rpcMethodsWrappers.broadcastTrxSync(this, tx);
    }

    /**
     * {
     *   hash: '9F1A995464FB3090FED047E71BF4A6FD0B4CEC5DA3235C4B5907EFE519AE70A4',
     *   height: '1817748',
     *   index: 0,
     *   tx_result: {
     *     code: 0,
     *     data: null,
     *     log: '',
     *     info: '',
     *     gas_wanted: '1000000000000000',
     *     gas_used: '1000000000000000',
     *     events: [ [Object] ],
     *     codespace: ''
     *   },
     *   tx: 'CAEQwJmgm9qU1rgXGFUiFFAbfpCsSCQ7f7f/g5YVdU93HdwhKhRQG36QrEgkO3+3/4OWFXVPdx3cITIAOgcDjX6kxoAAQANKIgog/LWL4tBsA8WUEjHdlg1OB4tCr4IYi81yyJ0b5otjzO5SQRQpj6L5RUqZmopafhh9hN1iwNNHwosLDoLMr7WLvwPgJpHimQ+ICa5T+HlJoyqg8oOKNJTfPN1fU9QVbCuohcUB',
     *   proof: {
     *     root_hash: 'C9F37A31D60DCD40326A0457A67737C8FE77828D73045A357466B0F43CA5E4EB',
     *     data: 'CAEQwJmgm9qU1rgXGFUiFFAbfpCsSCQ7f7f/g5YVdU93HdwhKhRQG36QrEgkO3+3/4OWFXVPdx3cITIAOgcDjX6kxoAAQANKIgog/LWL4tBsA8WUEjHdlg1OB4tCr4IYi81yyJ0b5otjzO5SQRQpj6L5RUqZmopafhh9hN1iwNNHwosLDoLMr7WLvwPgJpHimQ+ICa5T+HlJoyqg8oOKNJTfPN1fU9QVbCuohcUB',
     *     proof: {
     *       total: '1',
     *       index: '0',
     *       leaf_hash: 'yfN6MdYNzUAyagRXpnc3yP53go1zBFo1dGaw9Dyl5Os=',
     *       aunts: []
     *     }
     *   }
     * }
     **/
    queryTrx(txhash: string | Uint8Array) {
        let byteTxHash: Bytes;

        if (typeof txhash === 'string') {
            byteTxHash = Bytes.fromHex(txhash);
        }

        // @ts-ignore
        return rpcMethodsWrappers.queryTrx(this, byteTxHash);
    }


    /**
     * { block_id: { hash: '', parts: { total: 0, hash: '' } }, block: null }
     **/
    queryBlockByHash(hash: string) {
        let byteHash: Bytes;

        if (typeof hash === 'string') {
            byteHash = Bytes.fromHex(hash);
        }

        // @ts-ignore
        return rpcMethodsWrappers.queryBlockByHash(this, byteHash);
    }

    /**
     * {
     *   value: {
     *     version: '1',
     *     maxValidatorCnt: '21',
     *     minValidatorStake: '0x5ca4ec2a79a7f67000000',
     *     rewardPerPower: '4756468797',
     *     lazyRewardBlocks: '2592000',
     *     lazyApplyingBlocks: '259200',
     *     gasPrice: '0x3b9aca00',
     *     minTrxFee: '0x38d7ea4c68000',
     *     minVotingPeriodBlocks: '259200',
     *     maxVotingPeriodBlocks: '2592000',
     *     minSelfStakeRatio: '50',
     *     maxUpdatableStakeRatio: '30',
     *     slashRatio: '50'
     *   }
     * }
     **/
    rule() {
        return rpcMethodsWrappers.rule(this);
    }

    vmCall(addr: string, to: string, height: number, data: string) {
        return rpcMethodsWrappers.vmCall(this, addr, to, height, data);
    }
}
