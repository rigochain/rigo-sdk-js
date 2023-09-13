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

import { DataFormat, DEFAULT_RETURN_FORMAT, RWeb3APISpec } from '@rigo/rweb3-types';
import { ProviderError, SubscriptionError } from '@rigo/rweb3-errors';
import { isNullish } from '@rigo/rweb3-utils';
import { isSupportSubscriptions } from './utils.js';
import { RWeb3RequestManager, Web3RequestManagerEvent } from './rweb3_request_manager.js';
// eslint-disable-next-line import/no-cycle
import { Web3SubscriptionConstructor } from './web3_subscriptions.js';

type ShouldUnsubscribeCondition = ({
    id,
    sub,
}: {
    id: string;
    sub: unknown;
}) => boolean | undefined;

export class Web3SubscriptionManager<
    API extends RWeb3APISpec = RWeb3APISpec,
    RegisteredSubs extends { [key: string]: Web3SubscriptionConstructor<API> } = {
        [key: string]: Web3SubscriptionConstructor<API>;
    },
> {
    private readonly _subscriptions: Map<
        string,
        InstanceType<RegisteredSubs[keyof RegisteredSubs]>
    > = new Map();

    /**
     *
     * @param - requestManager
     * @param - registeredSubscriptions
     *
     * @example
     * ```ts
     * const requestManager = new RWeb3RequestManager("ws://localhost:8545");
     * const subscriptionManager = new Web3SubscriptionManager(requestManager, {});
     * ```
     */
    public constructor(
        requestManager: RWeb3RequestManager<API>,
        registeredSubscriptions: RegisteredSubs,
    );
    /**
     * @deprecated This constructor overloading should not be used
     */
    public constructor(
        requestManager: RWeb3RequestManager<API>,
        registeredSubscriptions: RegisteredSubs,
        tolerateUnlinkedSubscription: boolean,
    );
    public constructor(
        public readonly requestManager: RWeb3RequestManager<API>,
        public readonly registeredSubscriptions: RegisteredSubs,
        private readonly tolerateUnlinkedSubscription: boolean = false,
    ) {
        this.requestManager.on(Web3RequestManagerEvent.BEFORE_PROVIDER_CHANGE, async () => {
            await this.unsubscribe();
        });

        this.requestManager.on(Web3RequestManagerEvent.PROVIDER_CHANGED, () => {
            this.clear();
        });
    }

    /**
     * Will create a new subscription
     *
     * @param name - The subscription you want to subscribe to
     * @param args - Optional additional parameters, depending on the subscription type
     * @param returnFormat- ({@link DataFormat} defaults to {@link DEFAULT_RETURN_FORMAT}) - Specifies how the return data from the call should be formatted.
     *
     * Will subscribe to a specific topic (note: name)
     * @returns The subscription object
     */
    public async subscribe<T extends keyof RegisteredSubs>(
        name: T,
        args?: ConstructorParameters<RegisteredSubs[T]>[0],
        returnFormat: DataFormat = DEFAULT_RETURN_FORMAT,
    ): Promise<InstanceType<RegisteredSubs[T]>> {
        const Klass: RegisteredSubs[T] = this.registeredSubscriptions[name];
        if (!Klass) {
            throw new SubscriptionError('Invalid subscription type');
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const subscription = new Klass(args ?? undefined, {
            subscriptionManager: this as Web3SubscriptionManager<API, RegisteredSubs>,
            returnFormat,
        } as any) as InstanceType<RegisteredSubs[T]>;

        await this.addSubscription(subscription);

        return subscription;
    }

    /**
     * Will returns all subscriptions.
     */
    public get subscriptions() {
        return this._subscriptions;
    }

    /**
     *
     * Adds an instance of {@link Web3Subscription} and subscribes to it
     *
     * @param sub - A {@link Web3Subscription} object
     */
    public async addSubscription(sub: InstanceType<RegisteredSubs[keyof RegisteredSubs]>) {
        if (!this.requestManager.provider) {
            throw new ProviderError('Provider not available');
        }

        if (!this.supportsSubscriptions()) {
            throw new SubscriptionError('The current provider does not support subscriptions');
        }

        if (sub.id && this._subscriptions.has(sub.id)) {
            throw new SubscriptionError(`Subscription with id "${sub.id}" already exists`);
        }

        if (isNullish(sub.id)) {
            throw new SubscriptionError('Subscription is not subscribed yet.');
        }

        this._subscriptions.set(sub.id, sub);

        return sub.id;
    }

    /**
     * Will clear a subscription
     *
     * @param id - The subscription of type {@link Web3Subscription}  to remove
     */
    public async removeSubscription(sub: InstanceType<RegisteredSubs[keyof RegisteredSubs]>) {
        const { id } = sub;

        if (isNullish(id)) {
            throw new SubscriptionError(
                'Subscription is not subscribed yet. Or, had already been unsubscribed but not through the Subscription Manager.',
            );
        }

        if (!this._subscriptions.has(id) && !this.tolerateUnlinkedSubscription) {
            throw new SubscriptionError(`Subscription with id "${id.toString()}" does not exists`);
        }

        await sub.sendUnsubscribeRequest();
        this._subscriptions.delete(id);
        return id;
    }
    /**
     * Will unsubscribe all subscriptions that fulfill the condition
     *
     * @param condition - A function that access and `id` and a `subscription` and return `true` or `false`
     * @returns An array of all the un-subscribed subscriptions
     */
    public async unsubscribe(condition?: ShouldUnsubscribeCondition) {
        const result = [];
        for (const [id, sub] of this.subscriptions.entries()) {
            if (!condition || (typeof condition === 'function' && condition({ id, sub }))) {
            }
        }

        return Promise.all(result);
    }

    /**
     * Clears all subscriptions
     */
    public clear() {
        this._subscriptions.clear();
    }

    /**
     * Check whether the current provider supports subscriptions.
     *
     * @returns `true` or `false` depending on if the current provider supports subscriptions
     */
    public supportsSubscriptions(): boolean {
        return isNullish(this.requestManager.provider)
            ? false
            : isSupportSubscriptions(this.requestManager.provider);
    }
}
