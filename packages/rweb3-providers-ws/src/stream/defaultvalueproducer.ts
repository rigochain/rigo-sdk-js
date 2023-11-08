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
import { Listener, Producer } from 'xstream';

export interface DefaultValueProducerCallsbacks {
    readonly onStarted: () => void;
    readonly onStop: () => void;
}

// allows pre-producing values before anyone is listening
export class DefaultValueProducer<T> implements Producer<T> {
    public get value(): T {
        return this.internalValue;
    }

    private readonly callbacks: DefaultValueProducerCallsbacks | undefined;
    private internalValue: T;
    private listener: Listener<T> | undefined;

    public constructor(value: T, callbacks?: DefaultValueProducerCallsbacks) {
        this.callbacks = callbacks;
        this.internalValue = value;
    }

    /**
     * Update the current value.
     *
     * If producer is active (i.e. someone is listening), this emits an event.
     * If not, just the current value is updated.
     */
    public update(value: T): void {
        this.internalValue = value;
        if (this.listener) {
            this.listener.next(value);
        }
    }

    /**
     * Produce an error
     */
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    public error(error: any): void {
        if (this.listener) {
            this.listener.error(error);
        }
    }

    /**
     * Called by the stream. Do not call this directly.
     */
    public start(listener: Listener<T>): void {
        this.listener = listener;
        listener.next(this.internalValue);

        if (this.callbacks) {
            this.callbacks.onStarted();
        }
    }

    /**
     * Called by the stream. Do not call this directly.
     */
    public stop(): void {
        if (this.callbacks) {
            this.callbacks.onStop();
        }
        this.listener = undefined;
    }
}
