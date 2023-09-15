# Rigo Chain Developers Library

## Contents
1. [Data Types](#data-types)
2. [ABI Types](#abi-types)
3. [`AbiCoderStruct` Interface](#`AbiCoderStruct`-Interface)
4. [ABI Fragments](#abi-fragments)
5. [Contract ABIs](#contract-abis)
6. [Primitive Types](#primitive-types)
7. [Parameter Generation](#parameter-generation)
8. [Contract Methods](#contract-methods)

## Data Types
A variety of different data types are used in this library. Significant types include:

- `_SolidityIndexRange`: This is a numerical type that includes values from 1 to 30, excluding 23-24 for some reason.

- `ConvertToNumber`: This is a generic type takes a string value `T` and a numeric range, converts the range into a string and checks it against `T`, returning the matching range value, or `never` if no match is found.

- `Components`: A type representing a component in the ABI structure. It has a name, type and other optional properties.

## ABI Types

The code defines interfaces and types for working with the Ethereum ABI in a strongly typed manner. Relevant types include:

- `AbiStruct`: Represents a structure in the ABI, including its name and type.

- `AbiParameter`: Represents a parameter in the ABI. This includes the name, type and other properties of the parameter.

## `AbiCoderStruct` Interface

This interface extends the `AbiStruct` interface. It has an additional property, namely `components` which is an array of `AbiStruct`.

## ABI Fragments

The code defines multiple types for the different fragment types that can occur in an ABI. These include:

- `AbiConstructorFragment`: Represents a constructor in the ABI.

- `AbiFunctionFragment`: Represents a function in the ABI.

- `AbiEventFragment`: Represents an event in the ABI.

- `AbiErrorFragment`: Represents an error in the ABI.

- `AbiFallbackFragment`: Represents a fallback function in the ABI.

## Contract ABIs

- `ContractAbi`: A readonly array of `AbiFragment`. 

- `AbiInput`: One of several possible ABIs, including `string`, `AbiParameter`, an object with specific properties or a readonly array of unknown.

## Primitive Types

The code defines multiple types that represent different kinds of primitive types that can exist in an ABI. These include strings, booleans, integers, bytes and tuples.

## Parameter Generation

Code includes complex types and operations for generating the correct types for input and output parameters to contract methods. It uses recursive types to correctly generate types for all possible inputs and outputs.

## Contract Methods

- `ContractConstructor` : Produces contract constructor-related properties – both overall and input-specific.

- `ContractMethod` : Includes both input and ouput types for a given ABI function fragment.

- `ContractEvent` : Provides input types for a given ABI event fragment.

There are also specific filter types for razor-sharp selection of specific ABIs like `ContractMethods` for extracting functional fragments, and `ContractEvents` for parsing the events.