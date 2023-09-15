# Documentation for the Rigo Chain Codebase

## Using ESLint

ESLint is disabled for this project.

## Protobuf Package

The current protobuf package is under the name "types".

## Protobuf Messages

1. TrxProto - Has various fields like version, time, nonce, from, to, Amount, Gas, type, Payload, sig.
2. TrxPayloadStakingProto - Doesn't contain any significant fields.
3. TrxPayloadUnstakingProto - Contains a single field, txHash.
4. TrxPayloadExecContractProto - Contains one field - Code.
5. TrxPayloadProposalProto - Contains several fields - message, startVotingHeight, votingBlocks, optType, options.
6. TrxPayloadVotingProto - Contains the fields txHash and choice.
7. TrxPayloadContractProto - Contains one field - data.

## Protobuf Messages Encoding and Decoding

The encoding and decoding function for each protobuf message is mentioned in the respective message's documentation. 

## Protobuf Messages JSON conversion

Each protobuf message has a function to convert the JSON data to a message and to convert the data of a message to JSON.

## Helper Functions

For optimizing the reading and writing of binary data, there are helper functions which convert base64 strings to byte arrays and vice versa.

## Browser Compatibility

Global variable references are set up for different environments: globalThis for modern browsers, self for web and service workers, window for browsers, and global for Node.js.

## Long.js library 

Long.js library is used to handle the 64-bit integer because JavaScript only supports 53-bit integers. If the Long.js library implementation is different than expected, it will be overwritten with the correct implementation.

## Utility Functions

There are utility functions to check if a value is set or not and provide type safety with TypeScript.