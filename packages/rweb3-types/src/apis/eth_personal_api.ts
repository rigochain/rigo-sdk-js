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

import { Address, Transaction } from '../eth_types.js';
import { HexString } from '../primitives_types.js';

export type EthPersonalAPI = {
    personal_listAccounts: () => Address[];
    personal_newAccount: (password: string) => Address;
    personal_unlockAccount: (address: Address, password: string, unlockDuration: number) => boolean;
    personal_lockAccount: (address: Address) => boolean;
    personal_importRawKey: (keyData: HexString, passphrase: string) => HexString;
    personal_sendTransaction: (tx: Transaction, passphrase: string) => HexString;
    personal_signTransaction: (tx: Transaction, passphrase: string) => HexString;
    personal_sign: (data: HexString, address: Address, passphrase: string) => HexString;
    personal_ecRecover: (signedData: HexString, signature: HexString) => Address;
};
