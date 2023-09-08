import { ContractAbi, RigoExecutionAPI } from 'rweb3-types';
import { RWeb3Context } from 'rweb3-core';

export class Contract<Abi extends ContractAbi> extends RWeb3Context<RigoExecutionAPI> {}
