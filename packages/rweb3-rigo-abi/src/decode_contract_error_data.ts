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
import { Eip838ExecutionError } from '@rigochain/rweb3-errors';
import { AbiErrorFragment } from '@rigochain/rweb3-types';

import { encodeErrorSignature } from './api/errors_api.js';
import { decodeParameters } from './api/parameters_api.js';
import { jsonInterfaceMethodToString } from './utils.js';

export const decodeContractErrorData = (
    errorsAbi: AbiErrorFragment[],
    error: Eip838ExecutionError,
) => {
    if (error?.data) {
        let errorName: string | undefined;
        let errorSignature: string | undefined;
        let errorArgs: { [K in string]: unknown } | undefined;
        try {
            const errorSha = error.data.slice(0, 10);
            const errorAbi = errorsAbi.find((abi) =>
                encodeErrorSignature(abi).startsWith(errorSha),
            );

            if (errorAbi?.inputs) {
                errorName = errorAbi.name;
                errorSignature = jsonInterfaceMethodToString(errorAbi);
                // decode abi.inputs according to EIP-838
                errorArgs = decodeParameters([...errorAbi.inputs], error.data.substring(10));
            }
        } catch (err) {
            console.error(err);
        }
        if (errorName) {
            error.setDecodedProperties(errorName, errorSignature, errorArgs);
        }
    }
};
