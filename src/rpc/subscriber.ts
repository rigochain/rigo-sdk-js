import {createJSONRPCRequest} from "json-rpc-2.0";
import WebSocket from 'ws'

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
        this.#wsconn.on('error', (err) => {
            console.error('websocket error:', err)
            this.stop()
        })
        this.#wsconn.on('ping', console.log)
        this.#wsconn.on('open', () => {
            console.log("websocket open:", this.url)
            const ret = createJSONRPCRequest("dontcare", 'subscribe', {query: this.#query})

            const reqstr = JSON.stringify(ret)
            console.log("websocket request:", reqstr)
            this.#wsconn.send(reqstr)
        })
        this.#wsconn.on('message', (data) => {
            let resp = JSON.parse(data.toString())
            cbFunc(resp.result)
        })
        this.#wsconn.on('close', () => {
            console.log('websocket closed:', this.url)
        })
    }
    stop() {
        this.#wsconn.close(0, "Websocket is closed by application")
        this.#wsconn = null
    }

    getQuery(): string {
        return this.#query
    }
}