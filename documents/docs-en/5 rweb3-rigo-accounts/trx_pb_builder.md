# rweb3-rigo-accounts trx pb builder

This documentation provides the detailed guide for the code of the Rigo Chain project. This code handles transaction payload creation, decoding, signing, and validation. The modules include _TrxProtoBuilder_, _Transaction_ functions and several helper functions.

## TrxProtoBuilder Module 

The TrxProtoBuilder module is a collection of transaction-related functions. These functions facilitate creating, signing, and decoding transactions.

- `decodeTransaction`: This function takes a transaction hash, decodes the transaction and returns detailed information about it.
- `buildTransferTrxProto`: This function returns an object containing transaction details for the transaction type 1 (Transfer) after checking if each field is set.
- `buildDelegateTrxProto`: Constructs a transaction protocol for delegating a transaction (i.e., transaction type 2), ensuring that each field is set.
- `buildUnDelegateTrxProto`: Similar to `buildDelegateTrxProto`, but for type 3 transactions (Unstaking).
- `buildContractTrxProto`: This function constructs a contract transaction (type 6) based on the provided input transaction.
- `buildProposalTrx`: This function is used for building a proposal transaction.
- `buildVotingTrx`: Constructs a voting transaction (type 5) based on given transaction.
- `signTrxProto`: Signs a TrxProto object. Returns an array with the signed transaction and the encoded transaction.
- `signedRawTrxProto`: Handles encoding, signing, and converting the transaction protocol to a base64 string.
- `verifyTrxProto`: Checks the authenticity of a transaction by verifying the transaction signature.

## Helper Functions

- `isSet`: Checks whether a given value is not undefined.
  
## Transaction Interfaces

- `TrxPayloadCreateContract`: This is an interface for creating a transaction.

## Bits Usage

The usage of specific number type for each field in transaction creation is important. `Long` type number, `BN` for amount, `Buffer` for an array etc. are used to improve the accuracy of the transaction data and reduce potential errors due to data overflow or underflow.