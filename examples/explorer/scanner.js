import {RWeb3} from 'rigo-sdk-js'
const rweb3 = new RWeb3("http://192.168.252.60:26657")

rweb3.subscribe('ws://192.168.252.60:26657/websocket', "tm.event='NewBlockHeader'", (resp) => {
    console.log(resp)
})



// import WebSocket from 'ws';
//
// const wsconn = new WebSocket("ws://192.168.252.60:26657/websocket")
// wsconn.on('open', () => {
//     wsconn.send(`{"jsonrpc":"2.0", "id":"dontcare", "method":"subscribe", "params":{"query":"tm.event='NewBlockHeader'"}}`)
// })
//
// wsconn.on('message', (data) => {
//     console.log(data.toString())
// })