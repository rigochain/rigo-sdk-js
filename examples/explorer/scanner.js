import {RWeb3} from 'rigo-sdk-js'
const rweb3 = new RWeb3("http://localhost:26657")

rweb3.subscribe('ws://localhost:26657/websocket', "tm.event='NewBlockHeader'", (resp) => {
    console.log(resp)
})