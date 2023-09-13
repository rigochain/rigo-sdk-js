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
    AbiConstructorFragment,
    AbiErrorFragment,
    AbiFragment,
    AbiFunctionFragment,
    Address,
    BroadcastTxSyncResponse,
    ContractAbi,
    ContractEvents,
    ContractMethod,
    ContractMethodInputParameters,
    ContractMethodOutputParameters,
    DataFormat,
    DEFAULT_RETURN_FORMAT,
    FilterAbis,
    HexString,
    Mutable,
    NonPayableCallOptions,
    PayableCallOptions,
    RigoExecutionAPI,
    RWeb3ValidationErrorObject,
} from 'rweb3-types';
import { RWeb3Context } from 'rweb3-core';
import {
    ContractAbiWithSignature,
    ContractEventOptions,
    ContractOptions,
    NonPayableMethodObject,
    NonPayableTxOptions,
    PayableMethodObject,
    PayableTxOptions,
} from './types.js';
import { format, isNullish, toChecksumAddress } from 'rweb3-utils';
import {
    decodeContractErrorData,
    encodeFunctionSignature,
    isAbiErrorFragment,
    isAbiFunctionFragment,
    jsonInterfaceMethodToString,
} from 'rweb3-rigo-abi';
import {
    RWeb3ValidatorError,
    utils as validatorUtils,
    ValidationSchemaInput,
    validator,
} from 'rweb3-validator';
import { encodeMethodABI } from './encoding.js';
import { ContractExecutionError, Web3ContractError } from 'rweb3-errors';
import { getEthTxCallParams, getSendTxParams } from './utils.js';
import { call, sendDeploy } from 'rweb3-rigo';
import { RWeb3Account } from 'rweb3-rigo-accounts';
import HttpProvider from 'rweb3-providers-http';
import WebsocketProvider from 'rweb3-providers-ws';
import { LogsSubscription } from './log_subscription.js';

type ContractBoundMethod<
    Abi extends AbiFunctionFragment,
    Method extends ContractMethod<Abi> = ContractMethod<Abi>,
> = (
    ...args: Method['Inputs']
) => Method['Abi']['stateMutability'] extends 'payable' | 'pure'
    ? PayableMethodObject<Method['Inputs'], Method['Outputs']>
    : NonPayableMethodObject<Method['Inputs'], Method['Outputs']>;

// To avoid circular dependency between types and encoding, declared these types here.
export type ContractMethodsInterface<Abi extends ContractAbi> = {
    [MethodAbi in FilterAbis<
        Abi,
        AbiFunctionFragment & { type: 'function' }
    > as MethodAbi['name']]: ContractBoundMethod<MethodAbi>;
    // To allow users to use method signatures
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
} & { [key: string]: ContractBoundMethod<any> };

export type ContractBoundEvent = (options?: ContractEventOptions) => LogsSubscription;

// To avoid circular dependency between types and encoding, declared these types here.
export type ContractEventsInterface<
    Abi extends ContractAbi,
    Events extends ContractEvents<Abi> = ContractEvents<Abi>,
> = {
    [Name in keyof Events | 'allEvents']: ContractBoundEvent;
} & {
    [key: string]: ContractBoundEvent;
};

export type ContractOverloadedMethodInputs<AbiArr extends ReadonlyArray<unknown>> = NonNullable<
    AbiArr extends readonly []
        ? undefined
        : AbiArr extends readonly [infer A, ...infer R]
        ? A extends AbiFunctionFragment
            ? ContractMethodInputParameters<A['inputs']> | ContractOverloadedMethodInputs<R>
            : undefined
        : undefined
>;

export type ContractOverloadedMethodOutputs<AbiArr extends ReadonlyArray<unknown>> = NonNullable<
    AbiArr extends readonly []
        ? undefined
        : AbiArr extends readonly [infer A, ...infer R]
        ? A extends AbiFunctionFragment
            ? ContractMethodOutputParameters<A['outputs']> | ContractOverloadedMethodOutputs<R>
            : undefined
        : undefined
>;

export class Contract<Abi extends ContractAbi> extends RWeb3Context<RigoExecutionAPI> {
    public readonly options: ContractOptions;
    private _address?: Address;

    private _functions: Record<
        string,
        {
            signature: string;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            method: ContractBoundMethod<any>;
        }
    > = {};

    private _methods!: ContractMethodsInterface<Abi>;

    private _jsonInterface!: ContractAbiWithSignature;

    private _errorsInterface!: AbiErrorFragment[];

    private readonly _overloadedMethodAbis: Map<string, AbiFunctionFragment[]>;

