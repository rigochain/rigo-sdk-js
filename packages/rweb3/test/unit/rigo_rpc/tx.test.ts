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
import { getTestWsServer } from '../e2e_utils';
import { TxResponse } from 'rweb3-types';
import { BytesUint8Array } from 'rweb3-types';

describe('txSearch check ', () => {
    let testWebsocketRWeb3Instance: RWeb3;

    beforeAll(() => {
        testWebsocketRWeb3Instance = new RWeb3(getTestWsServer());
    });
    //
    // public async getContractAddress(txHash: string) {
    //         const transactionData = await this._rweb3.queryTrx(txHash);
    //         if (!transactionData.tx_result || !transactionData.tx_result.data) throw Error('not found contract address');
    //         const bytes = Bytes.b64ToBytes(transactionData.tx_result.data);
    //         let bytesToHex = bytes.toHex();
    //         if(!bytesToHex.startsWith('0x'))    bytesToHex = '0x' + bytesToHex;
    //         return bytesToHex.toLowerCase();
    //     }

    it('should call rweb3 with testWebsocketRWeb3Instance.txSearch method success return', async () => {
        const testTxResponse: TxResponse = await testWebsocketRWeb3Instance.rigo.tx(
            '84b366c007e62513913d5a2d642e2792363188db899012139700ba0e6fd0728f',
        );

        if (testTxResponse.tx_result.data) {
            const bytes = BytesUint8Array.b64ToBytes(testTxResponse.tx_result.data);
            let bytesToHex = bytes.toHex();
            if (!bytesToHex.startsWith('0x')) bytesToHex = '0x' + bytesToHex;
            console.log('contractAddr', bytesToHex.toLowerCase());
        }

        console.log(JSON.stringify(testTxResponse));
        console.log(JSON.stringify(testTxResponse.tx_result.data));
        console.log(JSON.stringify(testTxResponse.hash));
        console.log(JSON.stringify(testTxResponse.height));
    });
});
