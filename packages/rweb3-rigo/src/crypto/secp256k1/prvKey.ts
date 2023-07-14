import * as secp256k1 from 'secp256k1'
import {createHash, randomBytes} from "crypto"
import Bytes from "../../utils/bytes"

export default class PrvKey {
    private d: Bytes

    constructor() {
        let rn
        do {
            rn = randomBytes(32)
        } while(!secp256k1.privateKeyVerify(rn))

        this.d = new Bytes(rn)
    }

    sign(msg: Uint8Array): {signature: Uint8Array, recid: number} {
        const sha256 = createHash('sha256')
        const hmsg = sha256.update(msg).digest()
        const ret = secp256k1.ecdsaSign(hmsg, this.d)
        return ret
    }
    export(): Bytes {
        return this.d
    }

    static import(k: string|ArrayBufferLike): PrvKey {
        const ret = new PrvKey()
        if(typeof k === 'string') {
            ret.d = Bytes.fromHex(k)
        } else {
            ret.d = new Bytes(k)
        }
        return ret
    }
}




