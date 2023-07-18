import PrvKey from './crypto/secp256k1/prvKey'
import PubKey from './crypto/secp256k1/pubKey'
import Bytes from "./utils/bytes";
import * as Time from "./utils/time"
import {LocalSto, SessSto} from './utils/storage';
import Account from "./account/account";
import {TrxBuilder} from "./trx/trx"
import RWeb3 from "./rpc/rweb3";
import Subscriber from "./rpc/subscriber";
import {RWeb3Rigo} from "./rweb3_rigo";

if(typeof window !== 'undefined') {
    window.PrvKey = PrvKey
    window.PubKey = PubKey
    window.RWeb3 = RWeb3
    window.RigoSubscriber = Subscriber
    window.Account = Account
    window.TrxBuilder = TrxBuilder
    window.LocalSto = LocalSto
    window.SessSto = SessSto
    window.Bytes = Bytes
    window.Time = Time
    window.Utils = {Bytes, Time, LocalSto, SessSto}
}

export {
    PrvKey,
    PubKey,
    RWeb3,
    Subscriber,
    Account,
    TrxBuilder,
    LocalSto,
    SessSto,
    Bytes,
    Time,
    RWeb3Rigo
}
