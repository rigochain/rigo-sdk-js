
import { EthExecutionAPI } from './eth_execution_api.js';
import {
	AccountObject,
	Address,
	BlockNumberOrTag,
	HexString32Bytes,
	TransactionInfo,
	Uint,
} from '../eth_types.js';

export type Web3EthExecutionAPI = EthExecutionAPI & {
	eth_pendingTransactions: () => TransactionInfo[];

	// https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1102.md
	eth_requestAccounts: () => Address[];

	// https://github.com/ethereum/EIPs/blob/master/EIPS/eip-695.md
	eth_chainId: () => Uint;

	web3_clientVersion: () => string;

	// https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1186.md
	eth_getProof: (
		address: Address,
		storageKeys: HexString32Bytes[],
		blockNumber: BlockNumberOrTag,
	) => AccountObject;
};
