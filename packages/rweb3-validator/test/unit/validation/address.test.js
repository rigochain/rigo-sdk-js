"use strict";
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
exports.__esModule = true;
var address_1 = require("../../../src/validation/address");
var validation_1 = require("../../fixtures/validation");
describe('validation', function () {
    describe('address', function () {
        describe('isAddress', function () {
            describe('valid cases', function () {
                it.each(validation_1.validAddressData)('%s', function (input) {
                    expect((0, address_1.isAddress)(input)).toBeTruthy();
                });
            });
            describe('invalid cases', function () {
                it.each(validation_1.invalidAddressData)('%s', function (input) {
                    expect((0, address_1.isAddress)(input)).toBeFalsy();
                });
            });
        });
        describe('checkAddressCheckSum', function () {
            describe('valid cases', function () {
                it.each(validation_1.validCheckAddressCheckSumData)('%s', function (input) {
                    expect((0, address_1.checkAddressCheckSum)(input)).toBeTruthy();
                });
            });
        });
    });
});
