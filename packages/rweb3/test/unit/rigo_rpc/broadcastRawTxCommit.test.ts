import { RWeb3 } from '../../../src';
import { getTestAccountPrivateKey, getTestWsServer } from '../e2e_utils';
import { privateKeyToAccount, PrvKey, RWeb3Account, TrxProtoBuilder } from 'rweb3-rigo-accounts';
import { AccountResponse, BroadcastTxCommitResponse } from 'rweb3-types';

describe('broadcastTxCommit check ', () => {
    let testWebsocketRWeb3Instance: RWeb3;

    beforeAll(() => {
        testWebsocketRWeb3Instance = new RWeb3(getTestWsServer());
    });

    it('should call rweb3 with testWebsocketRWeb3Instance.broadcastTxCommit() method success return', async () => {
        let secretKey = getTestAccountPrivateKey();

        const d = PrvKey.import(secretKey).export();
        const acct = privateKeyToAccount(secretKey) as RWeb3Account;

        let accountResponse: AccountResponse = await testWebsocketRWeb3Instance.rigo.account(
            acct.address,
        );

        acct.balance = accountResponse.value.balance;

        //
        // build a tx.
        const tx = TrxProtoBuilder.buildTransferTrxProto({
            from: acct.address,
            nonce: accountResponse.value.nonce,
            to: '6fff13a50450039c943c9987fa43cef0d7421904',
            amount: '1000000000000000',
            gas: '1000000000000000',
        });

        // signedTx the tx.
        const signedTx = TrxProtoBuilder.signedRawTrxProto(tx, acct);

        let broadcastTxCommitResponse: BroadcastTxCommitResponse =
            await testWebsocketRWeb3Instance.rigo.broadcastRawTxCommit(signedTx);

        console.log(JSON.stringify(broadcastTxCommitResponse));
    });
});