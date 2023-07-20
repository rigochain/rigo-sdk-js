import {RWeb3Config} from "./rweb3_config";
import {RWeb3RequestManager} from "./rweb3_request_manager";
import {isNullish} from 'rweb3-validator';

// eslint-disable-next-line no-use-before-define
export type RWeb3ContextConstructor<T extends RWeb3Context, T2 extends unknown[]> = new (
    ...args: [...extras: T2, context: RWeb3ContextObject]
) => T;


// To avoid circular dependencies, we need to export type from here.
export type RWeb3ContextObject<> = {
    requestManager: RWeb3RequestManager;
};


export class RWeb3Context extends RWeb3Config {

    protected _requestManager: RWeb3RequestManager;

    public constructor(
        providerOrContext?:
            | string
    ) {

        super();
        // If "providerOrContext" is provided as "string" or an objects matching "SupportedProviders" interface
        if (
            isNullish(providerOrContext) ||
            (typeof providerOrContext === 'string' && providerOrContext.trim() !== '')
        ) {
            this._requestManager = new RWeb3RequestManager(providerOrContext);
            return;
        }
    }


    public use<T extends RWeb3Context, T2 extends unknown[]>(
        ContextRef: RWeb3ContextConstructor<T, T2>,
        ...args: [...T2]
    ) {
        //
        // this.on(Web3ConfigEvent.CONFIG_CHANGE, event => {
        //     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        //     newContextChild.setConfig({ [event.name]: event.newValue });
        // });

        return new ContextRef(
            ...([...args, this.getContextObject()] as unknown as [...T2, RWeb3ContextObject]),
        );
    }

    public get requestManager() {
        return this._requestManager;
    }

    public getContextObject(): RWeb3ContextObject {
        return {
            requestManager: this.requestManager
        };
    }


}
