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
