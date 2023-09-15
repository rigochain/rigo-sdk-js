# Documentation for TrxProto Interface

## Interface: TrxProto

The `TrxProto` interface provides structure for transaction details, consisting of ten properties:

### Properties

- **version** (number): Represents version of the transaction.

- **time** (Long): The timestamp of the transaction represented using Google's long library.

- **nonce** (Long): The nonce of the transaction, which is a random or pseudo-random number generated for a specific use.

- **from** (Uint8Array): An array of 8 bit unsigned integers representing the sender address.

- **to** (Uint8Array): An array of 8 bit unsigned integers representing the receiver address.

- **Amount** (Uint8Array): An array of 8 bit unsigned integers representing the amount of the transaction.

- **Gas** (Uint8Array): An array of 8 bit unsigned integers representing the gas for the transaction.

- **type** (number): Represents the type of the transaction.

- **Payload** (Uint8Array): An array of 8 bit unsigned integers representing the payload for the transaction.

- **sig** (Uint8Array): An array of 8 bit unsigned integers representing the signature for the transaction.