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
import { Listener, Producer, Stream } from 'xstream';

import { Socket_wrapper, SocketWrapperMessageEvent } from './socket_wrapper.js';

/**
 * A WebSocket wrapper that exposes all events as a stream.
 *
 * This underlying socket will not be closed when the stream has no listeners
 */
export class Streaming_socket {
    public readonly connected: Promise<void>;
    public readonly events: Stream<SocketWrapperMessageEvent>;
    private eventProducerListener: Listener<SocketWrapperMessageEvent> | undefined;
    private readonly socket: Socket_wrapper;

    public constructor(url: string, timeout = 10_000) {
        this.socket = new Socket_wrapper(
            url,
            (event) => {
                if (this.eventProducerListener) {
                    this.eventProducerListener.next(event);
                }
            },
            (errorEvent) => {
                if (this.eventProducerListener) {
                    this.eventProducerListener.error(errorEvent);
                }
            },
            () => {
                // socket opened
            },
            (closeEvent) => {
                if (this.eventProducerListener) {
                    if (closeEvent.wasClean) {
                        this.eventProducerListener.complete();
                    } else {
                        this.eventProducerListener.error('Socket was closed unclean');
                    }
                }
            },
            timeout,
        );
        this.connected = this.socket.connected;

        const eventProducer: Producer<any> = {
            start: (listener) => (this.eventProducerListener = listener),
            stop: () => (this.eventProducerListener = undefined),
        };
        this.events = Stream.create(eventProducer);
    }

    public connect(): void {
        this.socket.connect();
    }

    public disconnect(): void {
        this.socket.disconnect();
    }

    public async send(data: string): Promise<void> {
        return this.socket.send(data);
    }
}