    public constructor(jsonInterface: Abi, addressOrOptionsOrContext?: Address | RWeb3Context) {
        super();

        let provider;
        if (
            typeof addressOrOptionsOrContext === 'object' &&
            'provider' in addressOrOptionsOrContext
        ) {
            provider = addressOrOptionsOrContext.provider;
        }

        this._overloadedMethodAbis = new Map<string, AbiFunctionFragment[]>();

        const address =
            typeof addressOrOptionsOrContext === 'string' ? addressOrOptionsOrContext : undefined;

        this._parseAndSetJsonInterface(jsonInterface);

        // Address CheckSum Settings
        if (!isNullish(address)) {
            this._parseAndSetAddress(address);
        }

        this.options = {
            address,
            jsonInterface: this._jsonInterface,
        };

        Object.defineProperty(this.options, 'jsonInterface', {
            set: (value: ContractAbi) => this._parseAndSetJsonInterface(value),
            get: () => this._jsonInterface,
        });
    }

    private _parseAndSetJsonInterface(abis: ContractAbi) {
        this._functions = {};

        this._methods = {} as ContractMethodsInterface<Abi>;

        let result: ContractAbi = [];

        const functionsAbi = abis.filter((abi) => abi.type !== 'error');
        const errorsAbi = abis.filter((abi) =>
            isAbiErrorFragment(abi),
        ) as unknown as AbiErrorFragment[];

        for (const a of functionsAbi) {
            const abi: Mutable<AbiFragment & { signature: HexString }> = {
                ...a,
                signature: '',
            };

            if (isAbiFunctionFragment(abi)) {
                const methodName = jsonInterfaceMethodToString(abi);
                const methodSignature = encodeFunctionSignature(methodName);
                abi.signature = methodSignature;

                // make constant and payable backwards compatible
                abi.constant =
                    abi.stateMutability === 'view' ??
                    abi.stateMutability === 'pure' ??
                    abi.constant;

                abi.payable = abi.stateMutability === 'payable' ?? abi.payable;
                this._overloadedMethodAbis.set(abi.name, [
                    ...(this._overloadedMethodAbis.get(abi.name) ?? []),
                    abi,
                ]);
                const abiFragment = this._overloadedMethodAbis.get(abi.name) ?? [];
                const contractMethod = this._createContractMethod<
                    typeof abiFragment,
                    AbiErrorFragment
                >(abiFragment, errorsAbi);

                this._functions[methodName] = {
                    signature: methodSignature,
                    method: contractMethod,
                };

                // We don't know a particular type of the Abi method so can't type check
                this._methods[abi.name as keyof ContractMethodsInterface<Abi>] = this._functions[
                    methodName
                ].method as never;

                // We don't know a particular type of the Abi method so can't type check
                this._methods[methodName as keyof ContractMethodsInterface<Abi>] = this._functions[
                    methodName
                ].method as never;

                // We don't know a particular type of the Abi method so can't type check
                this._methods[methodSignature as keyof ContractMethodsInterface<Abi>] = this
                    ._functions[methodName].method as never;
            }

            result = [...result, abi];
        }

        this._jsonInterface = [...result] as unknown as ContractAbiWithSignature;
        this._errorsInterface = errorsAbi;
    }

    private _createContractMethod<T extends AbiFunctionFragment[], E extends AbiErrorFragment>(
        abiArr: T,
        errorsAbis: E[],
    ): ContractBoundMethod<T[0]> {
        const abi = abiArr[abiArr.length - 1];
        return (...params: unknown[]) => {
            let abiParams!: Array<unknown>;
            const abis = this._overloadedMethodAbis.get(abi.name) ?? [];
            let methodAbi: AbiFunctionFragment = abis[0];
            const internalErrorsAbis = errorsAbis;

            const arrayOfAbis: AbiFunctionFragment[] = abis.filter(
                (_abi) => (_abi.inputs ?? []).length === params.length,
            );

            if (abis.length === 1 || arrayOfAbis.length === 0) {
                abiParams = this._getAbiParams(methodAbi, params);

                // TODO : need validate check
                // validator.validate(abi.inputs ?? [], abiParams);
            } else {
                const errors: RWeb3ValidationErrorObject[] = [];

                for (const _abi of arrayOfAbis) {
                    try {
                        abiParams = this._getAbiParams(_abi, params);
                        validator.validate(
                            _abi.inputs as unknown as ValidationSchemaInput,
                            abiParams,
                        );
                        methodAbi = _abi;
                        break;
                    } catch (e) {
                        errors.push(e as RWeb3ValidationErrorObject);
                    }
                }
                if (errors.length === arrayOfAbis.length) {
                    throw new RWeb3ValidatorError(errors);
                }
            }

            const methods = {
                arguments: abiParams,

                call: async (
                    options?: PayableCallOptions | NonPayableCallOptions,
                    height?: number,
                ) =>
                    this._contractMethodCall(
                        methodAbi,
                        abiParams,
                        internalErrorsAbis,
                        options,
                        height,
                    ),

                // TODO Promise any
                send: (options?: PayableTxOptions | NonPayableTxOptions): Promise<any> =>
                    this._contractMethodSend(methodAbi, abiParams, internalErrorsAbis, options),

                encodeABI: () => encodeMethodABI(methodAbi, abiParams),
            };

            if (methodAbi.stateMutability === 'payable') {
                return methods as PayableMethodObject<
                    ContractOverloadedMethodInputs<T>,
                    ContractOverloadedMethodOutputs<T>
                >;
            }
            return methods as NonPayableMethodObject<
                ContractOverloadedMethodInputs<T>,
                ContractOverloadedMethodOutputs<T>
            >;
        };
    }

