<!--
# rweb3-rigo-contracts encoding

## Introduction
The following document provides instructional usage of the `rigochain` API. Copyrights 2023 All Rigo Chain Developers.

## Usage

This API comes with a set of functions including:

- `encodeEventABI`
- `decodeEventABI`
- `encodeMethodABI`
- `decodeMethodReturn`

### `encodeEventABI`
This function is used to encode information related to an event from an ABI.
By providing the address of the contract and the event from the ABI, it extracts topics and additional filter options. It handles the fromBlock and the toBlock as well as topics.

**Syntax:**
```javascript
encodeEventABI({ address }, event, options);
```

**Parameters:**
- `contractOptions`: The address of the contract
- `event`: The event from the ABI
- `options?`: An object containing other parameters such as filter, fromBlock and toBlock.

### `decodeEventABI`
This function decodes information from the log of a specific ABI event.

**Syntax:**
```javascript
decodeEventABI(event, data, jsonInterface, returnFormat);
```

**Parameters:**
- `event`: The event from the ABI
- `data`: The log data
- `jsonInterface`: The ABI interface of the contract
- `returnFormat`: The data format for the return values

### `encodeMethodABI`
This function encodes ABI method parameters and return its outcome as hex representation.

**Syntax:**
```javascript
encodeMethodABI(abi, args, deployData);
```

**Parameters:**
- `abi`: The ABI of the method to be encoded
- `args`: The arguments of the method to be encoded
- `deployData`: The deployment data of the contract

### `decodeMethodReturn`
This function decodes the return data from a smart contract method execution.

**Syntax:**
```javascript
decodeMethodReturn(abi, returnValues)
```

**Parameters:**
- `abi`: The ABI of the method
- `returnValues?`: The return value of the method

## Errors
Any error during the execution of the functions is thrown as an instance of `Web3ContractError`.
-->