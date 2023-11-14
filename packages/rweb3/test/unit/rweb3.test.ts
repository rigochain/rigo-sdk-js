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
import { RWeb3 } from '../../src';
import RWeb3Rigo from '@rigochain/rweb3-rigo';
import { getTestWsServer } from './e2e_utils';

describe('RWeb3 class', () => {
    it('should initialize RWeb3 instance correctly', () => {
        const rWeb3Instance = new RWeb3(getTestWsServer());

        // Check if the instance is correctly initialized
        expect(rWeb3Instance).toBeInstanceOf(RWeb3);
    });

    it('should initialize RWeb3Rigo module correctly', () => {
        const rWeb3Instance = new RWeb3(getTestWsServer());
        // Check if the rigo module is correctly initialized
        expect(rWeb3Instance.rigo).toBeInstanceOf(RWeb3Rigo);
    });
});
