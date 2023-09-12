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
import { RWeb3, StatusResponse } from '../../../src';
import { getTestWsServer } from '../e2e_utils';
import { AbciInfoResponse } from 'rweb3-types';

describe('setProvider check ', () => {
    let defaultRWeb3: RWeb3;

    beforeAll(() => {
        defaultRWeb3 = new RWeb3();
    });

    it('should call rweb3 setProvider success ', async () => {
        defaultRWeb3.setProvider(getTestWsServer());

        const websocketStatusResponse: StatusResponse = await defaultRWeb3.rigo.status();

        expect(websocketStatusResponse.node_info.channels).toEqual('40202122233038606100');
        expect(websocketStatusResponse.validator_info.pub_key.type).toEqual(
            'tendermint/PubKeyEd25519',
        );
    });

    it('should call not provider rweb3 is need fail ', (done) => {
        defaultRWeb3.rigo
            .status()
            .then(() => {
                fail();
            })
            .catch((error) => {
                console.log(error);
                done();
            });
    });
});
