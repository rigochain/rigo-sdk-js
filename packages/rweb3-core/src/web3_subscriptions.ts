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

// eslint-disable-next-line max-classes-per-file
import {
    DEFAULT_RETURN_FORMAT,
    DataFormat,
    RigoExecutionAPI,
    JsonRpcSubscriptionResult,
    JsonRpcSubscriptionResultOld,
    JsonRpcNotification,
    Log,
    HexString,
    RWeb3APIParams,
    RWeb3APISpec,
} from 'rweb3-types';
import { jsonRpc } from 'rweb3-utils';
import { SubscriptionError } from 'rweb3-errors';

import { Web3SubscriptionManager } from './web3_subscription_manager.js';
import { Web3EventEmitter, Web3EventMap } from './web3_event_emitter.js';
import { RWeb3RequestManager } from './rweb3_request_manager.js';

export abstract class Web3Subscription<
    EventMap extends Web3EventMap,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ArgsType = any,
    API extends RWeb3APISpec = RigoExecutionAPI,
> extends Web3EventEmitter<EventMap> {
    private readonly _subscriptionManager: Web3SubscriptionManager<API>;
    private readonly _returnFormat: DataFormat;
    protected _id?: HexString;

    public constructor(
        args: ArgsType,
        options: { subscriptionManager: Web3SubscriptionManager; returnFormat?: DataFormat },
    );
    /**
     * @deprecated This constructor overloading should not be used
     */
    public constructor(
        args: ArgsType,
        options: { requestManager: RWeb3RequestManager<API>; returnFormat?: DataFormat },
    );
    public constructor(
        public readonly args: ArgsType,
        options: (
            | { subscriptionManager: Web3SubscriptionManager }
            | { requestManager: RWeb3RequestManager<API> }
        ) & {
            returnFormat?: DataFormat;
        },
    ) {
        super();
        const { requestManager } = options as { requestManager: RWeb3RequestManager<API> };
        const { subscriptionManager } = options as { subscriptionManager: Web3SubscriptionManager };
        if (requestManager && subscriptionManager) {
            throw new SubscriptionError(
                'Only requestManager or subscriptionManager should be provided at Subscription constructor',
            );
        }
        if (!requestManager && !subscriptionManager) {
            throw new SubscriptionError(
                'Either requestManager or subscriptionManager should be provided at Subscription constructor',
            );
        }
        if (requestManager) {
            this._subscriptionManager = new Web3SubscriptionManager(requestManager, {}, true);
        } else {
            this._subscriptionManager = subscriptionManager;
        }

        this._returnFormat = options?.returnFormat ?? (DEFAULT_RETURN_FORMAT as DataFormat);
    }

    public get id() {
        return this._id;
    }

    public async subscribe(): Promise<string> {
        return this._subscriptionManager.addSubscription(this);
    }

    public processSubscriptionData(
        data:
            | JsonRpcSubscriptionResult
            | JsonRpcSubscriptionResultOld<Log>
            | JsonRpcNotification<Log>,
    ) {
        if (data?.data) {
            // for EIP-1193 provider
            this._processSubscriptionResult(data?.data?.result ?? data?.data);
        } else if (
            data &&
            jsonRpc.isResponseWithNotification(
                data as unknown as JsonRpcSubscriptionResult | JsonRpcNotification<Log>,
            )
        ) {
            this._processSubscriptionResult(data?.params.result);
        }
    }

    protected get returnFormat() {
        return this._returnFormat;
    }
    public async resubscribe() {
        await this.unsubscribe();
        await this.subscribe();
    }

    public async unsubscribe() {
        if (!this.id) {
            return;
        }

        await this._subscriptionManager.removeSubscription(this);
    }

    public async sendUnsubscribeRequest() {
        await this._subscriptionManager.requestManager.send({
            method: 'eth_unsubscribe',
            params: [this.id] as RWeb3APIParams<API, 'eth_unsubscribe'>,
        });
        this._id = undefined;
    }

    // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
    protected _processSubscriptionResult(_data: unknown) {
        // Do nothing - This should be overridden in subclass.
    }

    // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
    protected _processSubscriptionError(_err: Error) {
        // Do nothing - This should be overridden in subclass.
    }

    // eslint-disable-next-line class-methods-use-this
    protected _buildSubscriptionParams(): RWeb3APIParams<API, 'eth_subscribe'> {
        // This should be overridden in the subclass
        throw new Error('Implement in the child class');
    }
}

export type Web3SubscriptionConstructor<
    API extends RWeb3APISpec,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    SubscriptionType extends Web3Subscription<any, any, API> = Web3Subscription<any, any, API>,
> =
    | (new (
          // We accept any type of arguments here and don't deal with this type internally
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          args: any,
          options:
              | { subscriptionManager: Web3SubscriptionManager<API>; returnFormat?: DataFormat }
              | { requestManager: RWeb3RequestManager<API>; returnFormat?: DataFormat },
      ) => SubscriptionType)
    | (new (
          args: any,
          options: {
              subscriptionManager: Web3SubscriptionManager<API>;
              returnFormat?: DataFormat;
          },
      ) => SubscriptionType)
    | (new (
          args: any,
          options: { requestManager: RWeb3RequestManager<API>; returnFormat?: DataFormat },
      ) => SubscriptionType);
