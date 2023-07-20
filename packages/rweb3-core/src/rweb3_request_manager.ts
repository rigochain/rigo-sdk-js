import HttpProvider from 'rweb3-providers-http';
import {isNullish} from 'rweb3-validator';

export var Web3RequestManagerEvent;
(function (Web3RequestManagerEvent) {
    Web3RequestManagerEvent["PROVIDER_CHANGED"] = "PROVIDER_CHANGED";
    Web3RequestManagerEvent["BEFORE_PROVIDER_CHANGE"] = "BEFORE_PROVIDER_CHANGE";
})(Web3RequestManagerEvent || (Web3RequestManagerEvent = {}));
const availableProviders = {
    HttpProvider: HttpProvider
};

export class RWeb3RequestManager {

    private _provider: HttpProvider;

    public constructor(
        provider?: string
    ) {
        if (!isNullish(provider)) {
            this.setProvider(provider);
        }
    }


    public setProvider(provider?: string): boolean {

        // autodetect provider
        if (provider && typeof provider === 'string' && this.providers) {
            // HTTP
            if (/^http(s)?:\/\//i.test(provider)) {
                this._provider = new this.providers.HttpProvider(provider);
                return true;
            }

        }
    }

    public get providers() {
        return availableProviders;
    }


    public get provider() {
        return this._provider;
    }

    public async send(request: any): Promise<any> {

        const {provider} = this;

        const response = await provider.request(request)

        return response.result;

        // if (jsonRpc.isResponseWithResult(response)) {
        //     return response.result;
        // }
        //
        // throw new ResponseError(response);
    }

}
