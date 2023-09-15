# Documentation for HTTP Provider


## Getting Started
```Typscript
import { HttpProvider } from '@rigochain/rweb3-types';
const provider = new HttpProvider('http://localhost:8545');

let rweb3 = new RWeb3(provider);

or

let rweb3 = new RWeb3();
rweb3.setProvider(provider);
```

### Abstract

This module provides an HTTP Provider which allows for communication using web3 API specifications. It comes equipped with request handling and streamlined client URL management.

### Import Statements

The `HttpProvider` class and `HttpProviderOptions` can be accessed via the import statement:

```javascript
import HttpProvider, { HttpProviderOptions } from '<module-path>';
```

### Class Definition: HttpProvider

The `HttpProvider` class takes in a `clientUrl` and optional `httpProviderOptions` during instantiation:

```javascript
let httpProviderInstance = new HttpProvider(clientUrl, httpProviderOptions);
```

### Member Variables

- `clientUrl`: A string representing the client URL.
- `httpProviderOptions`: A configuration object specified by the `HttpProviderOptions` type.

### Member Functions

1. `request(payload: RWeb3APIPayload<API, Method>, requestOptions?: RequestInit)`

   Sends an HTTP Request based on the provided RWeb3 API payload and optional request options. 

   If the response is not successful, it throws a `ResponseError`.

   Example Usage:

   ```javascript
    let response = await httpProviderInstance.request(payload, requestOptions);
   ```

2. `getClientUrl()`

   Returns the `clientUrl` string that the instance was initialized with.

   Example Usage:

   ```javascript
    let clientUrl = httpProviderInstance.getClientUrl();
   ```

### Exports

The `HttpProvider` class and `HttpProviderOptions` type are exported at the module level:

```javascript
export { HttpProvider, HttpProviderOptions };
```

### Additional Notes

The code responsible for making the `fetch` request is wrapped with the ESLint disabling function comments due to the nature of unsafe arguments that the fetch API may contain.
