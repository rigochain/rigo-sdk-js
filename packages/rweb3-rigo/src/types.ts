﻿/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/

import { ContractExecutionError, InvalidResponseError } from 'rweb3-errors';

import {
    FormatType,
    DataFormat,
    Bytes,
    ContractAbi,
    HexString,
    Numbers,
    Transaction,
    TransactionReceipt,
    FMT_NUMBER,
    FMT_BYTES,
} from 'rweb3-types';

export declare const ETH_DATA_FORMAT: {
    readonly number: FMT_NUMBER.HEX;
    readonly bytes: FMT_BYTES.HEX;
};

export type InternalTransaction = FormatType<Transaction, typeof ETH_DATA_FORMAT>;

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

export type SendSignedTransactionEvents<ReturnFormat extends DataFormat> = {
    sending: FormatType<Bytes, typeof ETH_DATA_FORMAT>;
    sent: FormatType<Bytes, typeof ETH_DATA_FORMAT>;
    transactionHash: FormatType<Bytes, ReturnFormat>;
    receipt: FormatType<TransactionReceipt, ReturnFormat>;
    confirmation: {
        confirmations: FormatType<Numbers, ReturnFormat>;
        receipt: FormatType<TransactionReceipt, ReturnFormat>;
        latestBlockHash: FormatType<Bytes, ReturnFormat>;
    };
    error: InvalidResponseError | ContractExecutionError;
};

export interface SendTransactionOptions<ResolveType = TransactionReceipt> {
    ignoreGasPricing?: boolean;
    transactionResolver?: (receipt: TransactionReceipt) => ResolveType;
    contractAbi?: ContractAbi;
    checkRevertBeforeSending?: boolean;
}

export interface SendSignedTransactionOptions<ResolveType = TransactionReceipt> {
    transactionResolver?: (receipt: TransactionReceipt) => ResolveType;
    contractAbi?: ContractAbi;
    checkRevertBeforeSending?: boolean;
}

export interface RevertReason {
    reason: string;
    signature?: HexString;
    data?: HexString;
}

export interface RevertReasonWithCustomError extends RevertReason {
    customErrorName: string;
    customErrorDecodedSignature: string;
    customErrorArguments: Record<string, unknown>;
}