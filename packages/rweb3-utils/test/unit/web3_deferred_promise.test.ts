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
import { RWeb3DeferredPromise } from '../../src/web3_deferred_promise';

describe('RWeb3DeferredPromise', () => {
    describe('getState RWeb3DeferredPromise', () => {
        it('%s', () => {
            const promise = new RWeb3DeferredPromise();
            expect(promise.state).toBe('pending');
        });
    });
    describe('RWeb3DeferredPromise resolves promise', () => {
        it('%s', () => {
            const promise = new RWeb3DeferredPromise();
            promise.resolve('mockValue');
            expect(promise.state).toBe('fulfilled');
        });
    });
    describe('RWeb3DeferredPromise reject promise', () => {
        it('%s', async () => {
            const promise = new RWeb3DeferredPromise();
            promise.reject(new Error('fail'));
            // eslint-disable-next-line jest/no-conditional-expect
            await promise.catch((val) => expect(val).toEqual(new Error('fail')));
            expect(promise.state).toBe('rejected');
        });
    });

    describe('RWeb3DeferredPromise timeout', () => {
        it('%s', async () => {
            const promise = new RWeb3DeferredPromise({
                timeout: 100,
                eagerStart: true,
                timeoutMessage: 'DeferredPromise timed out',
            });
            // eslint-disable-next-line jest/no-conditional-expect
            await promise.catch((val) =>
                expect(val).toEqual(new Error('DeferredPromise timed out')),
            );
            expect(promise.state).toBe('rejected');
        });
    });
});
