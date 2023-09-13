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
import { sha3Raw } from 'rweb3-utils';
import { AbiError } from 'rweb3-errors';
import { AbiEventFragment } from 'rweb3-types';
import { jsonInterfaceMethodToString, isAbiEventFragment } from '../utils.js';

/**
 * Encodes the event name to its ABI signature, which are the sha3 hash of the event name including input types.
 * @param functionName - The event name to encode, or the {@link AbiEventFragment} object of the event. If string, it has to be in the form of `eventName(param1Type,param2Type,...)`. eg: myEvent(uint256,bytes32).
 * @returns - The ABI signature of the event.
 *
 * @example
 * ```ts
 * const event = web3.eth.abi.encodeEventSignature({
 *   name: "myEvent",
 *   type: "event",
 *   inputs: [
 *     {
 *       type: "uint256",
 *       name: "myNumber",
 *     },
 *     {
 *       type: "bytes32",
 *       name: "myBytes",
 *     },
 *   ],
 * });
 * console.log(event);
 * > 0xf2eeb729e636a8cb783be044acf6b7b1e2c5863735b60d6daae84c366ee87d97
 *
 *  const event = web3.eth.abi.encodeEventSignature({
 *   inputs: [
 *     {
 *       indexed: true,
 *       name: "from",
 *       type: "address",
 *     },
 *     {
 *       indexed: true,
 *       name: "to",
 *       type: "address",
 *     },
 *     {
 *       indexed: false,
 *       name: "value",
 *       type: "uint256",
 *     },
 *   ],
 *   name: "Transfer",
 *   type: "event",
 * });
 * console.log(event);
 * > 0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef
 * ```
 */
export const encodeEventSignature = (functionName: string | AbiEventFragment): string => {
    if (typeof functionName !== 'string' && !isAbiEventFragment(functionName)) {
        throw new AbiError('Invalid parameter value in encodeEventSignature');
    }

    let name: string;

    if (functionName && (typeof functionName === 'function' || typeof functionName === 'object')) {
        name = jsonInterfaceMethodToString(functionName);
    } else {
        name = functionName;
    }

    return sha3Raw(name);
};
