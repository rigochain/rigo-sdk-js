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

/**
 * Export all packages grouped by name spaces
 */
import RWeb3 from './rweb3.js';

export default RWeb3;

/**
 * Named exports for all objects which are the default-exported-object in their packages
 */

export { RWeb3 };
export { Contract } from 'rweb3-rigo-contract';

/**
 * Export all packages grouped by name spaces
 */
export * as core from 'rweb3-core';
export * as errors from 'rweb3-errors';
export * as rigo from './rigo.exports.js';
export { HttpProvider } from 'rweb3-providers-http';
export { WebsocketProvider } from 'rweb3-providers-ws';
export * as providers from './providers.exports.js';
export * as rpcMethods from 'rweb3-rpc-methods';
export { RWeb3Validator } from 'rweb3-validator';
export * as utils from 'rweb3-utils';
export * as validator from 'rweb3-validator';

/**
 * Export all types from `rweb3-types` without a namespace (in addition to being available at `types` namespace).
 * To enable the user to write: `function something(): RWeb3Api` without the need for `types.RWeb3Api`.
 * And the same for `rweb3-errors`. Because this package contains error classes and constants.
 */
export * from 'rweb3-errors';
export * from 'rweb3-types';
