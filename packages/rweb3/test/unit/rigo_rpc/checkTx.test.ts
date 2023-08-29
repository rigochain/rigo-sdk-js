import { RWeb3 } from '../../../src';
import { getDevServer } from '../e2e_utils';
import { Account, TrxBuilder } from 'rweb3-accounts';
import { Bytes } from 'rweb3-utils';
import { CheckTxResponse } from 'rweb3-types';

describe('health check ', () => {
    let devServerRWeb3Instance: RWeb3;
    // let testWebsocketRWeb3Instance: RWeb3;

    beforeAll(() => {
        devServerRWeb3Instance = new RWeb3(getDevServer());
        // testWebsocketRWeb3Instance = new RWeb3(getTestWsServer());
    });

    it('should call rweb3 with devServerRWeb3Instance.checkTx() method success return', async () => {
        const acct = Account.New('test');

        //
        // build a tx.
        const tx = TrxBuilder.BuildUndelegateTrx({
            from: acct.address,
            to: acct.address,
            nonce: acct.nonce + 1,
            gas: '10',
            amount: '0',
            payload: { txhash: Bytes.rand(32).toHex() },
        });

        // sign the tx.
        const [sig, signedTx] = TrxBuilder.SignTrx(tx, acct);
        tx.sig = sig;
        const ret = TrxBuilder.VerifyTrx(tx, acct);

        console.log('address', acct.address);
        console.log('signedTx', signedTx);
        console.log('ret', ret);

        let checkTxResponse: CheckTxResponse = await devServerRWeb3Instance.rigo.checkTx(tx);

        console.log(JSON.stringify(checkTxResponse));
    });

    // it('should call rweb3 with testWebsocketRWeb3Instance.checkTx() method success return', async () => {});
});
