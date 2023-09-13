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
import { Eip838ExecutionError } from '@rigo/rweb3-errors';
import { decodeContractErrorData } from '../../src/decode_contract_error_data';

import { validDecodeContractErrorData, invalidDecodeContractErrorData } from '../fixtures/data';

describe('decodeContractErrorData', () => {
    describe('valid data', () => {
        it.each(validDecodeContractErrorData)(
            '%#: should pass for valid values: %j',
            ({ input: [abi, errorData], output }) => {
                const err = new Eip838ExecutionError(errorData);

                decodeContractErrorData(abi, err);

                expect(err.errorName).toEqual(output.errorName);
                expect(err.errorSignature).toEqual(output.errorSignature);
                expect(err.errorArgs?.message).toEqual(output.errorArgs?.message);
                expect(Number(err.errorArgs?.code)).toEqual(output.errorArgs?.code);
                expect(err.innerError?.code).toEqual(output.innerError?.code);
            },
        );
    });

    describe('invalid data', () => {
        it.each(invalidDecodeContractErrorData)(
            '%#: should throw for invalid values: %j',
            ({ input: [abi, errorData] }) => {
                // mock console.error
                const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => 'error');
                const err = new Eip838ExecutionError(errorData);
                decodeContractErrorData(abi, err);
                expect(consoleSpy).toHaveBeenCalled();
            },
        );
    });
});
