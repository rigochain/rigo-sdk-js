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

import { isBloom, isInBloom } from './bloom.js';

/**
 * Checks if its a valid topic
 */
export const isTopic = (topic: string): boolean => {
    if (typeof topic !== 'string') {
        return false;
    }

    if (!/^(0x)?[0-9a-f]{64}$/i.test(topic)) {
        return false;
    }

    if (/^(0x)?[0-9a-f]{64}$/.test(topic) || /^(0x)?[0-9A-F]{64}$/.test(topic)) {
        return true;
    }

    return false;
};

/**
 * Returns true if the topic is part of the given bloom.
 * note: false positives are possible.
 */
export const isTopicInBloom = (bloom: string, topic: string): boolean => {
    if (!isBloom(bloom)) {
        return false;
    }

    if (!isTopic(topic)) {
        return false;
    }

    return isInBloom(bloom, topic);
};
