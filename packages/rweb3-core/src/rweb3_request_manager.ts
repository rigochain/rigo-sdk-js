import HttpProvider from 'rweb3-providers-http';
import {isNullish, isPromise, jsonRpc, isResponseRpcError} from 'rweb3-utils';
import {
    RigoExecutionAPI,
    RWeb3APISpec,
    RWeb3APIMethod,
    RWeb3APIRequest,
    RWeb3APIReturnType,
    RWeb3APIType,
    JsonRpcResponse, JsonRpcBatchRequest
} from "rweb3-types";

export var Web3RequestManagerEvent;
(function (Web3RequestManagerEvent) {
    Web3RequestManagerEvent["PROVIDER_CHANGED"] = "PROVIDER_CHANGED";
    Web3RequestManagerEvent["BEFORE_PROVIDER_CHANGE"] = "BEFORE_PROVIDER_CHANGE";
})(Web3RequestManagerEvent || (Web3RequestManagerEvent = {}));
const availableProviders = {
    HttpProvider: HttpProvider
};

export class RWeb3RequestManager<API extends RWeb3APISpec = RigoExecutionAPI> {

    private _provider: HttpProvider;

    public constructor(
        provider?: string
    ) {
        if (!isNullish(provider)) {
            this.setProvider(provider);
        }
    }


    public setProvider(provider?: string): void {

        // autodetect provider
        if (provider && typeof provider === 'string' && this.providers) {
            console.log('setProvider', provider)
            // HTTP
            if (/^http(s)?:\/\//i.test(provider)) {
                this._provider = new this.providers.HttpProvider(provider);
            }
        }
    }

    public get providers() {
        return availableProviders;
    }


    public get provider() {
        return this._provider;
    }

    public async send<
        Method extends RWeb3APIMethod<API>,
        ResponseType = RWeb3APIReturnType<API, Method>,
    >(apiType: RWeb3APIType, request: RWeb3APIRequest<API, Method>): Promise<ResponseType> {


        console.log('send', request)

        const {provider} = this;

        console.log('send', provider)
        console.log('send2', this.provider)
        console.log('send2', this._provider)

        // if (jsonRpc.isResponseWithResult(response)) {
        return await provider.request(apiType, request);
        // }

        // return response.result;

        // if (jsonRpc.isResponseWithResult(response)) {
        //     return response.result;
        // }
        //
        // throw new ResponseError(response);
    }

    // public async send(request: any): Promise<any> {
    //     const {provider} = this;
    // }


}
