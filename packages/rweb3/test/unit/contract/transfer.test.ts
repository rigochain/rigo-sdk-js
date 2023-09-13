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
import { RWeb3 } from '../../../src';
import {
    getTestAccountAddress,
    getTestProposalAccountPrivateKey,
    getTestWsServer,
} from '../e2e_utils';
import * as fs from 'fs';
import { privateKeyToAccount, RWeb3Account, TrxProtoBuilder } from '@rigochain/rweb3-rigo-accounts';

describe('contract transfer check ', () => {
    let testWebsocketRWeb3Instance: RWeb3;

    beforeAll(() => {
        testWebsocketRWeb3Instance = new RWeb3(getTestWsServer());
    });

    it('should call rweb3 with erc20 transfer method success return', async () => {
        const erc20Abi = fs.readFileSync('./test/fixtures/erc20-abi.json', 'utf8');

        const fromAccount = privateKeyToAccount(getTestProposalAccountPrivateKey()) as RWeb3Account;

        const contractAddr = '4b007901049a210f8e1ce8f4d4ab8e6e1efd1b10';
        // console.log(erc20Abi);
        const contract = new testWebsocketRWeb3Instance.rigo.Contract(
            JSON.parse(erc20Abi),
            contractAddr,
        ) as any;

        const balanceResponse = await contract.methods.balanceOf(fromAccount.address).call();
        const beforeBalance = balanceResponse.value.returnData;

        console.log('before balance: ' + beforeBalance);

        const transferEncodeDate = contract.methods
            .transfer('0x' + getTestAccountAddress(), 100)
            .encodeABI();

        console.log(transferEncodeDate);
        const nonce = (await testWebsocketRWeb3Instance.rigo.account(fromAccount.address)).value
            .nonce;

        const transferTrxProto = TrxProtoBuilder.buildContractTrxProto({
            from: fromAccount.address,
            to: contractAddr,
            nonce: nonce,
            gas: '1000000000000000',
            amount: '0',
            payload: { data: transferEncodeDate },
        });

        const [sig, signedTx] = TrxProtoBuilder.signTrxProto(transferTrxProto, fromAccount);
        transferTrxProto.sig = sig;

        const transferResult = await testWebsocketRWeb3Instance.rigo.broadcastTxCommit(
            transferTrxProto,
        );

        console.log(transferResult);

        const afterBalanceResponse = await contract.methods.balanceOf(fromAccount.address).call();
        const afterBalance = afterBalanceResponse.value.returnData;

        console.log('after balance: ' + afterBalance);

        expect(beforeBalance === afterBalance).toBeFalsy();
    });
});
