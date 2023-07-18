import {Web3PkgInfo} from './version.js';
import {RWeb3Context} from 'rweb3-core';
import {RWeb3RigoInterface} from "./types";

export class RWeb3 extends RWeb3Context {

    public static version = Web3PkgInfo.version;

    public rigo: RWeb3RigoInterface;



}

export default RWeb3;
