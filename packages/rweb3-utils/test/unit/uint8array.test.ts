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
import { uint8ArrayConcat, uint8ArrayEquals } from '../../src/uint8array';
import { uint8ArrayConcatData, uint8ArrayEqualsValidData } from '../fixtures/uint8array';

describe('uint8Array utils', () => {
    describe('uint8ArrayConcat', () => {
        it.each(uint8ArrayConcatData)('%s', (input, output) => {
            expect(uint8ArrayConcat(...input)).toEqual(output);
        });
        describe('uint8ArrayConcat', () => {
            describe('cases', () => {
                it.each(uint8ArrayEqualsValidData)('%s', (input, output) => {
                    expect(uint8ArrayEquals(input[0], input[1])).toEqual(output);
                });
            });
        });
    });
});
