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

import { EventEmitter } from 'events';

export type Web3EventMap = Record<string, unknown>;
export type Web3EventKey<T extends Web3EventMap> = string & keyof T;
export type Web3EventCallback<T> = (params: T) => void | Promise<void>;
export interface Web3Emitter<T extends Web3EventMap> {
    on<K extends Web3EventKey<T>>(eventName: K, fn: Web3EventCallback<T[K]>): void;
    once<K extends Web3EventKey<T>>(eventName: K, fn: Web3EventCallback<T[K]>): void;
    off<K extends Web3EventKey<T>>(eventName: K, fn: Web3EventCallback<T[K]>): void;
    emit<K extends Web3EventKey<T>>(eventName: K, params: T[K]): void;
}

export class Web3EventEmitter<T extends Web3EventMap> implements Web3Emitter<T> {
    private readonly _emitter = new EventEmitter();

    public on<K extends Web3EventKey<T>>(eventName: K, fn: Web3EventCallback<T[K]>) {
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        this._emitter.on(eventName, fn);
    }

    public once<K extends Web3EventKey<T>>(eventName: K, fn: Web3EventCallback<T[K]>) {
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        this._emitter.once(eventName, fn);
    }

    public off<K extends Web3EventKey<T>>(eventName: K, fn: Web3EventCallback<T[K]>) {
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        this._emitter.off(eventName, fn);
    }

    public emit<K extends Web3EventKey<T>>(eventName: K, params: T[K]) {
        this._emitter.emit(eventName, params);
    }

    public listenerCount<K extends Web3EventKey<T>>(eventName: K) {
        return this._emitter.listenerCount(eventName);
    }

    public listeners<K extends Web3EventKey<T>>(eventName: K) {
        return this._emitter.listeners(eventName);
    }

    public eventNames() {
        return this._emitter.eventNames();
    }

    public removeAllListeners() {
        return this._emitter.removeAllListeners();
    }
    public setMaxListenerWarningThreshold(maxListenersWarningThreshold: number) {
        this._emitter.setMaxListeners(maxListenersWarningThreshold);
    }
    public getMaxListeners() {
        return this._emitter.getMaxListeners();
    }
}
