import Account from "../src/account/account";
import ACNet from "../src/rpc/acnet";

const acct = Account.New('nm', 's')
ACNet.setUrl('http://localhost:26657')
ACNet.syncAccount(acct)
    .then( resp => {
        console.log(resp)
    })
