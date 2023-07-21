import {Web3PkgInfo} from './version.js';
import {RWeb3Context} from 'rweb3-core';
import RWeb3Rigo from 'rweb3-rigo';
import {HttpProvider} from 'rweb3-providers-http';
import {isNullish} from 'rweb3-validator';
import {RWeb3RigoInterface} from "./types";

export class RWeb3 extends RWeb3Context {

    public static version = Web3PkgInfo.version;
    public static modules = {
        RWeb3Rigo
    };

    public rigo: RWeb3RigoInterface;

    public constructor(provider?: string) {

        super(provider);

        if (isNullish(provider) || (typeof provider === 'string' && provider.trim() === '')) {
            console.warn(
                'NOTE: rweb3.js is running without provider. You need to pass a provider in order to interact with the network!',
            );
        }

        // Have to use local alias to initiate contract context
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const self = this;
        const rigo = self.use(RWeb3Rigo);

        console.log('rigo', rigo);
        //
        // // Rigo Module
        this.rigo = Object.assign(rigo, {
        });

        console.log('this.rigo', this.rigo)
    }

}

export default RWeb3;
