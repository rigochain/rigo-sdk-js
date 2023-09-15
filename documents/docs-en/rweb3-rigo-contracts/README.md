<!--
# rweb3-rigo-contracts


This documentation covers the Contract library for the Rigo Chain project.

## Table of Contents

- [Dependencies](#dependencies)
- [Types](#types)
- [Contract Class](#contract-class)
    - [Constructor](#constructor)
    - [Methods](#methods)
* [encoding function](./encoding.md)
* [contract utils function](./utils.md)


## Dependencies

This library imports various types, classes, and utility modules from the following:

- `@rigochain/rweb3-types`
- `@rigochain/rweb3-core`
- `@rigochain/rweb3-utils`
- `@rigochain/rweb3-rigo-abi`
- `@rigochain/rweb3-validator`
- `@rigochain/rweb3-errors`
- `@rigochain/rweb3-rigo`
- `@rigochain/rweb3-providers-http`
- `@rigochain/rweb3-providers-ws`

## Types

Several types are declared to help define function signatures and interfaces:

- `ContractBoundMethod<Abi extends AbiFunctionFragment, Method extends ContractMethod<Abi> = ContractMethod<Abi>>`
- `ContractMethodsInterface<Abi extends ContractAbi>`
- `ContractBoundEvent`
- `ContractEventsInterface<Abi extends ContractAbi, Events extends ContractEvents<Abi> = ContractEvents<Abi>>`
- `ContractOverloadedMethodInputs<AbiArr extends ReadonlyArray<unknown>>`
- `ContractOverloadedMethodOutputs<AbiArr extends ReadonlyArray<unknown>>`

These types are used to manage contract methods and event bindings, as well as parsing method inputs and outputs.

## Contract Class

The `Contract` class represents a contract on the Rigo Chain. It provides methods to interact with contracts and decode their details.

### Constructor

The class constructor takes a `jsonInterface` which contains the ABI of the contract, and an optional `addressOrOptionsOrContext` which could be an address string or a RWeb3Context instance.

### Methods

The `Contract` class includes the following key methods:

- `provider`: This is a setter method that updates the request manager with a new provider.
- `methods`: This getter method provides access to the contract methods prepared from the JSON interface.
- `deploy(bytecode: string, args: any[], rWeb3Account: RWeb3Account)`: This method allows for deploying a new instance of the contract using the specified bytecode, arguments, and account details.
- `settingsProvider(providers: HttpProvider | WebsocketProvider)`: This method allows changing the request provider used for the contract's transactions.}

The class also contains several private methods that handle contract execution,  ABI parsing, and method encoding:

- `_contractMethodCall<Options extends PayableCallOptions | NonPayableCallOptions>`
- `_contractMethodSend<Options extends PayableCallOptions | NonPayableCallOptions>`
- `_getAbiParams`
- `_parseAndSetAddress`
- `_parseAndSetJsonInterface`
- `_createContractMethod<T extends AbiFunctionFragment[], E extends AbiErrorFragment>`
-->