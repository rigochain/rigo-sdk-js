# RWeb3Context Documentation

`RWeb3Context` is a core component of the custom RWeb3 structure, facilitating interactions with various blockchain networks.

## Table of Contents

- [Import Statements](#import-statements)
- [Types and Interfaces](#types-and-interfaces)
- [Core Class - RWeb3Context](#core-class---rweb3context)
    - [Properties](#properties)
    - [Constructor](#constructor)
    - [Methods](#methods)

## Import Statements

The class utilizes various external utilities and types:

```javascript
import { RWeb3Config } from './rweb3_config.js';
import { RWeb3RequestManager } from './rweb3_request_manager.js';
import { isNullish } from '@rigochain/rweb3-validator';
import { RWeb3APISpec, RigoExecutionAPI } from '@rigochain/rweb3-types';
import HttpProvider from '@rigochain/rweb3-providers-http';
import WebsocketProvider from '@rigochain/rweb3-providers-ws';
```

## Types and Interfaces

There are a few types and interfaces crucial for understanding the class:

RWeb3ContextConstructor: Represents the constructor type of RWeb3Context.
RWeb3ContextObject: An object type that houses the requestManager.

## Core Class - RWeb3Context

## Properties
providers: A set of providers available in RWeb3RequestManager.
_requestManager: Manages requests.
requestManager: Getter for _requestManager.
Constructor
Initializes the context. Accepts an optional providerOrContext which can be a string. If this argument is a valid string or matches the SupportedProviders interface, the _requestManager is instantiated with it.

## Methods
use(): Utilizes a provided context.
set provider(): Setter for the provider which can be an HttpProvider, WebsocketProvider, or a string.
getContextObject(): Retrieves the context object containing the requestManager.
getProvider(): Gets the available providers.
setProvider(): Defines a provider which can be an HttpProvider, WebsocketProvider, or a string. If the provider is an HTTP or WS URL, the corresponding provider is instantiated.
This documentation provides a brief overview of the RWeb3Context class. It might require more in-depth details or examples based on actual use-cases.