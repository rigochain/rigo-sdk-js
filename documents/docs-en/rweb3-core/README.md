# 2. rweb3-core


## Class Definition: RWeb3Context

This class extends the RWeb3Config class and is defined with a type `API` which extends the `RWeb3APISpec`.

### Variables
- `providers`: A readonly variable that is tied to the RWeb3RequestManager.providers.
- `_requestManager`: This is a protected variable that is an instance of the RWeb3RequestManager of type API.


### Constructor
- `constructor` is defined with a `providerOrContext` parameter. If `providerOrContext` is provided as a string (not empty) or matches the `SupportedProviders` interface, an instance of the `RWeb3RequestManager` is created.

### Methods
- `use`: This method takes in two type parameters `T` and `T2` and an argument `ContextRef` of type `RWeb3ContextConstructor<API>`. The method returns a new context `useContext` which is an instance of `ContextRef`.
- `set provider`: This setter method sets the provider.
- `getContextObject` returns a request manager.
- `getProvider` returns the providers from the request manager.
- `setProvider` is a method that accepts a `provider` parameter and sets it as the provider based on its type i.e., `HttpProvider`, `WebsocketProvider` or `string`.

---

Summing up, the `RWeb3Context` class in the RigoChain framework provides an interface for managing web3 API contexts and associated providers.

# RWeb3RequestManager

`RWeb3RequestManager` is a class of the Rigo Chain that is responsible for handling the web3 requests. Its primary duties include setting the provider, processing JSON-RPC responses, and dealing with subscriptions.

## Initialisation

The constructor takes two parameters:
- `provider` (optional): The provider you want to set. It is either a string URL of the provider or an instance of `HttpProvider` or `WebsocketProvider`.
- `useRpcCallSpecification` (optional): A boolean value to use RPC call specification.

## Setting Providers

`setProvider()` method of the `RWeb3RequestManager` class is used to set a new provider. The parameter can be an instance of `HttpProvider` or `WebsocketProvider` or a string URL of the provider. This method supports auto-detection of the provider type based on the URL.

## Sending Requests

`send()` method is used to send a request. This method takes a request as a parameter which should be of `RWeb3APIRequest` type.

This method first generates the payload for this request using the `jsonRpc.toPayload` method and then uses the provider's request method to send this request.

If the response from the request method is a successful response, it returns this response. Otherwise, it throws a `ResponseError`.

## Subscription

The `subscribe` method provides the subscription for an event using the provider's `listen` method. But this method throws an error if the provider is not a `WebsocketProvider`.

## Error Handling

It is equipped with various error handling mechanisms. For instance, while processing JSON-RPC responses, it checks if the response contains an error, if it's a legacy or an error thrown by the batch request, or if it deviates from the general expected response model. In any of these cases, it throws an exception.

## Getters

- `providers()`: Returns all the available providers.
- `provider()`: Returns the current provider.
- `Web3RequestManagerEvent`: An enumeration that defines some events related to the provider's changes.

## Types
Several types are used in this class:
- `HttpProvider`: Class from the `@rigochain/rweb3-providers-http` package, representing a provider using HTTP for communication.
- `WebsocketProvider`: Class from the `@rigochain/rweb3-providers-ws` package, representing a provider using WebSocket for communication.
- `RWeb3APIRequest`, `RWeb3APIReturnType`, etc.: Types from the `@rigochain/rweb3-types` package, representing various aspects of API calls.

## Special Handling
It has special handling for the case where the transaction execution code of the smart contract is reverted. In this case, the error message would include the word 'revert'.