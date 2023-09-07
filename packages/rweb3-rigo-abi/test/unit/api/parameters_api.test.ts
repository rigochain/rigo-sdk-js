import { AbiInput } from 'rweb3-types';
import { decodeParameters, encodeParameters } from '../../../src/api/parameters_api';
import {
    inValidDecodeParametersData,
    inValidEncodeParametersData,
    validDecodeParametersData,
    validEncodeParametersData,
    validEncodeDecodeParametersData,
    validEncodeDoesNotMutateData,
} from '../../fixtures/data';

describe('parameters_api', () => {
    describe('encodeParameters', () => {
        describe('valid data', () => {
            it.each(validEncodeParametersData)(
                '%#: should pass for valid values: %j',
                ({ input: [abi, params], output }) => {
                    const expected = encodeParameters(abi, params);
                    expect(JSON.parse(JSON.stringify(expected))).toEqual(output);
                },
            );
        });

        describe('invalid data', () => {
            it.each(inValidEncodeParametersData)(
                '%#: should not pass for invalid values: %j',
                ({ input: [abi, params], output }) => {
                    expect(() => encodeParameters(abi, params)).toThrow(output);
                },
            );
        });
    });

    describe('encodeParametersDoesNotMutate', () => {
        describe('valid data', () => {
            it.each(validEncodeDoesNotMutateData)(
                '%#: should pass for valid values: %j',
                ({ input: [abi, params], output, expectedInput }) => {
                    const expected = encodeParameters(abi, params);
                    expect(JSON.parse(JSON.stringify(expected))).toEqual(output);
                    // check that params has not been mutated
                    expect(JSON.parse(JSON.stringify(params))).toEqual(
                        JSON.parse(JSON.stringify(expectedInput)),
                    );
                },
            );
        });
    });

    describe('decodeParameters', () => {
        describe('valid data', () => {
            it.each(validDecodeParametersData)(
                '%#: should pass for valid values: %j',
                ({ input: [abi, bytes], outputResult }) => {
                    // Output returns mix of array and object which can't be matched in
                    // jest, so have to use stringify+parse to match
                    // {
                    //   '0': [ '34', '255' ],
                    //   '1': [
                    //     '42',
                    //     '56',
                    //     [ '45', '78', propertyOne: '45', propertyTwo: '78' ],
                    //     propertyOne: '42',
                    //     propertyTwo: '56',
                    //     ChildStruct: [ '45', '78', propertyOne: '45', propertyTwo: '78' ]
                    //   ],
                    //   __length__: 2
                    // }
                    expect(JSON.parse(JSON.stringify(decodeParameters(abi, bytes)))).toEqual(
                        outputResult,
                    );
                },
            );
        });

        describe('invalid data', () => {
            it.each(inValidDecodeParametersData)(
                '%#: should not pass for invalid values: %j',
                ({ input: [abi, bytes], output }) => {
                    expect(() => decodeParameters(abi, bytes)).toThrow(output);
                },
            );
        });
    });

    describe('encode and decode', () => {
        describe('input should be the same as returned value from encode and decode', () => {
            it.each(validEncodeDecodeParametersData)(
                '%#: should pass for valid values: %j',
                ({ input: [abi, params], output, outputResult }) => {
                    const rwAbi = abi as AbiInput[];
                    const encodedBytes = encodeParameters(abi, params);
                    expect(JSON.parse(JSON.stringify(encodedBytes))).toEqual(output);

                    const decodedParams = decodeParameters(rwAbi, encodedBytes);
                    expect(JSON.parse(JSON.stringify(decodedParams))).toEqual(outputResult);
                },
            );
        });
    });
});
