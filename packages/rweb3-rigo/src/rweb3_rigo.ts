import {RWeb3Context} from 'rweb3-core';
import {Bytes} from "rweb3-utils";
import {DataFormat, DEFAULT_RETURN_FORMAT, TrxProto} from 'rweb3-types';
import * as rpcMethodsWrappers from './rpc_method_wrappers.js';

export class RWeb3Rigo extends RWeb3Context {

    public constructor() {
        super();
    }

    getUrl(): string {

        // TODO : Validate RequestManger
        return this.requestManager.provider.getClientUrl();
    }


    /**
     * // 상세 주석 필요
     * @param addr
     **/
    queryAccount<ReturnFormat extends DataFormat = typeof DEFAULT_RETURN_FORMAT>(addr: string){
        return rpcMethodsWrappers.queryAccount(this, addr);
    }

    // syncAccount<ReturnFormat extends DataFormat = typeof DEFAULT_RETURN_FORMAT>(acct: Account) {
    //     // TODO
    // }


    /**
     * {
     *   block_height: '1153',
     *   validators: [
     *     {
     *       address: '735DC3FC8BCCFD7810BCC14DB49234C1BCE7758B',
     *       pub_key: [Object],
     *       voting_power: '91000010',
     *       proposer_priority: '0'
     *     }
     *   ],
     *   count: '1',
     *   total: '1'
     * }
     **/
    queryValidators<ReturnFormat extends DataFormat = typeof DEFAULT_RETURN_FORMAT>(height: number | string) {

        if(typeof height === 'number') {
            height = height.toString(10)
        }

        return rpcMethodsWrappers.queryValidators(this, height);
    }

    /**
     * { key: '8DC41A86B91EB88D82489C4D037AE9FFCA65CFBF', value: null }
     **/
    queryStakes<ReturnFormat extends DataFormat = typeof DEFAULT_RETURN_FORMAT>(addr: string) {

        if(!addr.startsWith('0x')) {
            addr = '0x' + addr;
        }

        return rpcMethodsWrappers.queryStakes(this, addr);
    }

    queryDelegatee<ReturnFormat extends DataFormat = typeof DEFAULT_RETURN_FORMAT>(addr: string) {
        return rpcMethodsWrappers.queryDelegatee(this, addr);
    }

    broadcastTrxSync<ReturnFormat extends DataFormat = typeof DEFAULT_RETURN_FORMAT>(tx: TrxProto) {
        return rpcMethodsWrappers.broadcastTrxSync(this, tx);
    }


    /**
     * {
     *   hash: '9F1A995464FB3090FED047E71BF4A6FD0B4CEC5DA3235C4B5907EFE519AE70A4',
     *   height: '1817748',
     *   index: 0,
     *   tx_result: {
     *     code: 0,
     *     data: null,
     *     log: '',
     *     info: '',
     *     gas_wanted: '1000000000000000',
     *     gas_used: '1000000000000000',
     *     events: [ [Object] ],
     *     codespace: ''
     *   },
     *   tx: 'CAEQwJmgm9qU1rgXGFUiFFAbfpCsSCQ7f7f/g5YVdU93HdwhKhRQG36QrEgkO3+3/4OWFXVPdx3cITIAOgcDjX6kxoAAQANKIgog/LWL4tBsA8WUEjHdlg1OB4tCr4IYi81yyJ0b5otjzO5SQRQpj6L5RUqZmopafhh9hN1iwNNHwosLDoLMr7WLvwPgJpHimQ+ICa5T+HlJoyqg8oOKNJTfPN1fU9QVbCuohcUB',
     *   proof: {
     *     root_hash: 'C9F37A31D60DCD40326A0457A67737C8FE77828D73045A357466B0F43CA5E4EB',
     *     data: 'CAEQwJmgm9qU1rgXGFUiFFAbfpCsSCQ7f7f/g5YVdU93HdwhKhRQG36QrEgkO3+3/4OWFXVPdx3cITIAOgcDjX6kxoAAQANKIgog/LWL4tBsA8WUEjHdlg1OB4tCr4IYi81yyJ0b5otjzO5SQRQpj6L5RUqZmopafhh9hN1iwNNHwosLDoLMr7WLvwPgJpHimQ+ICa5T+HlJoyqg8oOKNJTfPN1fU9QVbCuohcUB',
     *     proof: {
     *       total: '1',
     *       index: '0',
     *       leaf_hash: 'yfN6MdYNzUAyagRXpnc3yP53go1zBFo1dGaw9Dyl5Os=',
     *       aunts: []
     *     }
     *   }
     * }
     **/
    queryTrx<ReturnFormat extends DataFormat = typeof DEFAULT_RETURN_FORMAT>(txhash: string | Uint8Array) {

        let byteTxHash : Bytes

        if(typeof txhash === 'string') {
            byteTxHash = Bytes.fromHex(txhash)
        }

        return rpcMethodsWrappers.queryTrx(this, byteTxHash);
    }

