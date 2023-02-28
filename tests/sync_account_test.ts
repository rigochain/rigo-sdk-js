import Account from "../src/account/account";
import RWeb3 from "../src/rpc/rweb3";

const acct = Account.New('nm', 's')
const rweb3 = new RWeb3('http://localhost:26657')
rweb3.syncAccount(acct)
    .then( resp => {
        console.log(resp)
    })
