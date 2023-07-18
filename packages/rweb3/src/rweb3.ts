import {Web3PkgInfo} from './version.js';
import {RWeb3Context} from 'rweb3-core';
import {HttpProvider} from 'rweb3-providers-http';
import {RWeb3RigoInterface} from "./types";

export class RWeb3 extends RWeb3Context {

    public static version = Web3PkgInfo.version;

    public rigo: RWeb3RigoInterface;

    // public constructor(provider?: HttpProvider | string) {
    //     super({provider});
    //
    //     if (isNullish(provider) || (typeof provider === 'string' && provider.trim() === '')) {
    //         console.warn(
    //             'NOTE: web3.js is running without provider. You need to pass a provider in order to interact with the network!',
    //         );
    //     }
    //
    //     const accounts = initAccountsForContext(this);
    //
    //     // Init protected properties
    //     this._wallet = accounts.wallet;
    //     this._accountProvider = accounts;
    //
    //     this.utils = utils;
    //
    //     // Have to use local alias to initiate contract context
    //     // eslint-disable-next-line @typescript-eslint/no-this-alias
    //     const self = this;
    //
    //     class ContractBuilder<Abi extends ContractAbi> extends Contract<Abi> {
    //         public constructor(jsonInterface: Abi);
    //         public constructor(jsonInterface: Abi, address: Address);
    //         public constructor(jsonInterface: Abi, options: ContractInitOptions);
    //         public constructor(jsonInterface: Abi, address: Address, options: ContractInitOptions);
    //         public constructor(
    //             jsonInterface: Abi,
    //             addressOrOptions?: Address | ContractInitOptions,
    //             options?: ContractInitOptions,
    //         ) {
    //             if (typeof addressOrOptions === 'object' && typeof options === 'object') {
    //                 throw new InvalidMethodParamsError(
    //                     'Should not provide options at both 2nd and 3rd parameters',
    //                 );
    //             }
    //             if (isNullish(addressOrOptions)) {
    //                 super(jsonInterface, options, self.getContextObject());
    //             } else if (typeof addressOrOptions === 'object') {
    //                 super(jsonInterface, addressOrOptions, self.getContextObject());
    //             } else if (typeof addressOrOptions === 'string') {
    //                 super(jsonInterface, addressOrOptions, options ?? {}, self.getContextObject());
    //             } else {
    //                 throw new InvalidMethodParamsError();
    //             }
    //
    //             super.subscribeToContextEvents(self);
    //         }
    //     }
    //
    //     const eth = self.use(Web3Eth);
    //
    //     // Eth Module
    //     this.eth = Object.assign(eth, {
    //         // ENS module
    //         ens: self.use(ENS, registryAddresses.main), // registry address defaults to main network
    //
    //         // Iban helpers
    //         Iban,
    //
    //         net: self.use(Net),
    //         personal: self.use(Personal),
    //
    //         // Contract helper and module
    //         Contract: ContractBuilder,
    //
    //         // ABI Helpers
    //         abi,
    //
    //         // Accounts helper
    //         accounts,
    //     });
    // }

}

export default RWeb3;