    private async _contractMethodCall<Options extends PayableCallOptions | NonPayableCallOptions>(
        abi: AbiFunctionFragment,
        params: unknown[],
        errorsAbi: AbiErrorFragment[],
        options?: Options,
        height?: number,
    ) {
        const tx = getEthTxCallParams({
            abi,
            params,
            options,
            contractOptions: {
                ...this.options,
                from: this.options.from ?? this.config.defaultAccount,
            },
        });

        console.log('tx', tx);
        try {
            return await call(this, tx.to, tx.input ? tx.input.toString() : '0x', height);
        } catch (error: unknown) {
            if (error instanceof ContractExecutionError) {
                // this will parse the error data by trying to decode the ABI error inputs according to EIP-838
                decodeContractErrorData([], error.innerError);
                // decodeContractErrorData(errorsAbi, error.innerError);
            }
            throw error;
        }
    }

    // TODO : 여기 발행 함수 최종 확인 해야됨
    private _contractMethodSend<Options extends PayableCallOptions | NonPayableCallOptions>(
        abi: AbiFunctionFragment,
        params: unknown[],
        errorsAbi: AbiErrorFragment[],
        options?: Options,
        contractOptions?: ContractOptions,
    ) {
        let modifiedContractOptions = contractOptions ?? this.options;
        modifiedContractOptions = {
            ...modifiedContractOptions,
            input: undefined,
            from: modifiedContractOptions.from ?? undefined,
        };

        const tx = getSendTxParams({
            abi,
            params,
            options,
            contractOptions: modifiedContractOptions,
        });

        const transactionToSend = Promise.resolve('');
        //
        // const transactionToSend = sendTransaction(this, tx, {
        //     // TODO Should make this configurable by the user
        //     checkRevertBeforeSending: false,
        // });

        // eslint-disable-next-line no-void
        // TODO ts-ignore 제거
        // @ts-ignore
        void transactionToSend.on('error', (error: unknown) => {
            if (error instanceof ContractExecutionError) {
                // this will parse the error data by trying to decode the ABI error inputs according to EIP-838
                decodeContractErrorData(errorsAbi, error.innerError);
            }
        });

        return transactionToSend;
    }

    private _getAbiParams(abi: AbiFunctionFragment, params: unknown[]): Array<unknown> {
        try {
            return validatorUtils.transformJsonDataToAbiFormat(abi.inputs ?? [], params);
        } catch (error) {
            throw new Web3ContractError(
                `Invalid parameters for method ${abi.name}: ${(error as Error).message}`,
            );
        }
    }

    public set provider(provider: string | HttpProvider | WebsocketProvider | undefined) {
        this.requestManager.setProvider(provider);
    }

    private _parseAndSetAddress(value?: Address, returnFormat: DataFormat = DEFAULT_RETURN_FORMAT) {
        this._address = value
            ? toChecksumAddress(format({ format: 'address' }, value, returnFormat))
            : value;
    }

    public get methods() {
        return this._methods;
    }

    public deploy(bytecode: string, args: any[], rWeb3Account: RWeb3Account) {
        let abi = this._jsonInterface.find(
            (j) => j.type === 'constructor',
        ) as AbiConstructorFragment;

        if (!abi) {
            abi = {
                type: 'constructor',
                inputs: [],
                stateMutability: '',
            } as AbiConstructorFragment;
        }

        return {
            send: (): Promise<BroadcastTxSyncResponse> => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                return sendDeploy(this, abi as AbiFunctionFragment, bytecode, args, rWeb3Account);
            },
        };
    }

    public settingsProvider(providers: HttpProvider | WebsocketProvider): void {
        this.requestManager.setProvider(providers);
    }
}
