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
import {
    fromTwosComplement,
    leftPad,
    padLeft,
    padRight,
    rightPad,
    toTwosComplement,
} from '../../src/string_manipulation';

import {
    padLeftData,
    padInvalidData,
    padRightData,
    toTwosComplementData,
    toTwosComplementInvalidData,
    fromTwosComplementData,
    fromTwosComplementInvalidData,
} from '../fixtures/string_manipulation';

describe('string manipulation tests', () => {
    describe('padLeft', () => {
        describe('valid cases', () => {
            it.each(padLeftData)('%s', (input, output) => {
                expect(padLeft(input[0], input[1], input[2])).toEqual(output);
            });
        });
        describe('invalid cases', () => {
            it.each(padInvalidData)('%s', (input, output) => {
                expect(() => padLeft(input[0], input[1], input[2])).toThrow(output);
            });
        });
    });

    describe('padRight', () => {
        describe('valid cases', () => {
            it.each(padRightData)('%s', (input, output) => {
                expect(padRight(input[0], input[1], input[2])).toEqual(output);
            });
        });
        describe('invalid cases', () => {
            it.each(padInvalidData)('%s', (input, output) => {
                expect(() => padRight(input[0], input[1], input[2])).toThrow(output);
            });
        });
    });

    describe('leftPad', () => {
        describe('valid cases', () => {
            it.each(padLeftData)('%s', (input, output) => {
                expect(leftPad(input[0], input[1], input[2])).toEqual(output);
            });
        });
        describe('invalid cases', () => {
            it.each(padInvalidData)('%s', (input, output) => {
                expect(() => leftPad(input[0], input[1], input[2])).toThrow(output);
            });
        });
    });

    describe('rightPad', () => {
        describe('valid cases', () => {
            it.each(padRightData)('%s', (input, output) => {
                expect(rightPad(input[0], input[1], input[2])).toEqual(output);
            });
        });
        describe('invalid cases', () => {
            it.each(padInvalidData)('%s', (input, output) => {
                expect(() => rightPad(input[0], input[1], input[2])).toThrow(output);
            });
        });
    });

    describe('toTwosComplement', () => {
        describe('valid cases', () => {
            it.each(toTwosComplementData)('%s', (input, output) => {
                expect(toTwosComplement(input[0], input[1])).toEqual(output);
            });
        });
        describe('invalid cases', () => {
            it.each(toTwosComplementInvalidData)('%s', (input, output) => {
                expect(() => toTwosComplement(input[0], input[1])).toThrow(output);
            });
        });
    });

    describe('fromTwosComplement', () => {
        describe('valid cases', () => {
            it.each(fromTwosComplementData)('%s', (input, output) => {
                expect(fromTwosComplement(input[0], input[1])).toEqual(output);
            });
        });

        describe('invalid cases', () => {
            it.each(fromTwosComplementInvalidData)('%s', (input, output) => {
                expect(() => fromTwosComplement(input[0], input[1])).toThrow(output);
            });
        });
    });
});
