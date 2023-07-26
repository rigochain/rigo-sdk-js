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

/* eslint-disable max-classes-per-file */

import { BaseWeb3Error } from '../web3_error_base.js';
import { ERR_CORE_HARDFORK_MISMATCH } from '../error_codes.js';

export class ConfigHardforkMismatchError extends BaseWeb3Error {
    public code = ERR_CORE_HARDFORK_MISMATCH;

    public constructor(defaultHardfork: string, commonHardFork: string) {
        super(
            `Web3Config hardfork doesnt match in defaultHardfork ${defaultHardfork} and common.hardfork ${commonHardFork}`,
        );
    }
}

export class ConfigChainMismatchError extends BaseWeb3Error {
    public code = ERR_CORE_HARDFORK_MISMATCH;

    public constructor(defaultHardfork: string, commonHardFork: string) {
        super(
            `Web3Config chain doesnt match in defaultHardfork ${defaultHardfork} and common.hardfork ${commonHardFork}`,
        );
    }
}
