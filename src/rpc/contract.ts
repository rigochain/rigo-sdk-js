import RWeb3 from "./rweb3";
import Account from "../account/account";
import Web3EthAbi from 'web3-eth-abi';
import {TrxBuilder} from "../trx/trx";
import Bytes from "../utils/bytes";

export default class Contract {
    private _rweb3: RWeb3;
    private _jsonInterface;
    public _contractAddress;

    constructor(rweb3: RWeb3, jsonInterface?: any, contractAddress?: string) {
        this._rweb3 = rweb3;
        this._jsonInterface = jsonInterface;
        this._contractAddress = contractAddress;
    }

    private findFunctionSignature(functionName: string) {
        return this._jsonInterface.find((item: {type: any; name: string}) => {
            return item.name === functionName && item.type === 'function';
        })
    }

    private getFunctionSignature(functionName: string) {
        if(this._contractAddress === '' || this._contractAddress === undefined) throw Error('no contract address');
        if(functionName === '') throw Error('no function name');
        const functionSignature = this.findFunctionSignature(functionName);
        if(!functionSignature) throw Error('function name not found');
        return functionSignature;
    }

    private getEncodeFunctionSignature(functionSignature: any, values: any[]) {
        if (values !== undefined) {
            if(functionSignature.inputs.length !== values.length) throw Error('input parameters is different');
        }
        const inputsType = functionSignature.inputs.map((input: {type: any}) => input.type).join(',');
        let encodeFunctionSignature = Web3EthAbi.encodeFunctionSignature(`${functionSignature.name}(${inputsType})`);

        const inputsTypeArray: any[] = [];
        for (const input of functionSignature.inputs) {
            inputsTypeArray.push(input.type);
        }

        encodeFunctionSignature = encodeFunctionSignature + Web3EthAbi.encodeParameters(inputsTypeArray, values).substring(2);
        return encodeFunctionSignature;
    }

    public deploy(account: Account, bytecode: string, args: any[]) {
        let abi = this._jsonInterface.find((item: {type: any}) => item.type === 'constructor');
        if (!abi) {
            abi = {
                type: 'constructor',
                inputs: [],
                stateMutability: '',
            }
        }

        let encodedArguments;
        let bytecodeWithArguments;
        if(args.length > 0) {
            encodedArguments = Web3EthAbi.encodeParameters(abi.inputs, args);
            bytecodeWithArguments = bytecode + encodedArguments.slice(2);
        } else {
            bytecodeWithArguments = bytecode;
        }
        const tx = TrxBuilder.buildContractTrx({
            from: account.address,
            to: '0000000000000000000000000000000000000000',
            nonce: account.nonce,
            gas: '1000000000000000',
            amount: '0',
            payload: {data: bytecodeWithArguments},
        })
        const [sig] = TrxBuilder.SignTrx(tx, account);
        tx.sig = sig;
        const verification = TrxBuilder.VerifyTrx(tx, account);
        if (!verification) throw Error('sign transaction verification failed');

        return this._rweb3.broadcastTrxSync(tx);
    }

    public execute(account: Account, functionName: string, values: any[]) {
        const functionSignature = this.getFunctionSignature(functionName);
        const encodeFunctionSignature = this.getEncodeFunctionSignature(functionSignature, values);
        const tx = TrxBuilder.buildContractTrx({
            from: account.address,
            to: this._contractAddress,
            nonce: account.nonce,
            gas: '1000000000000000',
            amount: '0',
            payload: {data: encodeFunctionSignature},
        })
        const [sig] = TrxBuilder.SignTrx(tx, account);
        tx.sig = sig;
        const verification = TrxBuilder.VerifyTrx(tx, account);
        if (!verification) throw Error('sign transaction verification failed');

        return this._rweb3.broadcastTrxSync(tx);
    }

    public async query(account: Account, functionName: string, values?: any[]) {
        const functionSignature = this.getFunctionSignature(functionName);
        const encodeFunctionSignature = this.getEncodeFunctionSignature(functionSignature, values);
        const vmCallResult = await this._rweb3.vmCall(account.address, this._contractAddress, 0, encodeFunctionSignature);
        if(vmCallResult.value.returnData) {
            const bytes = Bytes.b64ToBytes(vmCallResult.value.returnData);
            vmCallResult.value.returnData = bytes.toHex();
        }
        return vmCallResult;
    }

    public async getContractAddress(txHash: string) {
        const transactionData = await this._rweb3.queryTrx(txHash);
        if (!transactionData.tx_result || !transactionData.tx_result.data) throw Error('not found contract address');
        const bytes = Bytes.b64ToBytes(transactionData.tx_result.data);
        return bytes.toHex();
    }
}