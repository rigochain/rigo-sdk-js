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

import { checkAddressCheckSum, isAddress } from '../../../src/validation/address';
import {
    validCheckAddressCheckSumData,
    invalidAddressData,
    validAddressData,
} from '../../fixtures/validation';

describe('validation', () => {
    describe('address', () => {
        describe('isAddress', () => {
            describe('valid cases', () => {
                it.each(validAddressData)('%s', (input) => {
                    expect(isAddress(input)).toBeTruthy();
                });
            });

            describe('invalid cases', () => {
                it.each(invalidAddressData)('%s', (input) => {
                    expect(isAddress(input)).toBeFalsy();
                });
            });
        });

        describe('checkAddressCheckSum', () => {
            describe('valid cases', () => {
                it.each(validCheckAddressCheckSumData)('%s', (input) => {
                    expect(checkAddressCheckSum(input)).toBeTruthy();
                });
            });
        });
    });
});
