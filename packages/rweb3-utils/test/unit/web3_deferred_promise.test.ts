import { Web3DeferredPromise } from '../../src/web3_deferred_promise';

describe('Web3DeferredPromise', () => {
	describe('getState Web3DeferredPromise', () => {
		it('%s', () => {
			const promise = new Web3DeferredPromise();
			expect(promise.state).toBe('pending');
		});
	});
	describe('Web3DeferredPromise resolves promise', () => {
		it('%s', () => {
			const promise = new Web3DeferredPromise();
			promise.resolve('mockValue');
			expect(promise.state).toBe('fulfilled');
		});
	});
	describe('Web3DeferredPromise reject promise', () => {
		it('%s', async () => {
			const promise = new Web3DeferredPromise();
			promise.reject(new Error('fail'));
			// eslint-disable-next-line jest/no-conditional-expect
			await promise.catch(val => expect(val).toEqual(new Error('fail')));
			expect(promise.state).toBe('rejected');
		});
	});

	describe('Web3DeferredPromise timeout', () => {
		it('%s', async () => {
			const promise = new Web3DeferredPromise({
				timeout: 100,
				eagerStart: true,
				timeoutMessage: 'DeferredPromise timed out',
			});
			// eslint-disable-next-line jest/no-conditional-expect
			await promise.catch(val => expect(val).toEqual(new Error('DeferredPromise timed out')));
			expect(promise.state).toBe('rejected');
		});
	});
});
