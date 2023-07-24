import fetch from 'cross-fetch';

import {HttpProviderOptions} from './types.js';

export {HttpProviderOptions} from './types.js';

import {
    JsonRpcResponseWithResult,
    RWeb3APIMethod,
    RWeb3APIPayload,
    RWeb3APIReturnType,
    RWeb3APISpec,
    RigoExecutionAPI, RWeb3APIType
} from 'rweb3-types';

export default class HttpProvider<
    API extends RWeb3APISpec = RigoExecutionAPI,
> {

    private readonly clientUrl: string;
    private readonly httpProviderOptions: HttpProviderOptions | undefined;

    public constructor(clientUrl: string, httpProviderOptions?: HttpProviderOptions) {
        this.clientUrl = clientUrl;
        this.httpProviderOptions = httpProviderOptions;

    }

    public async request<
        Method extends RWeb3APIMethod<API>,
        ResponseType = RWeb3APIReturnType<API, Method>,
    >(
        apiType: RWeb3APIType,
        payload: RWeb3APIPayload<API, Method>,
        requestOptions?: RequestInit,
    ): Promise<ResponseType> {


        console.log("apiType" , apiType);
        console.log("payload" , payload);

        const providerOptionsCombined = {
            ...this.httpProviderOptions?.providerOptions,
            ...requestOptions,
        };

        const response = await fetch(this.clientUrl, {
            ...providerOptionsCombined,
            method: 'POST',
            headers: {
                ...providerOptionsCombined.headers,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        // if (!response.ok) throw new ResponseError(await response.json());

        return (await response.json()) as ResponseType;
    }


}

export {HttpProvider};
