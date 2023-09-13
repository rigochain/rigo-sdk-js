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
    checkAddressCheckSum as checkAddressCheckSumValidator,
    isAddress as isAddressValidator,
    isHex as isHexValidator,
    isHexStrict as isHexStrictValidator,
    isNullish as isNullishValidator,
} from '@rigochain/rweb3-validator';

/**
 * @deprecated Will be removed in next release. Please use `web3-validator` package instead.
 */
export const isHexStrict = isHexStrictValidator;

/**
 * returns true if input is a hexstring, number or bigint
 *
 * @deprecated Will be removed in next release. Please use `web3-validator` package instead.
 */
export const isHex = isHexValidator;

/**
 * Checks the checksum of a given address. Will also return false on non-checksum addresses.
 *
 * @deprecated Will be removed in next release. Please use `web3-validator` package instead.
 */
export const checkAddressCheckSum = checkAddressCheckSumValidator;

/**
 * Checks if a given string is a valid Ethereum address. It will also check the checksum, if the address has upper and lowercase letters.
 *
 * @deprecated Will be removed in next release. Please use `web3-validator` package instead.
 */
export const isAddress = isAddressValidator;

export const isNullish = isNullishValidator;
