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
import { MemoryStream } from 'xstream';

import { DefaultValueProducer } from './defaultvalueproducer';

export type SearchFunction<T> = (value: T) => boolean;

/**
 * A read only wrapper around DefaultValueProducer that allows
 * to synchronously get the current value using the .value property
 * and listen to to updates by suscribing to the .updates stream
 */
export class ValueAndUpdates<T> {
    public readonly updates: MemoryStream<T>;

    public get value(): T {
        return this.producer.value;
    }

    private readonly producer: DefaultValueProducer<T>;

    public constructor(producer: DefaultValueProducer<T>) {
        this.producer = producer;
        this.updates = MemoryStream.createWithMemory(this.producer);
    }

    /**
     * Resolves as soon as search value is found.
     *
     * @param search either a value or a function that must return true when found
     * @returns the value of the update that caused the search match
     */
    public async waitFor(search: SearchFunction<T> | T): Promise<T> {
        const searchImplementation: SearchFunction<T> =
            typeof search === 'function'
                ? (search as SearchFunction<T>)
                : (value: T): boolean => value === search;

        return new Promise((resolve, reject) => {
            const subscription = this.updates.subscribe({
                next: (newValue) => {
                    if (searchImplementation(newValue)) {
                        resolve(newValue);

                        // MemoryStream.subscribe() calls next with the last value.
                        // Make async to ensure the subscription exists
                        setTimeout(() => subscription.unsubscribe(), 0);
                    }
                },
                complete: () => {
                    subscription.unsubscribe();
                    reject('Update stream completed without expected value');
                },
                error: (error) => {
                    reject(error);
                },
            });
        });
    }
}
