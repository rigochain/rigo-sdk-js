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

import {createJSONRPCRequest} from "json-rpc-2.0";

if(typeof global.WebSocket === 'undefined') {
    global.WebSocket = require('ws')
}

export default class Subscriber {

    #wsconn: WebSocket
    #query: string

    constructor(public url:string) {}

    start(query: string, cbFunc: (resp:string)=>void, isReconnected?: boolean, time?: number) {
        if(this.#wsconn) {
            console.log("already start.")
        }
        this.#query = query
        this.#wsconn = new WebSocket(this.url)
        this.#wsconn.onerror = (evt) => {
            console.error('websocket error:', evt)
            this.stop()
        }
        this.#wsconn.onopen = () => {
            console.log("websocket open:", this.url)
            const ret = createJSONRPCRequest("dontcare", 'subscribe', {query: this.#query})

            const reqstr = JSON.stringify(ret)
            console.log("websocket request:", reqstr)
            this.#wsconn.send(reqstr)
        }
        this.#wsconn.onmessage = (evt) => {
            let resp = JSON.parse(evt.data.toString())
            cbFunc(resp.result)
        }
        this.#wsconn.onclose = (evt) => {
            const self = this;
            console.log('websocket closed:', this.url)
            if(isReconnected) {
                
                let timeout: number;
                if(time) {
                    timeout = time
                } else {
                    timeout = 500
                }
                setTimeout(function() {
                    console.log('Trying to reconnect...')
                    self.#wsconn = null
                    self.start(query, cbFunc, isReconnected, timeout)
                }, timeout);
            }
        }
    }
    stop() {
        this.#wsconn.close(0, "Websocket is closed by application")
        this.#wsconn = null
    }

    getQuery(): string {
        return this.#query
    }
}