    /**
     * {
     *   block_id: {
     *     hash: '97EA623844694395542AA9FEC7155D9601C2C3914E32CF9B83595DCCFB4AA153',
     *     parts: {
     *       total: 1,
     *       hash: 'A2B4D76753C13B6CE09CF5CC7303B69196252D5AF9C97444BC6613B664EB4B7D'
     *     }
     *   },
     *   block: {
     *     header: {
     *       version: [Object],
     *       chain_id: 'devnet0',
     *       height: '10818',
     *       time: '2023-06-14T10:17:42.164478437Z',
     *       last_block_id: [Object],
     *       last_commit_hash: 'A5253ABF9ED8F0217F5B5FACFC3B6DB6E14D0FB8CFF8366D0D818914DD712F0A',
     *       data_hash: 'E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855',
     *       validators_hash: '5B2FCAEBDFD9E6CB6CBE441B1F0060923986C25B910445AEDEC907C12DFC1B5E',
     *       next_validators_hash: '5B2FCAEBDFD9E6CB6CBE441B1F0060923986C25B910445AEDEC907C12DFC1B5E',
     *       consensus_hash: '048091BC7DDC283F77BFBF91D73C44DA58C3DF8A9CBC867405D8B7F3DAADA22F',
     *       app_hash: '5421B4C31EAE7BC682E6D1D4C3575AA03D1EB152189D59C8034627377665D014',
     *       last_results_hash: 'E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855',
     *       evidence_hash: 'E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855',
     *       proposer_address: '735DC3FC8BCCFD7810BCC14DB49234C1BCE7758B'
     *     },
     *     data: { txs: [] },
     *     evidence: { evidence: [] },
     *     last_commit: {
     *       height: '10817',
     *       round: 0,
     *       block_id: [Object],
     *       signatures: [Array]
     *     }
     *   }
     * }
     **/
    queryBlockByHeight<ReturnFormat extends DataFormat = typeof DEFAULT_RETURN_FORMAT>(height: number | string) {

        if(typeof height === 'number') {
            height = height.toString(10)
        }

        return rpcMethodsWrappers.queryBlockByHeight(this, height);
    }

    /**
     * { block_id: { hash: '', parts: { total: 0, hash: '' } }, block: null }
    **/
    queryBlockByHash<ReturnFormat extends DataFormat = typeof DEFAULT_RETURN_FORMAT>(hash: string) {

        let byteHash : Bytes

        if(typeof hash === 'string') {
            byteHash = Bytes.fromHex(hash)
        }

        return rpcMethodsWrappers.queryBlockByHash(this, byteHash);
    }


    /**
     * {
     *   value: {
     *     version: '1',
     *     maxValidatorCnt: '21',
     *     minValidatorStake: '0x5ca4ec2a79a7f67000000',
     *     rewardPerPower: '4756468797',
     *     lazyRewardBlocks: '2592000',
     *     lazyApplyingBlocks: '259200',
     *     gasPrice: '0x3b9aca00',
     *     minTrxFee: '0x38d7ea4c68000',
     *     minVotingPeriodBlocks: '259200',
     *     maxVotingPeriodBlocks: '2592000',
     *     minSelfStakeRatio: '50',
     *     maxUpdatableStakeRatio: '30',
     *     slashRatio: '50'
     *   }
     * }
     **/
    queryRule<ReturnFormat extends DataFormat = typeof DEFAULT_RETURN_FORMAT>() {
        return rpcMethodsWrappers.queryRule(this);
    }

    vmCall<ReturnFormat extends DataFormat = typeof DEFAULT_RETURN_FORMAT>(addr: string, to: string, height: number, data: string) {
        return rpcMethodsWrappers.vmCall(this, addr, to, height, data);
    }

    subscribe<ReturnFormat extends DataFormat = typeof DEFAULT_RETURN_FORMAT>(url: string, query: string, cb: (resp: string) => void) {
        // TODO 별도로 빠짐
    }

    createContract<ReturnFormat extends DataFormat = typeof DEFAULT_RETURN_FORMAT>(jsonInterface?: any, address?: string) {
        // TODO 별도로 빠짐
    }


}
