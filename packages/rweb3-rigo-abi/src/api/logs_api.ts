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
import { HexString, AbiParameter, DecodedParams } from 'rweb3-types';
import { decodeParameter, decodeParametersWith } from './parameters_api.js';

const STATIC_TYPES = ['bool', 'string', 'int', 'uint', 'address', 'fixed', 'ufixed'];

const _decodeParameter = (inputType: string, clonedTopic: string) =>
    inputType === 'string' ? clonedTopic : decodeParameter(inputType, clonedTopic);

/**
 * Decodes ABI-encoded log data and indexed topic data.
 * @param inputs - A {@link AbiParameter} input array. See the [Solidity documentation](https://docs.soliditylang.org/en/develop/types.html) for a list of types.
 * @param data - The ABI byte code in the `data` field of a log.
 * @param topics - An array with the index parameter topics of the log, without the topic[0] if its a non-anonymous event, otherwise with topic[0]
 * @returns - The result object containing the decoded parameters.
 *
 * @example
 * ```ts
 * let res = web3.eth.abi.decodeLog(
 *    [
 *      {
 *        type: "string",
 *        name: "myString",
 *      },
 *      {
 *        type: "uint256",
 *        name: "myNumber",
 *        indexed: true,
 *      },
 *      {
 *        type: "uint8",
 *        name: "mySmallNumber",
 *        indexed: true,
 *      },
 *    ],
 *    "0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000748656c6c6f252100000000000000000000000000000000000000000000000000",
 *    [
 *      "0x000000000000000000000000000000000000000000000000000000000000f310",
 *      "0x0000000000000000000000000000000000000000000000000000000000000010",
 *    ]
 *  );
 * > {
 *  '0': 'Hello%!',
 *  '1': 62224n,
 *  '2': 16n,
 *  __length__: 3,
 *  myString: 'Hello%!',
 *  myNumber: 62224n,
 *  mySmallNumber: 16n
 * }
 * ```
 */
export const decodeLog = <ReturnType extends DecodedParams>(
    inputs: Array<AbiParameter>,
    data: HexString,
    topics: string | string[],
) => {
    const clonedTopics = Array.isArray(topics) ? topics : [topics];

    const indexedInputs: Record<number, AbiParameter> = {};
    const nonIndexedInputs: Record<number, AbiParameter> = {};

    for (const [i, input] of inputs.entries()) {
        if (input.indexed) {
            indexedInputs[i] = input;
        } else {
            nonIndexedInputs[i] = input;
        }
    }

    const decodedNonIndexedInputs: DecodedParams = data
        ? decodeParametersWith(Object.values(nonIndexedInputs), data, true)
        : { __length__: 0 };

    // If topics are more than indexed inputs, that means first topic is the event signature
    const offset = clonedTopics.length - Object.keys(indexedInputs).length;

    const decodedIndexedInputs = Object.values(indexedInputs).map((input, index) =>
        STATIC_TYPES.some((s) => input.type.startsWith(s))
            ? _decodeParameter(input.type, clonedTopics[index + offset])
            : clonedTopics[index + offset],
    );

    const returnValues: DecodedParams = { __length__: 0 };

    let indexedCounter = 0;
    let nonIndexedCounter = 0;

    for (const [i, res] of inputs.entries()) {
        returnValues[i] = res.type === 'string' ? '' : undefined;

        if (indexedInputs[i]) {
            returnValues[i] = decodedIndexedInputs[indexedCounter];
            indexedCounter += 1;
        }

        if (nonIndexedInputs[i]) {
            returnValues[i] = decodedNonIndexedInputs[String(nonIndexedCounter)];
            nonIndexedCounter += 1;
        }

        if (res.name) {
            returnValues[res.name] = returnValues[i];
        }

        returnValues.__length__ += 1;
    }

    return returnValues as ReturnType;
};
