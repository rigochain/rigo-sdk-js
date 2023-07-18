/*
This file is part of web3.js.

web3.js is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

web3.js is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
*/

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
