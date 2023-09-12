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

import Rigo from 'rweb3-rigo';
import { Contract } from 'rweb3-rigo-contract';

import {
    decodeLog,
    decodeParameter,
    decodeParameters,
    encodeFunctionCall,
    encodeFunctionSignature,
    encodeParameter,
    encodeParameters,
} from 'rweb3-rigo-abi';

export interface RWeb3RigoInterface extends Rigo {
    Contract: typeof Contract;
    abi: {
        encodeEventSignature: typeof encodeFunctionSignature;
        encodeFunctionCall: typeof encodeFunctionCall;
        encodeFunctionSignature: typeof encodeFunctionSignature;
        encodeParameter: typeof encodeParameter;
        encodeParameters: typeof encodeParameters;
        decodeParameter: typeof decodeParameter;
        decodeParameters: typeof decodeParameters;
        decodeLog: typeof decodeLog;
    };
}
