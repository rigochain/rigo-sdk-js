# Getting Started

**Welcome to the @rigochain/rweb3 Guide Documentation.**

@rigochain/rweb3 is a JavaScript library that allows you to interact with local or remote RIGO nodes using HTTP and WebSocket. The following documentation provides information on how to use @rigochain/rweb3 and includes example code.
This documentation is intended for developers using @rigochain/rweb3 version 1.0.12 or higher.

## Requirements

To use the @rigochain/rweb3 library, you will need the following requirements:
- Node.js (version 16.19.0 or higher)
- npm (version 8.19.0 or higher)

## Installation

To install @rigochain/rweb3, use npm and run the following command:
```shell
npm install @rigochain/rweb3
```

To install a specific version of @rigochain/rweb3, use the following command:
```shell
npm install @rigochain/rweb3@X.X.X
```

## Starting with @rigochain/rweb3
Once the installation of @rigochain/rweb3 is complete, you can use the library to connect to a RIGO node. Please check the following example to see how to establish a connection.

First, create a file in your working directory to write the example code.
```shell
$ touch rigo.ts
```
In the generated rigo.js file, write the following code.
```javascript
import { RWeb3 } from '@rigochain/rweb3';
const rweb3 = new Rweb3('https://rpc1.testnet.rigochain.io');

async function getAbciInfo() {
    const info = await rweb3.rigo.abciInfo();
    console.log(info);
}

getAbciInfo();
```
The result of the above code is as follows.
```shell
{
  response: {
    version: '0.17.0',
    app_version: '72620543991349248',
    last_block_height: 231923,
    last_block_app_hash: '4MYzthbFGIFAGU/EOy+Dw1JjxjqBl1NimEryfjyHS9o='
  }
}
```
