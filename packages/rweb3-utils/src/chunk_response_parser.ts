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

import { JsonRpcResponse } from '@rigochain/rweb3-types';
import { InvalidResponseError } from '@rigochain/rweb3-errors';
import { EventEmitter } from 'events';

export class ChunkResponseParser {
    private lastChunk: string | undefined;
    private lastChunkTimeout: NodeJS.Timeout | undefined;
    private _clearQueues: (() => void) | undefined;
    private readonly eventEmitter: EventEmitter;
    private readonly autoReconnect: boolean;

    public constructor(eventEmitter: EventEmitter, autoReconnect: boolean) {
        this.eventEmitter = eventEmitter;
        this.autoReconnect = autoReconnect;
    }

    private clearQueues(): void {
        if (typeof this._clearQueues === 'function') {
            this._clearQueues();
        }
    }

    public onError(clearQueues?: () => void) {
        this._clearQueues = clearQueues;
    }

    public parseResponse(data: string): JsonRpcResponse[] {
        const returnValues: JsonRpcResponse[] = [];

        // DE-CHUNKER
        const dechunkedData = data
            .replace(/\}[\n\r]?\{/g, '}|--|{') // }{
            .replace(/\}\][\n\r]?\[\{/g, '}]|--|[{') // }][{
            .replace(/\}[\n\r]?\[\{/g, '}|--|[{') // }[{
            .replace(/\}\][\n\r]?\{/g, '}]|--|{') // }]{
            .split('|--|');

        dechunkedData.forEach((_chunkData) => {
            // prepend the last chunk
            let chunkData = _chunkData;
            if (this.lastChunk) {
                chunkData = this.lastChunk + chunkData;
            }

            let result;

            try {
                result = JSON.parse(chunkData) as unknown as JsonRpcResponse;
            } catch (e) {
                this.lastChunk = chunkData;

                // start timeout to cancel all requests
                if (this.lastChunkTimeout) {
                    clearTimeout(this.lastChunkTimeout);
                }

                this.lastChunkTimeout = setTimeout(() => {
                    if (this.autoReconnect) return;
                    this.clearQueues();
                    this.eventEmitter.emit(
                        'error',
                        new InvalidResponseError({
                            id: 1,
                            jsonrpc: '2.0',
                            error: { code: 2, message: 'Chunk timeout' },
                        }),
                    );
                }, 1000 * 15);
                return;
            }

            // cancel timeout and set chunk to null
            clearTimeout(this.lastChunkTimeout);
            this.lastChunk = undefined;

            if (result) returnValues.push(result);
        });

        return returnValues;
    }
}
