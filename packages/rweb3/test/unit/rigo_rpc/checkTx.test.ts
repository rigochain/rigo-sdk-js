import { RWeb3 } from '../../../src';
import { getDevServer, getTestAccountPrivateKey, getTestWsServer } from '../e2e_utils';
import { Account, TrxBuilder } from 'rweb3-accounts';
import { Bytes, PrvKey } from 'rweb3-utils';
import { AccountResponse, CheckTxResponse } from 'rweb3-types';

describe('health check ', () => {
    let devServerRWeb3Instance: RWeb3;
    let testWebsocketRWeb3Instance: RWeb3;

    beforeAll(() => {
        devServerRWeb3Instance = new RWeb3(getDevServer());
        testWebsocketRWeb3Instance = new RWeb3(getTestWsServer());
    });

    it('should call rweb3 with devServerRWeb3Instance.checkTx() method success return', async () => {
        const acct = Account.New('test');

        //
        // build a tx.
        const tx = TrxBuilder.BuildUndelegateTrx({
            from: acct.address,
            to: acct.address,
            nonce: acct.nonce + 1,
            gas: '1000000000000000',
            amount: '0',
            payload: { txhash: Bytes.rand(32).toHex() },
        });

        // sign the tx.
        const [sig, signedTx] = TrxBuilder.SignTrx(tx, acct);
        tx.sig = sig;
        const ret = TrxBuilder.VerifyTrx(tx, acct);

        console.log('address 1', acct.address);
        console.log('address private key', acct.prvKey.export().toHex());
        console.log('signedTx', signedTx);
        console.log('ret', ret);

        let checkTxResponse: CheckTxResponse = await devServerRWeb3Instance.rigo.checkTx(tx);

        console.log(JSON.stringify(checkTxResponse));
    });

    it('should call rweb3 with testWebsocketRWeb3Instance.checkTx() method success return', async () => {
        let secretKey = getTestAccountPrivateKey();

        const d = PrvKey.import(secretKey).export();
        const acct = Account.Import('test', secretKey, d);

        console.log('acct', acct);

        let accountResponse: AccountResponse = await testWebsocketRWeb3Instance.rigo.account(
            acct.address,
        );

        acct.balance = accountResponse.value.balance;
        acct.nonce = accountResponse.value.nonce;

        console.log(acct.balance);
        console.log(acct.nonce);

        console.log('address 2', acct);

        //
        // build a tx.
        const tx = TrxBuilder.BuildTransferTrx({
            from: acct.address,
            to: '6fff13a50450039c943c9987fa43cef0d7421904',
            amount: '1000000000000000',
            gas: '1000000000000000',
        });

        // sign the tx.
        const [sig, signedTx] = TrxBuilder.SignTrx(tx, acct);
        tx.sig = sig;

        console.log('signedTx', signedTx);

        console.log('nonce', tx.nonce);

        let testCheckTxResponse: CheckTxResponse = await testWebsocketRWeb3Instance.rigo.checkTx(
            tx,
        );

        console.log(JSON.stringify(testCheckTxResponse));

        // let broadcastTxCommitResponse: BroadcastTxCommitResponse =
        //     await testWebsocketRWeb3Instance.rigo.broadcastTxCommit(tx);
        //
        // console.log(JSON.stringify(broadcastTxCommitResponse));
    });
});
