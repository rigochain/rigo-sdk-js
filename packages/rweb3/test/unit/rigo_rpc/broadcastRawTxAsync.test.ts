import { RWeb3 } from '../../../src';
import { getTestAccountPrivateKey, getTestWsServer } from '../e2e_utils';
import { Account, privateKeyToAccount, TrxBuilder } from 'rweb3-rigo-accounts';
import { AccountResponse, BroadcastTxAsyncResponse } from 'rweb3-types';

describe('broadcastTxAsync check ', () => {
    let testWebsocketRWeb3Instance: RWeb3;

    beforeAll(() => {
        testWebsocketRWeb3Instance = new RWeb3(getTestWsServer());
    });

    it('should call rweb3 with testWebsocketRWeb3Instance.broadcastTxAsync() method success return', async () => {
        let secretKey = getTestAccountPrivateKey();

        const rWeb3Account = privateKeyToAccount(secretKey);

        let accountResponse: AccountResponse = await testWebsocketRWeb3Instance.rigo.account(
            rWeb3Account.address,
        );

        rWeb3Account.balance = accountResponse.value.balance;

        console.log('address acct.balance', rWeb3Account.balance);
        console.log('address acct.nonce', rWeb3Account.nonce);

        //
        // build a tx.
        const tx = TrxBuilder.BuildTransferTrx({
            from: rWeb3Account.address,
            nonce: accountResponse.value.nonce,
            to: '6fff13a50450039c943c9987fa43cef0d7421904',
            amount: '1000000000000000',
            gas: '1000000000000000',
        });

        // signed the tx.
        const signedTx = TrxBuilder.signedRawTransaction(tx, acct);

        let broadcastTxAsyncResponse: BroadcastTxAsyncResponse =
            await testWebsocketRWeb3Instance.rigo.broadcastRawTxAsync(signedTx);

        console.log(JSON.stringify(broadcastTxAsyncResponse));
    });
});
