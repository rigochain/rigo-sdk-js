import { Bytes } from 'rweb3-utils';
import { createHash, randomBytes } from 'crypto';
import * as secp256k1 from 'secp256k1';

export interface TxData {
    hash?: string;
    version?: number;
    time?: Date;
    nonce?: number;
    from: string;
    to: string;
    amount: string;
    gas: string;
    type?: number;
    payload?: object | TrxPayloadUnDelegating;
    sig?: string;
}

interface TrxPayloadUnDelegating {
    txhash: string;
}

export class PubKey {
    compressed: Bytes;
    x: Bytes;
    y: Bytes;

    constructor(k: PrvKey) {
        const decompressed = secp256k1.publicKeyCreate(k.export(), false);
        this.x = new Bytes(decompressed.subarray(1, 33));
        this.y = new Bytes(decompressed.subarray(33, 65));

        this.compressed = new Bytes(33);
        if ((this.y[this.y.length - 1] & 1) === 0) {
            this.compressed[0] = 0x02;
        } else {
            this.compressed[0] = 0x03;
        }
        this.compressed.set(this.x, 1);
    }

    toAddress(): Bytes {
        return this.btcAddress();
    }

    shaAddress(): Bytes {
        const sha256 = createHash('sha256');
        const decompressed = new Bytes([...this.x, ...this.y]);
        const hash = sha256.update(decompressed).digest();
        return new Bytes(hash.subarray(hash.length - 20));
    }

    btcAddress(): Bytes {
        const sha256 = createHash('sha256');
        const ripemd160 = createHash('ripemd160');
        const hash = sha256.update(this.compressed).digest();
        const addr = ripemd160.update(hash).digest();
        return new Bytes(addr);
    }

    ethAddress(): Bytes {
        throw Error('not supported');
    }

    verify(sig: Uint8Array, msg: Uint8Array): boolean {
        const sha256 = createHash('sha256');
        const hmsg = sha256.update(msg).digest();
        const _sig = sig.subarray(0, 64);

        return secp256k1.ecdsaVerify(_sig, hmsg, this.compressed);
    }

    toHex(): string {
        return this.compressed.toHex();
    }
}

export class PrvKey {
    private d: Bytes;

    constructor() {
        let rn;
        do {
            rn = randomBytes(32);
        } while (!secp256k1.privateKeyVerify(rn));

        this.d = new Bytes(rn);
    }

    sign(msg: Uint8Array): { signature: Uint8Array; recid: number } {
        const sha256 = createHash('sha256');
        const hmsg = sha256.update(msg).digest();
        return secp256k1.ecdsaSign(hmsg, this.d);
    }

    export(): Bytes {
        return this.d;
    }

    static import(k: string | ArrayBufferLike): PrvKey {
        const ret = new PrvKey();
        if (typeof k === 'string') {
            ret.d = Bytes.fromHex(k);
        } else {
            ret.d = new Bytes(k);
        }
        return ret;
    }
}
