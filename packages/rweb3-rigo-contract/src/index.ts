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

/**
 * The `web3.eth.Contract` object makes it easy to interact with smart contracts on the Ethereum blockchain.
 * When you create a new contract object you give it the JSON interface of the respective smart contract and
 * web3 will auto convert all calls into low level ABI calls over RPC for you.
 * This allows you to interact with smart contracts as if they were JavaScript objects.
 *
 * To use it standalone:
 *
 * ```ts
 * const Contract = require('web3-eth-contract');
 *
 * // set provider for all later instances to use
 * Contract.setProvider('ws://localhost:8546');
 *
 * const contract = new Contract(jsonInterface, address);
 *
 * contract.methods.somFunc().send({from: ....})
 * .on('receipt', function(){
 *    ...
 * });
 * ```
 */
/**
 * This comment _supports3_ [Markdown](https://marked.js.org/)
 */
import { Contract } from './contract.js';

export * from './encoding.js';

export * from './contract.js';
export * from './log_subscription.js';
export * from './types.js';

export default Contract;
