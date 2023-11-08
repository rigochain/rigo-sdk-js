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
import { encodeErrorSignature } from '../../../src/api/errors_api';
import { validErrorsSignatures, invalidErrorSignatures } from '../../fixtures/data';

describe('errors_api', () => {
    describe('encodeErrorSignature', () => {
        describe('valid data', () => {
            it.each(validErrorsSignatures)(
                'should pass for valid values: %s',
                ({ input, output }) => {
                    expect(encodeErrorSignature(input)).toEqual(output);
                },
            );
        });

        describe('invalid data', () => {
            it.each(invalidErrorSignatures)(
                'should pass for valid values: %s',
                ({ input, output }) => {
                    expect(() => encodeErrorSignature(input)).toThrow(output);
                },
            );
        });
    });
});
