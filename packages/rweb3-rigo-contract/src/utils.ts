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

import { Web3ContractError } from 'rweb3-errors';
import {
    TransactionForAccessList,
    AbiFunctionFragment,
    TransactionWithSenderAPI,
    TransactionCall,
    HexString,
    Address,
    NonPayableCallOptions,
    PayableCallOptions,
    ContractInitOptions,
} from 'rweb3-types';
import { isNullish, mergeDeep, toHex } from 'rweb3-utils';
import { encodeMethodABI } from './encoding.js';
import { ContractOptions } from './types.js';

export const getSendTxParams = ({
    abi,
    params,
    options,
    contractOptions,
}: {
    abi: AbiFunctionFragment;
    params: unknown[];
    options?: (PayableCallOptions | NonPayableCallOptions) & {
        input?: HexString;
        data?: HexString;
        to?: Address;
    };
    contractOptions: ContractOptions;
}): TransactionCall => {
    const deploymentCall = options?.input ?? options?.data ?? contractOptions.input;

    if (!deploymentCall && !options?.to && !contractOptions.address) {
        throw new Web3ContractError('Contract address not specified');
    }

    if (!options?.from && !contractOptions.from) {
        throw new Web3ContractError('Contract "from" address not specified');
    }

    let txParams = mergeDeep(
        {
            to: contractOptions.address,
            gas: contractOptions.gas,
            gasPrice: contractOptions.gasPrice,
            from: contractOptions.from,
            input: contractOptions.input,
            maxPriorityFeePerGas: contractOptions.maxPriorityFeePerGas,
            maxFeePerGas: contractOptions.maxFeePerGas,
        },
        options as unknown as Record<string, unknown>,
    ) as unknown as TransactionCall;

    if (!txParams.input || abi.type === 'constructor') {
        txParams = {
            ...txParams,
            input: encodeMethodABI(abi, params, txParams.input as HexString),
        };
    }

    return txParams;
};

export const getEthTxCallParams = ({
    abi,
    params,
    options,
    contractOptions,
}: {
    abi: AbiFunctionFragment;
    params: unknown[];
    options?: (PayableCallOptions | NonPayableCallOptions) & { to?: Address };
    contractOptions: ContractOptions;
}): TransactionCall => {
    if (!options?.to && !contractOptions.address) {
        throw new Web3ContractError('Contract address not specified');
    }

    let txParams = mergeDeep(
        {
            to: contractOptions.address,
            gas: contractOptions.gas,
            gasPrice: contractOptions.gasPrice,
            from: contractOptions.from,
            input: contractOptions.input,
            maxPriorityFeePerGas: contractOptions.maxPriorityFeePerGas,
            maxFeePerGas: contractOptions.maxFeePerGas,
        },
        options as unknown as Record<string, unknown>,
    ) as unknown as TransactionCall;

    txParams = {
        ...txParams,
        input: encodeMethodABI(abi, params, txParams.input ? toHex(txParams.input) : undefined),
    };

    return txParams;
};

export const getEstimateGasParams = ({
    abi,
    params,
    options,
    contractOptions,
}: {
    abi: AbiFunctionFragment;
    params: unknown[];
    options?: PayableCallOptions | NonPayableCallOptions;
    contractOptions: ContractOptions;
}): Partial<TransactionWithSenderAPI> => {
    let txParams = mergeDeep(
        {
            to: contractOptions.address,
            gas: contractOptions.gas,
            gasPrice: contractOptions.gasPrice,
            from: contractOptions.from,
            input: contractOptions.input,
        },
        options as unknown as Record<string, unknown>,
    ) as unknown as TransactionCall;

    txParams = {
        ...txParams,
        input: encodeMethodABI(abi, params, txParams.input ? toHex(txParams.input) : undefined),
    };

    return txParams as TransactionWithSenderAPI;
};

export const getCreateAccessListParams = ({
    abi,
    params,
    options,
    contractOptions,
}: {
    abi: AbiFunctionFragment;
    params: unknown[];
    options?: (PayableCallOptions | NonPayableCallOptions) & { to?: Address };
    contractOptions: ContractOptions;
}): TransactionForAccessList => {
    if (!options?.to && !contractOptions.address) {
        throw new Web3ContractError('Contract address not specified');
    }

    if (!options?.from && !contractOptions.from) {
        throw new Web3ContractError('Contract "from" address not specified');
    }

    let txParams = mergeDeep(
        {
            to: contractOptions.address,
            gas: contractOptions.gas,
            gasPrice: contractOptions.gasPrice,
            from: contractOptions.from,
            input: contractOptions.input,
            maxPriorityFeePerGas: contractOptions.maxPriorityFeePerGas,
            maxFeePerGas: contractOptions.maxFeePerGas,
        },
        options as unknown as Record<string, unknown>,
    ) as unknown as TransactionForAccessList;

    if (!txParams.input || abi.type === 'constructor') {
        txParams = {
            ...txParams,
            input: encodeMethodABI(abi, params, txParams.input as HexString),
        };
    }

    return txParams;
};

export const isContractInitOptions = (options: unknown): options is ContractInitOptions =>
    typeof options === 'object' &&
    !isNullish(options) &&
    [
        'input',
        'data',
        'from',
        'gas',
        'gasPrice',
        'gasLimit',
        'address',
        'jsonInterface',
        'syncWithContext',
    ].some((key) => key in options);
