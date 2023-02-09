import {createJSONRPCRequest} from "json-rpc-2.0";

export default class Subscriber {
    #ws: WebSocket
    constructor(public url:string, public query: string) {}

    start(cbFunc: (resp:string)=>void) {
        if(this.#ws) {
            console.error("already start.")
        }

        this.#ws = new WebSocket(this.url)
        this.#ws.addEventListener('open', (evt) => {
            // console.log("this", this)
            console.log("websocket open:", this.url)
            console.log("query         :", this.query)
            const ret = createJSONRPCRequest("dontcare", 'subscribe', {query: this.query})

            const reqstr = JSON.stringify(ret)
            console.log("websocket request:", reqstr)
            this.#ws.send(reqstr)
        })
        this.#ws.addEventListener('error', (evt) => {
            console.error('websocket error:', evt)
            this.stop()
        })
        this.#ws.addEventListener('message', (evt) => {
            //console.log('websocket message:', typeof evt.data)
            let resp = evt.data
            if(typeof evt.data === 'string') {
                resp = JSON.parse(evt.data)
            }
            cbFunc(resp.result)
        })
        this.#ws.addEventListener('close', (evt) => {
            console.log('websocket close:', this.#ws.url, evt.code, evt.reason)
        })
    }
    stop() {
        this.#ws.close(0, "EventListener is closed by application")
        this.#ws = null
    }

    static Listen(url:string, query: string, cb: (resp:string)=>void): Subscriber {
        const evtListener = new Subscriber(url, query)
        evtListener.start(cb)
        return evtListener
    }
}