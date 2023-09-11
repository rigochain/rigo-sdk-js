/*
    Copyright 2023 All Rigo Chain Developers

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/

import PrvKey from './crypto/secp256k1/prvKey'
import PubKey from './crypto/secp256k1/pubKey'
import Bytes from "./utils/bytes";
import * as Time from "./utils/time"
import {LocalSto, SessSto} from './utils/storage';
import Account from "./account/account";
import {TrxBuilder} from "./trx/trx"
import RWeb3 from "./rpc/rweb3";
import Subscriber from "./rpc/subscriber";

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
    Time
}