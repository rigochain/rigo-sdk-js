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

import { AbiEventFragment, HexString, Topic, DataFormat } from '@rigo/rweb3-types';
import { RWeb3RequestManager, Web3Subscription, Web3SubscriptionManager } from '@rigo/rweb3-core';
import { EventLog, ContractAbiWithSignature } from './types.js';

export class LogsSubscription extends Web3Subscription<
    {
        error: Error;
        connected: number;
        data: EventLog;
        changed: EventLog & { removed: true };
    },
    // eslint-disable-next-line @typescript-eslint/ban-types
    { address?: HexString; topics?: (Topic | Topic[] | null)[]; abi: AbiEventFragment }
> {
    /**
     * Address of tye contract
     */
    public readonly address?: HexString;

    /**
     * The list of topics subscribed
     */
    // eslint-disable-next-line @typescript-eslint/ban-types
    public readonly topics?: (Topic | Topic[] | null)[];

    /**
     * The {@doclink glossary/json_interface | JSON Interface} of the event.
     */
    public readonly abi: AbiEventFragment & { signature: HexString };

    public readonly jsonInterface: ContractAbiWithSignature;

    public constructor(
        args: {
            address?: HexString;
            // eslint-disable-next-line @typescript-eslint/ban-types
            topics?: (Topic | Topic[] | null)[];
            abi: AbiEventFragment & { signature: HexString };
            jsonInterface: ContractAbiWithSignature;
        },
        options: { subscriptionManager: Web3SubscriptionManager; returnFormat?: DataFormat },
    );
    /**
     * @deprecated This constructor overloading should not be used
     */
    public constructor(
        args: {
            address?: HexString;
            // eslint-disable-next-line @typescript-eslint/ban-types
            topics?: (Topic | Topic[] | null)[];
            abi: AbiEventFragment & { signature: HexString };
            jsonInterface: ContractAbiWithSignature;
        },
        options: { requestManager: RWeb3RequestManager; returnFormat?: DataFormat },
    );
    public constructor(
        args: {
            address?: HexString;
            // eslint-disable-next-line @typescript-eslint/ban-types
            topics?: (Topic | Topic[] | null)[];
            abi: AbiEventFragment & { signature: HexString };
            jsonInterface: ContractAbiWithSignature;
        },
        options: (
            | { subscriptionManager: Web3SubscriptionManager }
            | { requestManager: RWeb3RequestManager }
        ) & {
            returnFormat?: DataFormat;
        },
    ) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        super(args, options as any);

        this.address = args.address;
        this.topics = args.topics;
        this.abi = args.abi;
        this.jsonInterface = args.jsonInterface;
    }

    protected _buildSubscriptionParams() {
        return ['logs', { address: this.address, topics: this.topics }] as [
            'logs',
            { address?: string; topics?: string[] },
        ];
    }
}
