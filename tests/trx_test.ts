/*
import {TrxBuilder} from "../src/trx/trx";
import Account from "../src/account/account"
import Bytes from "../src/utils/bytes";

const acct = Account.New("test", "d")

//
// build a tx.
const tx = TrxBuilder.BuildUndelegateTrx({
    from: acct.address,
    to: acct.address,
    nonce: acct.nonce + 1,
    gas: "10",
    amount: "0",
    payload: {txhash: Bytes.rand(32).toHex()}
})

// sign the tx.
const [sig, signedTx] = TrxBuilder.SignTrx(tx, acct);
tx.sig = sig
const ret = TrxBuilder.VerifyTrx(tx, acct);
console.log("address", acct.address)
console.log(ret)*/
