import PrvKey from './crypto/secp256k1/prvKey'
import PubKey from './crypto/secp256k1/pubKey'
import Bytes from "./utils/bytes";
import * as Time from "./utils/time"
import {LocalSto, SessSto} from './utils/storage';
import Account from "./account/account";
import * as Trx from "./trx/trx"
import ACNet from "./rpc/acnet";
import Subscriber from "./rpc/subscriber";

window.PrvKey = PrvKey
window.PubKey = PubKey
window.ACNet = ACNet
window.ACNetListener = Subscriber
window.Account = Account
window.Trx = Trx
window.LocalSto = LocalSto
window.SessSto = SessSto
window.Bytes = Bytes
window.Time = Time
window.Utils = {Bytes, Time, LocalSto, SessSto}

export {
    PrvKey,
    PubKey,
    ACNet,
    Subscriber,
    Account,
    Trx,
    LocalSto,
    SessSto,
    Bytes,
    Time
}
//
// let kstr = '0x1697a1a03ff374c6df5005a1574618b0b598d339eddc530614a968972fd948e7'
// let prvKey = PrvKey.import(kstr)
// console.log(prvKey.export().toHex(), kstr)
//
// const pubKey = new PubKey(prvKey)
// console.log('pubKey', pubKey.toHex())
// console.log('address', pubKey.toAddress().toHex())

// const client = new Client('http://localhost:26657')
// client.queryAccount("0x73E1FF2DE3BAEAC6BB7CE2EE0D4D93B4950F01A3")
// .then( (ret) => {
//     console.log(ret)
//
//     let acct = new Account("test-0", "")
//     acct.parse(ret)
//     console.log(JSON.stringify(acct))
//     console.log(acct.balance.toString(10))
//     acct.balance = acct.balance.addn(123)
//     console.log(acct.balance.toString(10))
// })
