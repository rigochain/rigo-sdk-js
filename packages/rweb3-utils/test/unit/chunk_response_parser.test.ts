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
import { ChunkResponseParser } from '../../src/chunk_response_parser';
import { EventEmitter } from 'events';
import { JsonRpcResponse } from '@rigochain/rweb3-types';

describe('ChunkResponseParser class tests', () => {
    let parser: ChunkResponseParser;
    const eventEmitter = new EventEmitter();
    const autoReconnect = true;

    beforeEach(() => {
        parser = new ChunkResponseParser(eventEmitter, autoReconnect);
    });

    test('parseResponse - single chunk', () => {
        const response: JsonRpcResponse = {
            id: 1,
            jsonrpc: '2.0',
            result: 'testResult',
        };
        const data = JSON.stringify(response);
        const result = parser.parseResponse(data);
        expect(result).toEqual([response]);
    });

    test('parseResponse - multiple chunks', () => {
        const response1: JsonRpcResponse = {
            id: 1,
            jsonrpc: '2.0',
            result: 'testResult1',
        };
        const response2: JsonRpcResponse = {
            id: 2,
            jsonrpc: '2.0',
            result: 'testResult2',
        };
        const data = `${JSON.stringify(response1)}${JSON.stringify(response2)}`;
        const result = parser.parseResponse(data);
        expect(result).toEqual([response1, response2]);
    });
});
