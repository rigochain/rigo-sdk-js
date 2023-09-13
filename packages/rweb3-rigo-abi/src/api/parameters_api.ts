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
import { AbiError } from 'rweb3-errors';
import { ParamType, Result } from '@ethersproject/abi';
import { HexString, AbiInput, DecodedParams } from 'rweb3-types';
import ethersAbiCoder from '../ethers_abi_coder.js';
import { formatParam, isAbiFragment, mapTypes, modifyParams } from '../utils.js';

export const encodeParameters = (abi: ReadonlyArray<AbiInput>, params: unknown[]): string => {
    try {
        const modifiedTypes = mapTypes(
            Array.isArray(abi) ? (abi as AbiInput[]) : ([abi] as unknown as AbiInput[]),
        );
        const modifiedParams: Array<unknown> = [];
        for (const [index, param] of params.entries()) {
            const item = modifiedTypes[index];
            let type: string;

            if (isAbiFragment(item) && item.type) {
                // We may get a named type of shape {name, type}
                type = item.type;
            } else {
                type = item as unknown as string;
            }

            const newParam = formatParam(type, param);

            if (typeof type === 'string' && type.includes('tuple')) {
                const coder = ethersAbiCoder._getCoder(ParamType.from(type));
                modifyParams(coder, [newParam]);
            }

            modifiedParams.push(newParam);
        }
        return ethersAbiCoder.encode(
            modifiedTypes.map((p) => ParamType.from(p)),
            modifiedParams,
        );
    } catch (err) {
        throw new AbiError(`Parameter encoding error`, err as Error);
    }
};

export const encodeParameter = (abi: AbiInput, param: unknown): string =>
    encodeParameters([abi], [param]);

// If encoded param is an array and there are mixed on integer and string keys
const isParamRequiredToConvert = (data: Result): boolean =>
    Array.isArray(data) &&
    Object.keys(data).filter((k) => Number.isInteger(+k)).length !== Object.keys(data).length;

// Ethers-Encoder return the decoded result as an array with additional string indexes for named params
// We want these to be converted to an object with named keys
const formatArrayResToObject = (data: Result): DecodedParams => {
    const returnValue: DecodedParams = {
        __length__: 0,
    };

    for (const key of Object.keys(data)) {
        returnValue[key] =
            Array.isArray(data[key]) && isParamRequiredToConvert(data[key] as Result)
                ? formatArrayResToObject(data[key] as Result)
                : data[key];

        returnValue.__length__ += Number.isInteger(+key) ? 1 : 0;
    }
    return returnValue;
};

/**
 * Should be used to decode list of params
 */
export const decodeParametersWith = (
    abis: AbiInput[],
    bytes: HexString,
    loose: boolean,
): { [key: string]: unknown; __length__: number } => {
    try {
        if (abis.length > 0 && (!bytes || bytes === '0x' || bytes === '0X')) {
            throw new AbiError(
                "Returned values aren't valid, did it run Out of Gas? " +
                    'You might also see this error if you are not using the ' +
                    'correct ABI for the contract you are retrieving data from, ' +
                    'requesting data from a block number that does not exist, ' +
                    'or querying a node which is not fully synced.',
            );
        }
        const res = ethersAbiCoder.decode(
            mapTypes(abis).map((p) => ParamType.from(p)),
            `0x${bytes.replace(/0x/i, '')}`,
            loose,
        );
        return formatArrayResToObject(res);
    } catch (err) {
        throw new AbiError(`Parameter decoding error: ${(err as Error).message}`);
    }
};

export const decodeParameters = (
    abi: AbiInput[],
    bytes: HexString,
): { [key: string]: unknown; __length__: number } => decodeParametersWith(abi, bytes, false);

export const decodeParameter = (abi: AbiInput, bytes: HexString): unknown =>
    decodeParameters([abi], bytes)['0'];
