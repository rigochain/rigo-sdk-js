import { RWeb3 } from '../../../src';
import { getTestAccountPrivateKey, getTestWsServer } from '../e2e_utils';
import { privateKeyToAccount, PrvKey, RWeb3Account, TrxProtoBuilder } from 'rweb3-rigo-accounts';
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

        // sign the tx.
        const [sig, signedTx] = TrxProtoBuilder.signTrxProto(tx, acct);
        tx.sig = sig;

        console.log('signedTx', signedTx);

        console.log('nonce', tx.nonce);

        let broadcastTxSyncResponse: BroadcastTxSyncResponse =
            await testWebsocketRWeb3Instance.rigo.broadcastTxSync(tx);

        console.log(JSON.stringify(broadcastTxSyncResponse));
    });
});
