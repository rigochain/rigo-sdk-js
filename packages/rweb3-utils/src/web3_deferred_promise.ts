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

import { OperationTimeoutError } from 'rweb3-errors';
import { Web3DeferredPromiseInterface } from 'rweb3-types';

/**
 * The class is a simple implementation of a deferred promise with optional timeout functionality,
 * which can be useful when dealing with asynchronous tasks.
 *
 */
export class Web3DeferredPromise<T> implements Promise<T>, Web3DeferredPromiseInterface<T> {
	// public tag to treat object as promise by different libs
	// eslint-disable-next-line @typescript-eslint/prefer-as-const
	public [Symbol.toStringTag]: 'Promise' = 'Promise';

	private readonly _promise: Promise<T>;
	private _resolve!: (value: T | PromiseLike<T>) => void;
	private _reject!: (reason?: unknown) => void;
	private _state: 'pending' | 'fulfilled' | 'rejected' = 'pending';
	private _timeoutId?: NodeJS.Timeout;
	private readonly _timeoutInterval?: number;
	private readonly _timeoutMessage: string;

	/**
	 *
	 * @param timeout - (optional) The timeout in milliseconds.
	 * @param eagerStart - (optional) If true, the timer starts as soon as the promise is created.
	 * @param timeoutMessage - (optional) The message to include in the timeout erro that is thrown when the promise times out.
	 */
	public constructor(
		{
			timeout,
			eagerStart,
			timeoutMessage,
		}: { timeout: number; eagerStart: boolean; timeoutMessage: string } = {
			timeout: 0,
			eagerStart: false,
			timeoutMessage: 'DeferredPromise timed out',
		},
	) {
		this._promise = new Promise<T>((resolve, reject) => {
			this._resolve = resolve;
			this._reject = reject;
		});

		this._timeoutMessage = timeoutMessage;
		this._timeoutInterval = timeout;

		if (eagerStart) {
			this.startTimer();
		}
	}
	/**
	 * Returns the current state of the promise.
	 * @returns 'pending' | 'fulfilled' | 'rejected'
	 */
	public get state(): 'pending' | 'fulfilled' | 'rejected' {
		return this._state;
	}
	/**
	 *
	 * @param onfulfilled - (optional) The callback to execute when the promise is fulfilled.
	 * @param onrejected  - (optional) The callback to execute when the promise is rejected.
	 * @returns
	 */
	public async then<TResult1, TResult2>(
		onfulfilled?: (value: T) => TResult1 | PromiseLike<TResult1>,
		onrejected?: (reason: unknown) => TResult2 | PromiseLike<TResult2>,
	): Promise<TResult1 | TResult2> {
		return this._promise.then(onfulfilled, onrejected);
	}
	/**
	 *
	 * @param onrejected - (optional) The callback to execute when the promise is rejected.
	 * @returns
	 */
	public async catch<TResult>(
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		onrejected?: (reason: any) => TResult | PromiseLike<TResult>,
	): Promise<T | TResult> {
		return this._promise.catch(onrejected);
	}

	/**
	 *
	 * @param onfinally - (optional) The callback to execute when the promise is settled (fulfilled or rejected).
	 * @returns
	 */
	public async finally(onfinally?: (() => void) | undefined): Promise<T> {
		return this._promise.finally(onfinally);
	}

	/**
	 * Resolves the current promise.
	 * @param value - The value to resolve the promise with.
	 */
	public resolve(value: T | PromiseLike<T>): void {
		this._resolve(value);
		this._state = 'fulfilled';
		this._clearTimeout();
	}

	/**
	 * Rejects the current promise.
	 * @param reason - The reason to reject the promise with.
	 */
	public reject(reason?: unknown): void {
		this._reject(reason);
		this._state = 'rejected';
		this._clearTimeout();
	}

	/**
	 * Starts the timeout timer for the promise.
	 */
	public startTimer() {
		if (this._timeoutInterval && this._timeoutInterval > 0) {
			this._timeoutId = setTimeout(this._checkTimeout.bind(this), this._timeoutInterval);
		}
	}

	private _checkTimeout() {
		if (this._state === 'pending' && this._timeoutId) {
			this.reject(new OperationTimeoutError(this._timeoutMessage));
		}
	}

	private _clearTimeout() {
		if (this._timeoutId) {
			clearTimeout(this._timeoutId);
		}
	}
}
