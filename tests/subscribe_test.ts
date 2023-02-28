import RWeb3 from "../src/rpc/rweb3";

const rweb3 = new RWeb3('http://localhost:26657')
const listener = rweb3.subscribe('ws://localhost:26657/websocket', "tm.event='NewBlockHeader'", resp => {
    console.log('received event', resp)
})