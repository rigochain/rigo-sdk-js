import {HexString} from '../primitives_types.js';
import {BlockAPI, TransactionInfoAPI} from "./eth_execution_api";
import {AddressBase} from "../rigo_types";


export type AddressAPI = AddressBase<
    HexString
>;


/* eslint-disable camelcase */
export type RigoExecutionAPI = {
    account: (addr: string) => AddressAPI;
};
