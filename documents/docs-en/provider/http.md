# HttpProvider

## Summary
The `provider` of **@rigochain/rweb3** is an object that enables the connection to the RIGO network. To send transactions, query data, and interact with various functionalities of the network, you need to connect your web application to the RIGO node using the provider. The following code illustrates an example of connecting to the RIGO node via the provider.

## Getting Started
```Typescript
import { RWeb3 } from '@rigochain/rweb3';
const rweb3 = new RWeb3('https://rpc1.testnet.rigochain.io');
```
or
```Typescript
import { RWeb3, HttpProvider } from '@rigochain/rweb3';
const provider = new HttpProvider('https://rpc1.testnet.rigochain.io');
const rweb3 = new RWeb3(provider);
```
You can create a `provider` for `@rigochain/rweb3` using the above code, which allows you to interact with the RIGO node.

## Changing the Provider
```Typescript
import { RWeb3 } from '@rigochain/rweb3';
const rweb3 = new RWeb3('https://rpc1.testnet.rigochain.io');
rweb3.setProvider('https://rpc2.testnet.rigochain.io');
```

## httpProviderOptions
The HttpProvider takes the provider URL and optionally `httpProviderOptions` when creating a provider:

```Typescript
const httpProviderInstance = new HttpProvider(clientUrl, httpProviderOptions);
```

The `httpProviderOptions` interface is as follows:
```Typescript
const httpProviderOptions = {
    providerOptions: {
        body: undefined,
        cache: 'force-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        integrity: 'foo',
        keepalive: true,
        method: 'GET',
        mode: 'same-origin',
        redirect: 'error',
        referrer: 'foo',
        referrerPolicy: 'same-origin',
        signal: undefined,
        window: undefined,
    } as RequestInit,
};
```
For more detailed information, refer to the [Microsoft github - RequestInit](https://microsoft.github.io/PowerBI-JavaScript/interfaces/_node_modules_typedoc_node_modules_typescript_lib_lib_dom_d_.requestinit.html) page.