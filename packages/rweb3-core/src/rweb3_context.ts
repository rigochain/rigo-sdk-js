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

import { RWeb3Config } from './rweb3_config.js';
import { RWeb3RequestManager } from './rweb3_request_manager.js';
import { isNullish } from 'rweb3-validator';
import { RWeb3APISpec, RigoExecutionAPI } from 'rweb3-types';
import HttpProvider from 'rweb3-providers-http';
import WebsocketProvider from 'rweb3-providers-ws';

// eslint-disable-next-line no-use-before-define
export type RWeb3ContextConstructor<T extends RWeb3Context, T2 extends unknown[]> = new (
    ...args: [...extras: T2, context: RWeb3ContextObject]
) => T;

// To avoid circular dependencies, we need to export type from here.
export type RWeb3ContextObject<API extends RWeb3APISpec = RigoExecutionAPI> = {
    requestManager: RWeb3RequestManager<API>;
};

export class RWeb3Context<API extends RWeb3APISpec = unknown> extends RWeb3Config {
    public readonly providers = RWeb3RequestManager.providers;
    protected _requestManager: RWeb3RequestManager<API>;
    public get requestManager() {
        return this._requestManager;
    }

    public constructor(providerOrContext?: string) {
        super();
        // If "providerOrContext" is provided as "string" or an objects matching "SupportedProviders" interface
        if (
            isNullish(providerOrContext) ||
            (typeof providerOrContext === 'string' && providerOrContext.trim() !== '')
        ) {
            this._requestManager = new RWeb3RequestManager(providerOrContext);
            return;
        }
    }

    public use<T extends RWeb3Context, T2 extends unknown[]>(
        ContextRef: RWeb3ContextConstructor<T, T2>,
        ...args: [...T2]
    ) {
        const useContext = new ContextRef(
            ...([...args, this.getContextObject()] as unknown as [...T2, RWeb3ContextObject]),
        );

        useContext._requestManager = this.requestManager;

        return useContext;
    }

    public set provider(provider: HttpProvider | WebsocketProvider | string | undefined) {
        this.requestManager.setProvider(provider);
    }

    public getContextObject(): RWeb3ContextObject<API> {
        return {
            requestManager: this.requestManager,
        };
    }

    public getProvider() {
        return this.requestManager.providers;
    }

    public setProvider(provider?: HttpProvider | WebsocketProvider | string): boolean {
        if (typeof provider === 'string') {
            // HTTP
            if (/^http(s)?:\/\//i.test(provider)) {
                this.provider = new HttpProvider(provider);
            }

            // WS
            if (/^ws(s)?:\/\//i.test(provider)) {
                this.provider = new WebsocketProvider(provider);
            }
        }
        this.requestManager.setProvider(provider);
        this.provider = provider;
        return true;
    }
}
