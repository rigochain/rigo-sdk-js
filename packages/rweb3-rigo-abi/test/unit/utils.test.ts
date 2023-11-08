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
import { jsonInterfaceMethodToString, isAbiConstructorFragment } from '../../src/utils';
import {
    jsonInterfaceInvalidData,
    jsonInterfaceValidData,
    validIsAbiConstructorFragment,
    invalidIsAbiConstructorFragment,
} from '../fixtures/data';

describe('utils', () => {
    describe('jsonInterfaceMethodToString', () => {
        describe('valid cases', () => {
            it.each(jsonInterfaceValidData)('%s', (input, output) => {
                expect(jsonInterfaceMethodToString(input)).toEqual(output);
            });
        });
        describe('invalid cases', () => {
            // TODO: To be done after `sha3` is implemented
            it.todo('should throw error for invalid cases');
        });
    });
    describe('jsonInterface', () => {
        describe('valid cases', () => {
            it.each(jsonInterfaceValidData)('%s', (input, output) => {
                expect(jsonInterfaceMethodToString(input)).toEqual(output);
            });
        });
        describe('invalid cases', () => {
            it.each(jsonInterfaceInvalidData)('%s', (input, output) => {
                expect(() => jsonInterfaceMethodToString(input)).toThrow(output);
            });
        });
    });
    describe('isAbiConstructorFragment', () => {
        describe('valid cases', () => {
            it.each(validIsAbiConstructorFragment)('%s', ({ input }) => {
                expect(isAbiConstructorFragment(input)).toBeTruthy();
            });
        });

        describe('invalid cases', () => {
            it.each(invalidIsAbiConstructorFragment)('%s', ({ input }) => {
                expect(isAbiConstructorFragment(input)).toBeFalsy();
            });
        });
    });
});
