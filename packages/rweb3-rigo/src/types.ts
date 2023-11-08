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

import { ContractExecutionError, InvalidResponseError } from '@rigochain/rweb3-errors';

import {
    FormatType,
    DataFormat,
    Bytes,
    Numbers,
    Transaction,
    TransactionReceipt,
    FMT_NUMBER,
    FMT_BYTES,
} from '@rigochain/rweb3-types';

export declare const ETH_DATA_FORMAT: {
    readonly number: FMT_NUMBER.HEX;
    readonly bytes: FMT_BYTES.HEX;
};

export type SendTransactionEvents<ReturnFormat extends DataFormat> = {
    sending: FormatType<Transaction, typeof ETH_DATA_FORMAT>;
    sent: FormatType<Transaction, typeof ETH_DATA_FORMAT>;
    transactionHash: FormatType<Bytes, ReturnFormat>;
    receipt: FormatType<TransactionReceipt, ReturnFormat>;
    confirmation: {
        confirmations: FormatType<Numbers, ReturnFormat>;
        receipt: FormatType<TransactionReceipt, ReturnFormat>;
        latestBlockHash: FormatType<Bytes, ReturnFormat>;
    };
    error: InvalidResponseError | ContractExecutionError;
};
