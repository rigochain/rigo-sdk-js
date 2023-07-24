import fetch from 'cross-fetch';

import {HttpProviderOptions} from './types.js';

export {HttpProviderOptions} from './types.js';

import {
    JsonRpcResponseWithResult,
    RWeb3APIMethod,
    RWeb3APIPayload,
    RWeb3APIReturnType,
    RWeb3APISpec,
    RigoExecutionAPI
} from 'rweb3-types';
import {ResponseError} from 'rweb3-errors';

export default class HttpProvider<
    API extends RWeb3APISpec = RigoExecutionAPI
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
        payload: any,
        requestOptions?: RequestInit,
    ): Promise<JsonRpcResponseWithResult<ResponseType>> {


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

        console.log('response : ', response)
        console.log('response.ok : ', response.ok)

        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        if (!response.ok) throw new ResponseError(await response.json());

        return (await response.json()) as JsonRpcResponseWithResult<ResponseType>;
    }


    public getClientUrl(): string {
        return this.clientUrl;
    }

}

export {HttpProvider};
