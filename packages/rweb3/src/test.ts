import RWeb3 from './rweb3';

let rweb3 = new RWeb3('wss://rpc1.testnet.rigochain.io');

rweb3.rigo.subscribe("tm.event='NewBlock'").subscribe({
    next: (block) => {
        console.log(block);
    },
});
