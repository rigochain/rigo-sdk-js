import {createJSONRPCRequest} from "json-rpc-2.0";

if(typeof global.WebSocket === 'undefined') {
    global.WebSocket = require('ws')
}

export default class Subscriber {
    #wsconn: WebSocket
    #query: string

    constructor(public url:string) {}

    start(query: string, cbFunc: (resp:string)=>void) {
        if(this.#wsconn) {
            console.error("already start.")
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
            console.log('websocket closed:', this.url)
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