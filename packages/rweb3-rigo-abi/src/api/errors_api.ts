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
import { AbiErrorFragment } from 'rweb3-types';
import { jsonInterfaceMethodToString, isAbiErrorFragment } from '../utils.js';

/**
 * Encodes the error name to its ABI signature, which are the sha3 hash of the error name including input types.
 */
export const encodeErrorSignature = (functionName: string | AbiErrorFragment): string => {
    if (typeof functionName !== 'string' && !isAbiErrorFragment(functionName)) {
        throw new AbiError('Invalid parameter value in encodeErrorSignature');
    }

    let name: string;

    if (functionName && (typeof functionName === 'function' || typeof functionName === 'object')) {
        name = jsonInterfaceMethodToString(functionName);
    } else {
        name = functionName;
    }

    return sha3Raw(name);
};
