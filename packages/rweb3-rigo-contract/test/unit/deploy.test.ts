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
import { Contract } from '../../src';
//import erc20Json from '../fixtures/erc20-abi.json';
import tokenJson from '../fixtures/Token.json';
import { getTestProposalAccountPrivateKey, getTestWsServer } from './e2e_utils';
import WebsocketProvider from '@rigochain/rweb3-providers-ws';
import { privateKeyToAccount, RWeb3Account } from '@rigochain/rweb3-rigo-accounts';

describe('deploy test', () => {
    it('deploy function', (done) => {
        const erc20Contract = new Contract(tokenJson.abi);
        erc20Contract.setProvider(new WebsocketProvider(getTestWsServer()));

        const rweb3account: RWeb3Account = privateKeyToAccount(getTestProposalAccountPrivateKey());

        erc20Contract
            .deploy(
                tokenJson.bytecode,
                ["RigoToken", "RGT", "1000"],
                rweb3account,
                'testnet0',
                1000000,
            )
            .send()
            .then((res) => {
                console.log(res);
                done();
            })
            .catch((err) => {
                console.log(err);
            });
    });
});
