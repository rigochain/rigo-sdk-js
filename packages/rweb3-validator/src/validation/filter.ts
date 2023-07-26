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


import { Filter } from 'rweb3-types';
import { isAddress } from './address.js';
import { isBlockNumberOrTag } from './block.js';
import { isNullish } from './object.js';
import { isTopic } from './topic.js';

/**
 * First we check if all properties in the provided value are expected,
 * then because all Filter properties are optional, we check if the expected properties
 * are defined. If defined and they're not the expected type, we immediately return false,
 * otherwise we return true after all checks pass.
 */
export const isFilterObject = (value: Filter) => {
	const expectedFilterProperties: (keyof Filter)[] = [
		'fromBlock',
		'toBlock',
		'address',
		'topics',
		'blockHash',
	];
	if (isNullish(value) || typeof value !== 'object') return false;

	if (
		!Object.keys(value).every(property =>
			expectedFilterProperties.includes(property as keyof Filter),
		)
	)
		return false;

	if (
		(!isNullish(value.fromBlock) && !isBlockNumberOrTag(value.fromBlock)) ||
		(!isNullish(value.toBlock) && !isBlockNumberOrTag(value.toBlock))
	)
		return false;

	if (!isNullish(value.address)) {
		if (Array.isArray(value.address)) {
			if (!value.address.every(address => isAddress(address))) return false;
		} else if (!isAddress(value.address)) return false;
	}

	if (!isNullish(value.topics)) {
		if (
			!value.topics.every(topic => {
				if (isNullish(topic)) return true;

				if (Array.isArray(topic)) {
					return topic.every(nestedTopic => isTopic(nestedTopic));
				}

				if (isTopic(topic)) return true;

				return false;
			})
		)
			return false;
	}

	return true;
};
