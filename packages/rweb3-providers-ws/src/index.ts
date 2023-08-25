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

import { ReconnectingSocket } from './socket/reconnecting_socket';

import { Listener, Producer, Stream, Subscription } from 'xstream';
import {
    JsonRpcId,
    JsonRpcRequest,
    JsonRpcResponse,
    JsonRpcResponseWithError,
    JsonRpcResponseWithResult,
    RigoExecutionAPI,
    RWeb3APIMethod,
    RWeb3APIPayload,
    RWeb3APIReturnType,
    RWeb3APISpec,
} from 'rweb3-types';
import { ConnectionStatus } from './socket/queueing_streaming_socket';
import { SocketWrapperMessageEvent } from './socket/socket_wrapper';
import { isNullish } from 'rweb3-utils';

class RpcEventProducer implements Producer<SubscriptionEvent> {
    private readonly request: JsonRpcRequest;
    private readonly socket: ReconnectingSocket;

    private running = false;
    private subscriptions: Subscription[] = [];

    public constructor(request: JsonRpcRequest, socket: ReconnectingSocket) {
        this.request = request;
        this.socket = socket;
    }

    /**
     * Implementation of Producer.start
     */
    public start(listener: Listener<SubscriptionEvent>): void {
        if (this.running) {
            throw Error('Already started. Please stop first before restarting.');
        }
        this.running = true;

        this.connectToClient(listener);

        this.socket.queueRequest(JSON.stringify(this.request));
    }

    /**
     * Implementation of Producer.stop
     *
     * Called by the stream when the stream's last listener stopped listening
     * or when the producer completed.
     */
    public stop(): void {
        this.running = false;
        // Tell the server we are done in order to save resources. We cannot wait for the result.
        // This may fail when socket connection is not open, thus ignore errors in queueRequest
        const endRequest: JsonRpcRequest = { ...this.request, method: 'unsubscribe' };
        try {
            this.socket.queueRequest(JSON.stringify(endRequest));
        } catch (error) {
            if (error instanceof Error && error.message.match(/socket has disconnected/i)) {
                // ignore
            } else {
                throw error;
            }
        }
    }

    protected connectToClient(listener: Listener<SubscriptionEvent>): void {
        const responseStream = this.socket.events.map(toJsonRpcResponse);

        // this should unsubscribe itself, so doesn't need to be removed explicitly
        const idSubscription = responseStream
            .filter((response) => response.id === this.request.id)
            .subscribe({
                next: (response) => {
                    if (isJsonRpcErrorResponse(response)) {
                        this.closeSubscriptions();
                        listener.error(JSON.stringify(response.error));
                    }
                    idSubscription.unsubscribe();
                },
            });

        // this will fire on a response (success or error)
        // Tendermint adds an "#event" suffix for events that follow a previous subscription
        // https://github.com/tendermint/tendermint/blob/v0.23.0/rpc/core/events.go#L107
        const idEventSubscription = responseStream
            .filter((response) => response.id === this.request.id)
            .subscribe({
                next: (response) => {
                    if (isJsonRpcErrorResponse(response)) {
                        this.closeSubscriptions();
                        listener.error(JSON.stringify(response.error));
                    } else {
                        listener.next(response.result as unknown as SubscriptionEvent);
                    }
                },
            });

        // this will fire in case the websocket disconnects cleanly
        const nonResponseSubscription = responseStream.subscribe({
            error: (error) => {
                this.closeSubscriptions();
                listener.error(error);
            },
            complete: () => {
                this.closeSubscriptions();
                listener.complete();
            },
        });

        this.subscriptions.push(idSubscription, idEventSubscription, nonResponseSubscription);
    }

    protected closeSubscriptions(): void {
        for (const subscription of this.subscriptions) {
            subscription.unsubscribe();
        }
        // clear unused subscriptions
        this.subscriptions = [];
    }
}

export default class WebsocketProvider<API extends RWeb3APISpec = RigoExecutionAPI> {
    private readonly url: string;
    private readonly socket: ReconnectingSocket;

    /** Same events as in socket.events but in the format we need */
    private readonly jsonRpcResponseStream: Stream<JsonRpcResponse>;

    // Lazily create streams and use the same stream when listening to the same query twice.
    //
    // Creating streams is cheap since producer is not started as long as nobody listens to events. Thus this
    // map is never cleared and there is no need to do so. But unsubscribe all the subscriptions!
    private readonly subscriptionStreams = new Map<string, Stream<SubscriptionEvent>>();

    public constructor(baseUrl: string, onError: (err: any) => void = defaultErrorHandler) {
        console.log('run websocket provider');

        // accept host.name:port and assume ws protocol
        // make sure we don't end up with ...//websocket
        const path = baseUrl.endsWith('/') ? 'websocket' : '/websocket';
        const cleanBaseUrl = hasProtocol(baseUrl) ? baseUrl : 'ws://' + baseUrl;
        this.url = cleanBaseUrl + path;

        this.socket = new ReconnectingSocket(this.url);

        const errorSubscription = this.socket.events.subscribe({
            error: (error) => {
                onError(error);
                errorSubscription.unsubscribe();
            },
        });

        this.jsonRpcResponseStream = this.socket.events.map(toJsonRpcResponse);

        this.socket.connect();
    }

