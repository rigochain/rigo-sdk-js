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

/* eslint-disable max-classes-per-file */

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
    ERR_ENS_CHECK_INTERFACE_SUPPORT,
    ERR_ENS_NETWORK_NOT_SYNCED,
    ERR_ENS_UNSUPPORTED_NETWORK,
} from '../error_codes.js';
import { BaseWeb3Error } from '../web3_error_base.js';

export class ENSCheckInterfaceSupportError extends BaseWeb3Error {
    public code = ERR_ENS_CHECK_INTERFACE_SUPPORT;
    public constructor(errorDetails: string) {
        super(`ENS resolver check interface support error. "${errorDetails}"`);
    }
}

export class ENSUnsupportedNetworkError extends BaseWeb3Error {
    public code = ERR_ENS_UNSUPPORTED_NETWORK;
    public constructor(networkType: string) {
        super(`ENS is not supported on network ${networkType}`);
    }
}

export class ENSNetworkNotSyncedError extends BaseWeb3Error {
    public code = ERR_ENS_NETWORK_NOT_SYNCED;
    public constructor() {
        super(`Network not synced`);
    }
}
