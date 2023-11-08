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

import { RWeb3PkgInfo } from './version.js';
import { RWeb3Context } from '@rigochain/rweb3-core';
import RWeb3Rigo from '@rigochain/rweb3-rigo';
import { isNullish } from '@rigochain/rweb3-validator';
import { RWeb3RigoInterface } from './types';
import { initAccountsForContext } from './accounts.js';
import abi from './abi.js';
import { Address, ContractAbi } from '@rigochain/rweb3-types';
import { Contract } from '@rigochain/rweb3-rigo-contract';
import * as utils from '@rigochain/rweb3-utils';

export class RWeb3 extends RWeb3Context {
    public static version = RWeb3PkgInfo.version;
    public static utils = utils;

    public static modules = {
        RWeb3Rigo,
    };
    public utils: typeof utils;

    public rigo: RWeb3RigoInterface;
    public constructor(provider?: string) {
        super(provider);

        if (isNullish(provider) || (typeof provider === 'string' && provider.trim() === '')) {
            console.warn(
                'NOTE: rweb3.js is running without provider. You need to pass a provider in order to interact with the network!',
            );
        }

        const accounts = initAccountsForContext();

        // Have to use local alias to initiate contract context
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const self = this;

        class ContractBuilder<Abi extends ContractAbi> extends Contract<Abi> {
            constructor(jsonInterface: Abi, addressOrOptionsOrContext?: Address | RWeb3Context) {
                super(jsonInterface, addressOrOptionsOrContext);
                const providers = self.requestManager.provider;
                super.settingsProvider(providers);
            }
        }

        this.utils = utils;

        const rigo = self.use(RWeb3Rigo);
        //
        // // Rigo Module
        this.rigo = Object.assign(rigo, {
            accounts,
            Contract: ContractBuilder,
            abi,
        });
    }
}

export default RWeb3;