    public async request<
        Method extends RWeb3APIMethod<API>,
        ResponseType = RWeb3APIReturnType<API, Method>,
    >(payload: RWeb3APIPayload<API, Method>): Promise<JsonRpcResponseWithResult<ResponseType>> {
        console.log('websocket provider request', payload);

        // {
        //     jsonrpc: '2.0',
        //         id: '8fcd801c-cfc4-4f88-8f7d-f6e5d9200dde',
        //     method: 'status',
        //     params: {}
        // }

        return this.execute(payload as JsonRpcRequest);
    }

    public async execute<
        Method extends RWeb3APIMethod<API>,
        ResponseType = RWeb3APIReturnType<API, Method>,
    >(payload: RWeb3APIPayload<API, Method>): Promise<JsonRpcResponseWithResult<ResponseType>> {
        const pendingResponse = this.responseForRequestId(payload.id);
        this.socket.queueRequest(JSON.stringify(payload));

        const response = await pendingResponse;
        if (isJsonRpcErrorResponse(response)) {
            throw new Error(JSON.stringify(response.error));
        }
        return response as unknown as JsonRpcResponseWithResult<ResponseType>;
    }

    public listen(request: JsonRpcRequest): Stream<SubscriptionEvent> {
        if (request.method !== 'subscribe') {
            throw new Error(`Request method must be "subscribe" to start event listening`);
        }

        const query = (request.params as any).query;
        if (typeof query !== 'string') {
            throw new Error('request.params.query must be a string');
        }

        if (!this.subscriptionStreams.has(query)) {
            const producer = new RpcEventProducer(request, this.socket);
            const stream = Stream.create(producer);
            this.subscriptionStreams.set(query, stream);
        }
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return this.subscriptionStreams
            .get(query)!
            .filter((response) => response.query !== undefined);
    }

    /**
     * Resolves as soon as websocket is connected. execute() queues requests automatically,
     * so this should be required for testing purposes only.
     */
    public async connected(): Promise<void> {
        await this.socket.connectionStatus.waitFor(ConnectionStatus.Connected);
    }

    public disconnect(): void {
        this.socket.disconnect();
    }

    protected async responseForRequestId(id: JsonRpcId): Promise<JsonRpcResponse> {
        return firstEvent(this.jsonRpcResponseStream.filter((r) => r.id === id));
    }

    public getClientUrl(): string {
        return this.url;
    }
}

export interface SubscriptionEvent {
    readonly query: string;
    readonly data: {
        readonly type: string;
        readonly value: any;
    };
}

export function hasProtocol(url: string): boolean {
    return url.search('://') !== -1;
}

function defaultErrorHandler(error: any): never {
    throw error;
}

function toJsonRpcResponse(message: SocketWrapperMessageEvent): JsonRpcResponse {
    // this should never happen, but I want an alert if it does
    if (message.type !== 'message') {
        throw new Error(`Unexcepted message type on websocket: ${message.type}`);
    }

    return parseJsonRpcResponse(JSON.parse(message.data));
}

/**
 * Returns a JsonRpcErrorResponse if input can be parsed as a JSON-RPC error. Otherwise parses
 * input as JsonRpcSuccessResponse. Throws if input is neither a valid error nor success response.
 */
export function parseJsonRpcResponse(data: any): JsonRpcResponse {
    let response: JsonRpcResponse;
    try {
        response = parseJsonRpcErrorResponse(data);
    } catch (_) {
        response = parseJsonRpcSuccessResponse(data);
    }
    return response;
}

/** Throws if data is not a JsonRpcErrorResponse */
export function parseJsonRpcErrorResponse(data: any): JsonRpcResponseWithError {
    const id = data.id;
    if (typeof id !== 'number' && typeof id !== 'string' && id !== null) {
        throw new Error('Invalid id field');
    }

    if (typeof data.error === 'undefined' || isNullish(data.error)) {
        throw new Error('Invalid error field');
    }

    return {
        jsonrpc: '2.0',
        id: id,
        error: data.error,
    };
}

export function parseJsonRpcSuccessResponse(data: any): JsonRpcResponseWithResult {
    const id = data.id;
    if (typeof id !== 'number' && typeof id !== 'string') {
        throw new Error('Invalid id field');
    }

    if (typeof data.result === 'undefined') {
        throw new Error('Invalid result field');
    }

    const result = data.result;

    return {
        jsonrpc: '2.0',
        id: id,
        result: result,
    };
}

export function isJsonRpcErrorResponse(
    response: JsonRpcResponse,
): response is JsonRpcResponseWithError {
    return typeof (response as JsonRpcResponseWithError).error === 'object';
}

/**
 * Listens to stream and collects events. When `count` events are collected,
 * the promise resolves with an array of events.
 *
 * Rejects if stream completes before `count` events are collected.
 */
export async function toListPromise<T>(stream: Stream<T>, count: number): Promise<readonly T[]> {
    return new Promise<readonly T[]>((resolve, reject) => {
        if (count === 0) {
            resolve([]);
            return;
        }

        const events = new Array<T>();
        // take() unsubscribes from source stream automatically
        stream.take(count).subscribe({
            next: (event) => {
                events.push(event);

                if (events.length === count) {
                    resolve(events);
                }
            },
            complete: () => {
                reject(
                    `Stream completed before all events could be collected. ` +
                        `Collected ${events.length}, expected ${count}`,
                );
            },
            error: (error) => reject(error),
        });
    });
}

/**
 * Listens to stream, collects one event and revolves.
 *
 * Rejects if stream completes before one event was fired.
 */
export async function firstEvent<T>(stream: Stream<T>): Promise<T> {
    return (await toListPromise(stream, 1))[0];
}

export { WebsocketProvider };
