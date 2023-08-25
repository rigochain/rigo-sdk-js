import { ChunkResponseParser } from '../../src/chunk_response_parser';
import { EventEmitter } from 'events';
import { JsonRpcResponse } from 'rweb3-types';

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

    test('parseResponse - invalid chunk', () => {
        jest.useFakeTimers();
        const data = "{ id: 1, jsonrpc: '2.0', result: 'testResult1' }{ id: 2, jsonrpc: '2.0',";
        const clearQueuesMock = jest.fn();
        parser.onError(clearQueuesMock);
        const result = parser.parseResponse(data);
        expect(result).toEqual([]);
        jest.runAllTimers();
        expect(clearQueuesMock).toHaveBeenCalled();
        jest.useRealTimers();
    });
});
