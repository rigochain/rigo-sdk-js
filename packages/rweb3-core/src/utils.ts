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
    EIP1193Provider,
    LegacyRequestProvider,
    LegacySendAsyncProvider,
    LegacySendProvider,
    SupportedProviders,
    RWeb3APISpec,
    Web3BaseProvider,
} from 'rweb3-types';

export const isWeb3Provider = <API extends RWeb3APISpec>(
    provider: SupportedProviders<API>,
): provider is Web3BaseProvider<API> => Web3BaseProvider.isWeb3Provider(provider);

export const isLegacyRequestProvider = <API extends RWeb3APISpec>(
    provider: SupportedProviders<API>,
): provider is LegacyRequestProvider =>
    typeof provider !== 'string' &&
    'request' in provider &&
    provider.request.constructor.name === 'Function';

export const isEIP1193Provider = <API extends RWeb3APISpec>(
    provider: SupportedProviders<API>,
): provider is EIP1193Provider<API> =>
    typeof provider !== 'string' &&
    'request' in provider &&
    provider.request.constructor.name === 'AsyncFunction';

export const isLegacySendProvider = <API extends RWeb3APISpec>(
    provider: SupportedProviders<API>,
): provider is LegacySendProvider => typeof provider !== 'string' && 'send' in provider;

export const isLegacySendAsyncProvider = <API extends RWeb3APISpec>(
    provider: SupportedProviders<API>,
): provider is LegacySendAsyncProvider => typeof provider !== 'string' && 'sendAsync' in provider;

export const isSupportedProvider = <API extends RWeb3APISpec>(
    provider: SupportedProviders<API>,
): provider is SupportedProviders<API> =>
    isWeb3Provider(provider) ||
    isEIP1193Provider(provider) ||
    isLegacyRequestProvider(provider) ||
    isLegacySendAsyncProvider(provider) ||
    isLegacySendProvider(provider);

export const isSupportSubscriptions = <API extends RWeb3APISpec>(
    provider: SupportedProviders<API>,
): boolean => {
    if (isWeb3Provider<API>(provider)) {
        return provider.supportsSubscriptions();
    }

    if (typeof provider !== 'string' && 'on' in provider) {
        return true;
    }

    return false;
};
