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
import { JsonRpcNotification, SubscriptionParams } from '@rigo/rweb3-types';

const responseWithResult = { jsonrpc: '2.0', id: 1, result: '' };
const responseWithError = { jsonrpc: '2.0', id: 1, error: { code: 1, message: 'string' } };
const responseWithSubscription = { id: 1, jsonrpc: '2.0', result: '' };
const responseWithNotfication = {
    jsonrpc: '2.0',
    method: 'subscribe',
    params: { subscription: '', result: '' } as SubscriptionParams,
} as JsonRpcNotification;
export const isResponseWithResultValidTest: [any, boolean][] = [
    [responseWithResult, true],
    [responseWithError, false],
];

export const isResponseWithErrorValidTest: [any, boolean][] = [
    [responseWithResult, false],
    [responseWithError, true],
];

export const isResponseWithNotificationValidTest: [JsonRpcNotification, boolean][] = [
    [responseWithNotfication, true],
];

export const isSubscriptionResultValidTest: [any, boolean][] = [[responseWithSubscription, true]];

export const isValidResponseValidTest: [any, boolean][] = [
    [responseWithResult, true],
    [responseWithError, true],
];

export const isBatchResponseValidTest: [any, boolean][] = [
    [[responseWithResult, responseWithError], true],
    [[responseWithNotfication], false],
];

export const toPayloadValidTest: [any, any][] = [
    [
        { method: 'delete' },
        {
            method: 'delete',
            id: expect.stringMatching(
                // Uuid
                '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}',
            ),
            jsonrpc: '2.0',
            params: undefined,
        },
    ],
];
