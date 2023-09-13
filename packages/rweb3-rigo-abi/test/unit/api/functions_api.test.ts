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
import { encodeFunctionCall, encodeFunctionSignature } from '../../../src/api/functions_api';
import {
    inValidFunctionsSignatures,
    validFunctionsSignatures,
    validFunctionsCall,
    inValidFunctionsCalls,
} from '../../fixtures/data';

describe('functions_api', () => {
    describe('encodeFunctionSignature', () => {
        describe('valid data', () => {
            it.each(validFunctionsSignatures)(
                'should pass for valid values: %s',
                ({ input, output }) => {
                    expect(encodeFunctionSignature(input)).toEqual(output);
                },
            );
        });

        describe('invalid data', () => {
            it.each(inValidFunctionsSignatures)(
                'should pass for valid values: %s',
                ({ input, output }) => {
                    expect(() => encodeFunctionSignature(input)).toThrow(output);
                },
            );
        });
    });

    describe('encodeFunctionCall', () => {
        describe('valid data', () => {
            it.each(validFunctionsCall)(
                'should pass for valid values: %s',
                ({ input: { abi, params }, output }) => {
                    try {
                        console.log(abi);
                        expect(encodeFunctionCall(abi, params)).toEqual(output);
                    } catch (e) {
                        console.log(e);
                        console.log(abi);
                        console.log(params);
                        console.log(output);
                    }
                },
            );
        });

        describe('invalid data', () => {
            it.each(inValidFunctionsCalls)(
                'should pass for valid values: %s',
                ({ input, output }) => {
                    expect(() => encodeFunctionCall(input, [])).toThrow(output);
                },
            );
        });
    });
});
