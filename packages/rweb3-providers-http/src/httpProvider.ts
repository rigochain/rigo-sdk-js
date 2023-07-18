
import {HttpProviderOptions} from './types.js';

export {HttpProviderOptions} from './types.js';

export default class HttpProvider {

    private readonly clientUrl: string;
    private readonly httpProviderOptions: HttpProviderOptions | undefined;

    public constructor(clientUrl: string, httpProviderOptions?: HttpProviderOptions) {
        this.clientUrl = clientUrl;
        this.httpProviderOptions = httpProviderOptions;
    }

    private static validateClientUrl(clientUrl: string): boolean {
        return typeof clientUrl === 'string' ? /^http(s)?:\/\//i.test(clientUrl) : false;
    }

    public async request(
        payload: any,
        requestOptions?: RequestInit,
    ): Promise<any> {
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
        // TODO : ERROR 처리;
        // if (!response.ok) throw new ResponseError(await response.json());

        return (await response.json());
    }
}

export {HttpProvider};
