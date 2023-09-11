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

import {createHash} from "crypto"
import * as secp256k1 from 'secp256k1'
import PrvKey from "./prvKey";
import Bytes from "../../utils/bytes";

export default class PubKey {
    compressed: Bytes
    x: Bytes
    y: Bytes

    constructor(k: PrvKey) {
        const decompressed = secp256k1.publicKeyCreate(k.export(), false)
        this.x = new Bytes(decompressed.subarray(1, 33))
        this.y = new Bytes(decompressed.subarray(33, 65))

        this.compressed = new Bytes(33);
        if( (this.y[this.y.length - 1] & 1) === 0) {
            this.compressed[0] = 0x02
        } else {
            this.compressed[0] = 0x03
        }
        this.compressed.set(this.x, 1)
    }

    toAddress(): Bytes {
        return this.btcAddress()
    }

    shaAddress(): Bytes {
        const sha256 = createHash('sha256')
        const decompressed = new Bytes([...this.x, ...this.y])
        const hash = sha256.update(decompressed).digest()
        return new Bytes(hash.subarray(hash.length - 20))
    }

    btcAddress(): Bytes {
        const sha256 = createHash('sha256')
        const ripemd160 = createHash('ripemd160')
        const hash = sha256.update(this.compressed).digest()
        const addr = ripemd160.update(hash).digest()
        return new Bytes(addr)
    }

    ethAddress(): Bytes {
        throw Error('not supported')
    }

    verify(sig: Uint8Array, msg: Uint8Array): boolean {
        const sha256 = createHash('sha256')
        const hmsg = sha256.update(msg).digest()
        const _sig = sig.subarray(0, 64)

        return secp256k1.ecdsaVerify(_sig, hmsg, this.compressed)
    }

    toHex(): string {
        return this.compressed.toHex()
    }
}


