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

import RWeb3Rigo from 'rweb3-rigo'; // --> rpc 통신으로 변경해야 됨.
import Web3EthAbi from 'web3-eth-abi';
import { TrxBuilder, Account } from 'rweb3-rigo-accounts';
import { Bytes } from 'rweb3-utils';
import { TxResponse, VmCallResponse } from 'rweb3-types';

export default class Contract {
    private _rweb3: RWeb3Rigo;
    private _jsonInterface;
    public _contractAddress;
    public gas = '1000000000000000';

    constructor(rweb3: RWeb3Rigo, contractAddress: string, jsonInterface?: any) {
        this._rweb3 = rweb3;
        this._jsonInterface = jsonInterface;
        this._contractAddress = contractAddress;
    }

    private findFunctionSignature(functionName: string) {
        return this._jsonInterface.find((item: { type: any; name: string }) => {
            return item.name === functionName && item.type === 'function';
        });
    }

    private getFunctionSignature(functionName: string) {
        if (this._contractAddress === '' || this._contractAddress === undefined)
            throw Error('no contract address');
        if (functionName === '') throw Error('no function name');
        const functionSignature = this.findFunctionSignature(functionName);
        if (!functionSignature) throw Error('function name not found');
        return functionSignature;
    }

    private getEncodeFunctionSignature(functionSignature: any, values: any[]) {
        if (values !== undefined) {
            if (functionSignature.inputs.length !== values.length)
                throw Error('input parameters is different');
        }
        let encodeFunctionSignature = Web3EthAbi.encodeFunctionSignature(functionSignature);

        const inputsTypeArray: any[] = [];
        for (const input of functionSignature.inputs) {
            inputsTypeArray.push(input);
        }

        encodeFunctionSignature =
            encodeFunctionSignature +
            Web3EthAbi.encodeParameters(inputsTypeArray, values).substring(2);
        return encodeFunctionSignature;
    }

    public deploy(account: Account, bytecode: string, args: any[]) {
        let abi = this._jsonInterface.find((item: { type: any }) => item.type === 'constructor');
        if (!abi) {
            abi = {
                type: 'constructor',
                inputs: [],
                stateMutability: '',
            };
        }

        let encodedArguments;
        let bytecodeWithArguments;
        if (args.length > 0) {
            encodedArguments = Web3EthAbi.encodeParameters(abi.inputs, args);
            bytecodeWithArguments = bytecode + encodedArguments.slice(2);
        } else {
            bytecodeWithArguments = bytecode;
        }
        const tx = TrxBuilder.buildContractTrx({
            from: account.address,
            to: '0000000000000000000000000000000000000000',
            nonce: account.nonce,
            gas: this.gas,
            amount: '0',
            payload: { data: bytecodeWithArguments },
        });
        const [sig] = TrxBuilder.SignTrx(tx, account);
        tx.sig = sig;
        const verification = TrxBuilder.VerifyTrx(tx, account);
        if (!verification) throw Error('sign transaction verification failed');

        return this._rweb3.broadcastTxSync(tx);
    }

    public execute(account: Account, functionName: string, values: any[]) {
        const functionSignature = this.getFunctionSignature(functionName);
        const encodeFunctionSignature = this.getEncodeFunctionSignature(functionSignature, values);
        const tx = TrxBuilder.buildContractTrx({
            from: account.address,
            to: this._contractAddress,
            nonce: account.nonce,
            gas: this.gas,
            amount: '0',
            payload: { data: encodeFunctionSignature },
        });
        const [sig] = TrxBuilder.SignTrx(tx, account);
        tx.sig = sig;
        const verification = TrxBuilder.VerifyTrx(tx, account);
        if (!verification) throw Error('sign transaction verification failed');

        return this._rweb3.broadcastTxSync(tx);
    }

    public async query(account: Account, functionName: string, values: any[]) {
        const functionSignature = this.getFunctionSignature(functionName);
        const encodeFunctionSignature = this.getEncodeFunctionSignature(functionSignature, values);
        const vmCallResult: VmCallResponse = await this._rweb3.vmCall(
            account.address,
            this._contractAddress,
            0,
            encodeFunctionSignature,
        );
        if (vmCallResult.value.returnData) {
            const bytes = Bytes.b64ToBytes(vmCallResult.value.returnData);
            vmCallResult.value.returnData = bytes.toHex();
        }
        return vmCallResult;
    }

    public async getContractAddress(txHash: string) {
        const transactionData: TxResponse = await this._rweb3.tx(txHash);
        if (!transactionData.tx_result || !transactionData.tx_result.data)
            throw Error('not found contract address');

        // TODO : 여기 확인해야됨.. Response 값이  Uint8Array 로 셋팅 됨..
        const bytes = Bytes.b64ToBytes(transactionData.tx_result.data.toString());
        let bytesToHex = bytes.toHex();
        if (!bytesToHex.startsWith('0x')) bytesToHex = '0x' + bytesToHex;
        return bytesToHex.toLowerCase();
    }
}
