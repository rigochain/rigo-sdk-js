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
import { AbiError } from '@rigo/rweb3-errors';
import { sha3Raw } from '@rigo/rweb3-utils';
import { AbiFunctionFragment } from '@rigo/rweb3-types';
import { isAbiFunctionFragment, jsonInterfaceMethodToString } from '../utils.js';
import { encodeParameters } from './parameters_api.js';

export const encodeFunctionSignature = (functionName: string | AbiFunctionFragment): string => {
    if (typeof functionName !== 'string' && !isAbiFunctionFragment(functionName)) {
        throw new AbiError('Invalid parameter value in encodeFunctionSignature');
    }

    let name: string;

    if (functionName && (typeof functionName === 'function' || typeof functionName === 'object')) {
        name = jsonInterfaceMethodToString(functionName);
    } else {
        name = functionName;
    }

    return sha3Raw(name).slice(0, 10);
};
export const encodeFunctionCall = (
    jsonInterface: AbiFunctionFragment,
    params: unknown[],
): string => {
    if (!isAbiFunctionFragment(jsonInterface)) {
        throw new AbiError('Invalid parameter value in encodeFunctionCall');
    }

    return `${encodeFunctionSignature(jsonInterface)}${encodeParameters(
        jsonInterface.inputs ?? [],
        params ?? [],
    ).replace('0x', '')}`;
};
