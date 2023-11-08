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
import { RWeb3PkgInfo } from '../../src/version';
import packageFile from '../../package.json';

describe('rweb3-rpc-methods package info', () => {
    it('should RWeb3PkgInfo.version returns the same version set at package.json', () => {
        expect(packageFile.version).toEqual(RWeb3PkgInfo.version);
    });
});
