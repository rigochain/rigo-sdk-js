import { RWeb3 } from '../../../src';
import { getTestAccountPrivateKey, getTestWsServer } from '../e2e_utils';
import { privateKeyToAccount, RWeb3Account, TrxProtoBuilder } from 'rweb3-rigo-accounts';
import { AccountResponse, BroadcastTxSyncResponse } from 'rweb3-types';

describe('broadcastTxSync check ', () => {
    let testWebsocketRWeb3Instance: RWeb3;

    beforeAll(() => {
        testWebsocketRWeb3Instance = new RWeb3(getTestWsServer());
    });

    it('should call rweb3 with testWebsocketRWeb3Instance.broadcastTxSync() method success return', async () => {
        let secretKey = getTestAccountPrivateKey();

        const acct = privateKeyToAccount(secretKey) as RWeb3Account;

        let accountResponse: AccountResponse = await testWebsocketRWeb3Instance.rigo.account(
            acct.address,
        );

        acct.balance = accountResponse.value.balance;
        acct.nonce = accountResponse.value.nonce;

        console.log('address acct.balance', acct.balance);
        console.log('address acct.nonce', acct.nonce);

        //
        // build a tx.
        const tx = TrxProtoBuilder.buildTransferTrxProto({
            from: acct.address,
            nonce: accountResponse.value.nonce,
            to: '6fff13a50450039c943c9987fa43cef0d7421904',
            amount: '1000000000000000',
            gas: '1000000000000000',
        });

        // signed the tx.
        const signedTx = TrxProtoBuilder.signedRawTrxProto(tx, acct);
        console.log('signedTx', signedTx);

        console.log('nonce', tx.nonce);

        let broadcastTxSyncResponse: BroadcastTxSyncResponse =
            await testWebsocketRWeb3Instance.rigo.broadcastRawTxSync(signedTx);

        console.log(JSON.stringify(broadcastTxSyncResponse));
    });
});
