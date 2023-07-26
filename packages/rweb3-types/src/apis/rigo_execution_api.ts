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

import { HexString } from '../primitives_types.js';
import { AddressBase, StakeValue, Validators, Transaction, Block, Rule } from '../rigo_types';

export type AddressAPI = AddressBase<HexString>;

/* eslint-disable camelcase */
export type RigoExecutionAPI = {
    account: (addr: string) => AddressAPI;
    validators: (height: string) => Validators;
    stakes: (addr: string) => StakeValue;
    // delegatee: (addr: string) => StakeValue;     TODO : Response 알아야 함
    // broadcast_tx_sync : (tx: string): string;    TODO : Response 알아야 함

    tx: (txhash: string) => Transaction;
    block: (height: string) => Block;
    block_by_hash: (hash: string) => Block;
    rule: () => Rule;
};
