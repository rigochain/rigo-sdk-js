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

import { SocketWrapperMessageEvent } from './socket_wrapper.js';
import { Streaming_socket } from './streaming_socket.js';
import { ValueAndUpdates } from '../stream/valueandupdates.js';
import { DefaultValueProducer } from '../stream/defaultvalueproducer.js';

export enum ConnectionStatus {
    Unconnected,
    Connecting,
    Connected,
    Disconnected,
}

/**
 * A wrapper around Streaming_socket that can queue requests.
 */
export class QueueingStreamingSocket {
    public readonly connectionStatus: ValueAndUpdates<ConnectionStatus>;
    public readonly events: Stream<SocketWrapperMessageEvent>;

    private readonly url: string;
    private readonly timeout: number;
    private readonly queue: string[] = [];
    private socket: Streaming_socket;
    private isProcessingQueue = false;
    private eventProducerListener: Listener<SocketWrapperMessageEvent> | undefined;
    private readonly connectionStatusProducer: DefaultValueProducer<ConnectionStatus>;
    private readonly reconnectedHandler?: () => void;

    public constructor(url: string, timeout = 10_000, reconnectedHandler?: () => void) {
        this.url = url;
        this.timeout = timeout;
        this.reconnectedHandler = reconnectedHandler;

        const eventProducer: Producer<any> = {
            start: (listener) => (this.eventProducerListener = listener),
            stop: () => (this.eventProducerListener = undefined),
        };
        this.events = Stream.create(eventProducer);
        this.connectionStatusProducer = new DefaultValueProducer<ConnectionStatus>(
            ConnectionStatus.Unconnected,
        );
        this.connectionStatus = new ValueAndUpdates(this.connectionStatusProducer);

        this.socket = new Streaming_socket(this.url, this.timeout);

        this.socket.events.subscribe({
            next: (event) => {
                if (!this.eventProducerListener) throw new Error('No event producer listener set');
                this.eventProducerListener.next(event);
            },
            error: () => this.connectionStatusProducer.update(ConnectionStatus.Disconnected),
        });
    }

    public connect(): void {
        this.connectionStatusProducer.update(ConnectionStatus.Connecting);
        this.socket.connected.then(
            async () => {
                this.connectionStatusProducer.update(ConnectionStatus.Connected);
                return this.processQueue();
            },
            () => this.connectionStatusProducer.update(ConnectionStatus.Disconnected),
        );
        this.socket.connect();
    }

    public disconnect(): void {
        this.connectionStatusProducer.update(ConnectionStatus.Disconnected);
        this.socket.disconnect();
    }

    public reconnect(): void {
        this.socket = new Streaming_socket(this.url, this.timeout);
        this.socket.events.subscribe({
            next: (event) => {
                if (!this.eventProducerListener) throw new Error('No event producer listener set');
                this.eventProducerListener.next(event);
            },
            error: () => this.connectionStatusProducer.update(ConnectionStatus.Disconnected),
        });
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this.socket.connected.then(() => {
            if (this.reconnectedHandler) {
                this.reconnectedHandler();
            }
        });
        this.connect();
    }

    public getQueueLength(): number {
        return this.queue.length;
    }

    public queueRequest(request: string): void {
        this.queue.push(request);
        // We don’t need to wait for the queue to be processed.
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this.processQueue();
    }

    private async processQueue(): Promise<void> {
        if (this.isProcessingQueue || this.connectionStatus.value !== ConnectionStatus.Connected) {
            return;
        }
        this.isProcessingQueue = true;

        let request: string | undefined;

        while ((request = this.queue.shift())) {
            try {
                await this.socket.send(request);
                this.isProcessingQueue = false;
            } catch (error) {
                // Probably the connection is down; will try again automatically when reconnected.
                this.queue.unshift(request);
                this.isProcessingQueue = false;
                return;
            }
        }

        this.isProcessingQueue = false;
    }
}
