import HttpProvider from 'rweb3-providers-http';


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

    public get provider() {
        return this._provider;
    }

    public async send(request: any): Promise<any> {

        const { provider } = this;

        const response = await provider.request(request)

        return response.result;

        // if (jsonRpc.isResponseWithResult(response)) {
        //     return response.result;
        // }
        //
        // throw new ResponseError(response);
    }

}
