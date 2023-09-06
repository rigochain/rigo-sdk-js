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
import Long from 'long';
import { fromNanoSecond, getNanoSecond } from '../../src/time';

describe('Timestamp conversion tests', () => {
    test('getNanoSecond without parameter', () => {
        const now = Date.now();
        const nano = getNanoSecond();
        // We can't directly compare the two since time has passed between the calls
        // but we can at least make sure they're within the same second.
        expect(nano.div(1000000000).toNumber()).toBeGreaterThanOrEqual(Math.floor(now / 1000));
    });

    test('getNanoSecond with parameter', () => {
        const now = new Date();
        const nano = getNanoSecond(now);
        expect(nano.toNumber()).toEqual(now.getTime() * 1000000);
    });

    test('fromNanoSecond', () => {
        const now = new Date();
        const nano = Long.fromNumber(now.getTime() * 1000000);
        const recovered = fromNanoSecond(nano);
        expect(recovered.getTime()).toEqual(now.getTime());
    });
});
