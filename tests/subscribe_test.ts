import ACNetListener from '../src/rpc/subscriber'
ACNetListener.Listen('ws://localhost:26657/websocket', "tm.event='NewBlockHeader'", resp => {
    console.log('received event', resp)
})