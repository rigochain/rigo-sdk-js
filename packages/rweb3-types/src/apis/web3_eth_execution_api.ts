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

import { EthExecutionAPI } from './eth_execution_api.js';
import {
    AccountObject,
    Address,
    BlockNumberOrTag,
    HexString32Bytes,
    TransactionInfo,
    Uint,
} from '../eth_types.js';

export type Web3EthExecutionAPI = EthExecutionAPI & {
    eth_pendingTransactions: () => TransactionInfo[];

    // https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1102.md
    eth_requestAccounts: () => Address[];

    // https://github.com/ethereum/EIPs/blob/master/EIPS/eip-695.md
    eth_chainId: () => Uint;

    web3_clientVersion: () => string;

    // https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1186.md
    eth_getProof: (
        address: Address,
        storageKeys: HexString32Bytes[],
        blockNumber: BlockNumberOrTag,
    ) => AccountObject;
};
