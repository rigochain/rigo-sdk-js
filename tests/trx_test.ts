import {buildTransferTrx, buildUndelegateTrx, signTrx, verifyTrx} from "../src/trxs/trx";
import {TrxProto} from '../src/proto/trx'
import Account from "../src/account/account"
import Bytes from "../src/utils/bytes";
import ACNet from "../src/rpc/acnet";

const acct = Account.New("test", "d")
// const tx:TrxProto = buildTransferTrx({
//     from: acct.address,
//     to: Bytes.rand(20).toHex(),
//     nonce: acct.nonce + 1,
//     amount: "100000000000000000",
//     gas: "10"
// })
// const wr = TrxProto.encode(tx)
// console.log("raw tx   ", new Bytes(wr.finish()).toHex())
// const [sig, signedTx] = signTrx(tx, acct)
// console.log("signed tx", signedTx.toHex())
// console.log("signature", sig.toHex())
//
// ACNet.setUrl('http://localhost:26657')
// ACNet.broadcastTrxSync(tx).then( ret => {
//     console.log(ret)
//
//     ACNet.queryTrx(ret.hash).then( ret2 => {
//         console.log(ret2)
//     })
// })


//
// build a tx.
const tx = buildUndelegateTrx({
    from: acct.address,
    to: acct.address,
    nonce: acct.nonce + 1,
    gas: "10",
    amount: "0",
    txhash: Bytes.rand(32).toHex()
})

// sign the tx.
const [sig, signedTx] = signTrx(tx, acct);
tx.sig = sig
const ret = verifyTrx(tx, acct);
console.log("address", acct.address)
console.log(ret)
// Assert.notNull(sig);
// Assert.equal(65, sig.length);
// Assert.notNull(tx.getHeader().getSig());