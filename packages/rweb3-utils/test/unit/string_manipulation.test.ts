﻿import {
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
