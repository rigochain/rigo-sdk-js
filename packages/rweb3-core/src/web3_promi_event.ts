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

import {
    Web3EventCallback,
    Web3EventEmitter,
    Web3EventKey,
    Web3EventMap,
} from './web3_event_emitter.js';

export type PromiseExecutor<T> = (
    resolve: (data: T) => void,
    reject: (reason: unknown) => void,
) => void;

export class Web3PromiEvent<ResolveType, EventMap extends Web3EventMap>
    extends Web3EventEmitter<EventMap>
    implements Promise<ResolveType>
{
    private readonly _promise: Promise<ResolveType>;

    public constructor(executor: PromiseExecutor<ResolveType>) {
        super();
        this._promise = new Promise<ResolveType>(executor);
    }

    // public tag to treat object as promise by different libs
    // eslint-disable-next-line @typescript-eslint/prefer-as-const
    public [Symbol.toStringTag]: 'Promise' = 'Promise';

    public async then<TResult1 = ResolveType, TResult2 = never>(
        onfulfilled?: ((value: ResolveType) => TResult1 | PromiseLike<TResult1>) | undefined,
        onrejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | undefined,
    ): Promise<TResult1 | TResult2> {
        return this._promise.then(onfulfilled, onrejected);
    }

    public async catch<TResult = never>(
        onrejected?: ((reason: unknown) => TResult | PromiseLike<TResult>) | undefined,
    ): Promise<ResolveType | TResult> {
        return this._promise.catch(onrejected);
    }

    public async finally(onfinally?: (() => void) | undefined): Promise<ResolveType> {
        return this._promise.finally(onfinally);
    }

    public on<K extends Web3EventKey<EventMap>>(
        eventName: K,
        fn: Web3EventCallback<EventMap[K]>,
    ): this {
        super.on(eventName, fn);

        return this;
    }

    public once<K extends Web3EventKey<EventMap>>(
        eventName: K,
        fn: Web3EventCallback<EventMap[K]>,
    ): this {
        super.once(eventName, fn);

        return this;
    }
}
