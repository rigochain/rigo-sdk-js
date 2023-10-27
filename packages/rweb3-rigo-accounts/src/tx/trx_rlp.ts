/*
    Copyright 2023 All Rigo Chain Developers

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/
import {BytesUint8Array, TrxProto} from '@rigochain/rweb3-types';
import { rlp } from 'ethereumjs-util';
import BN from 'bn.js';
import {
    TrxPayloadContractProto,
    TrxPayloadProposalProto,
    TrxPayloadSetDocProto,
    TrxPayloadUnstakingProto,
    TrxPayloadVotingProto,
    TrxPayloadWithdrawProto,
} from './trx_pb.js';
import * as trxPb from './trx_pb.js';

export const RlpUtils = {
    encodeTrxProto(trx: TrxProto): Buffer {
        let payload;
        switch (trx.type) {
            case 1: // transfer
            case 2: // staking
                payload = trx.Payload;
                break;
            case 3: // unstaking
                const unstakingPayload: TrxPayloadUnstakingProto =
                    trxPb.TrxPayloadUnstakingProto.decode(trx.Payload);
                payload = rlp.encode(unstakingPayload.txHash);
                break;
            case 4: // proposal
                const proposalPayload: TrxPayloadProposalProto =
                    trxPb.TrxPayloadProposalProto.decode(trx.Payload);
                payload = rlp.encode([
                    proposalPayload.message,
                    proposalPayload.startVotingHeight.toNumber(),
                    proposalPayload.votingBlocks.toNumber(),
                    proposalPayload.applyingHeight.toNumber(),
                    proposalPayload.optType,
                    proposalPayload.options,
                ]);
                break;
            case 5: // voting
                const votingPayload: TrxPayloadVotingProto = trxPb.TrxPayloadVotingProto.decode(
                    trx.Payload,
                );
                payload = rlp.encode([votingPayload.txHash, votingPayload.choice]);
                break;
            case 6: // contract
                const contractPayload: TrxPayloadContractProto =
                    trxPb.TrxPayloadContractProto.decode(trx.Payload);
                payload = rlp.encode(contractPayload.Data);
                break;
            case 7: // setDoc
                const setDocPayload: TrxPayloadSetDocProto = trxPb.TrxPayloadSetDocProto.decode(
                    trx.Payload,
                );
                payload = rlp.encode([setDocPayload.name, setDocPayload.url]);
                break;
            case 8: // withdraw
                const withdrawPayload: TrxPayloadWithdrawProto =
                    trxPb.TrxPayloadWithdrawProto.decode(trx.Payload);
                payload = rlp.encode(withdrawPayload.ReqAmt);
                break;
            default:
                payload = trx.Payload;
                break;
        }
        return rlp.encode([
            trx.version,
            new BN(trx.time.toString()),
            trx.nonce.toNumber(),
            trx.from,
            trx.to,
            trx.Amount,
            trx.gas.toNumber(),
            trx.GasPrice,
            trx.type,
            payload,
            trx.sig,
        ]);
    },
};
