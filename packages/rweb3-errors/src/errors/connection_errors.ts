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

/* eslint-disable max-classes-per-file */

import { ConnectionEvent } from '@rigochain/rweb3-types';
import {
    ERR_CONN,
    ERR_CONN_INVALID,
    ERR_CONN_TIMEOUT,
    ERR_CONN_NOT_OPEN,
    ERR_CONN_CLOSE,
    ERR_CONN_MAX_ATTEMPTS,
    ERR_CONN_PENDING_REQUESTS,
    ERR_REQ_ALREADY_SENT,
} from '../error_codes.js';
import { BaseRWeb3Error } from '../rweb3_error_base.js';

export class ConnectionError extends BaseRWeb3Error {
    public code = ERR_CONN;
    public errorCode?: number;
    public errorReason?: string;

    public constructor(message: string, event?: ConnectionEvent) {
        super(message);

        if (event) {
            this.errorCode = event.code;
            this.errorReason = event.reason;
        }
    }

    public toJSON() {
        return { ...super.toJSON(), errorCode: this.errorCode, errorReason: this.errorReason };
    }
}

export class InvalidConnectionError extends ConnectionError {
    public constructor(public host: string, event?: ConnectionEvent) {
        super(`CONNECTION ERROR: Couldn't connect to node ${host}.`, event);
        this.code = ERR_CONN_INVALID;
    }

    public toJSON() {
        return { ...super.toJSON(), host: this.host };
    }
}

export class ConnectionTimeoutError extends ConnectionError {
    public constructor(public duration: number) {
        super(`CONNECTION TIMEOUT: timeout of ${duration}ms achieved`);
        this.code = ERR_CONN_TIMEOUT;
    }

    public toJSON() {
        return { ...super.toJSON(), duration: this.duration };
    }
}

export class ConnectionNotOpenError extends ConnectionError {
    public constructor(event?: ConnectionEvent) {
        super('Connection not open', event);
        this.code = ERR_CONN_NOT_OPEN;
    }
}

export class ConnectionCloseError extends ConnectionError {
    public constructor(event?: ConnectionEvent) {
        super(
            `CONNECTION ERROR: The connection got closed with the close code ${
                event?.code ?? ''
            } and the following reason string ${event?.reason ?? ''}`,
            event,
        );
        this.code = ERR_CONN_CLOSE;
    }
}

export class MaxAttemptsReachedOnReconnectingError extends ConnectionError {
    public constructor(numberOfAttempts: number) {
        super(`Maximum number of reconnect attempts reached! (${numberOfAttempts})`);
        this.code = ERR_CONN_MAX_ATTEMPTS;
    }
}

export class PendingRequestsOnReconnectingError extends ConnectionError {
    public constructor() {
        super('CONNECTION ERROR: Provider started to reconnect before the response got received!');
        this.code = ERR_CONN_PENDING_REQUESTS;
    }
}

export class RequestAlreadySentError extends ConnectionError {
    public constructor(id: number | string) {
        super(`Request already sent with following id: ${id}`);
        this.code = ERR_REQ_ALREADY_SENT;
    }
}
