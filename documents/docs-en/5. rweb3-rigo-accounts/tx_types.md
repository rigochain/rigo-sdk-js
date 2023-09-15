# rweb3-rigo-accounts trx types

## Code Overview

This code is used for developing cryptographic transactions in the Rigo blockchain. It exports two JavaScript classes and two interfaces which define the structure of a transaction and its respective payload.

### Exported Interfaces

#### Transaction Interface

Defines the structure of a transaction. It includes details like the transaction hash, version, time, from, to, amount, gas, type and data payload:

```typescript
export interface Transaction<T> {
    hash?: string;
    version?: number;
    time?: Date;
    nonce?: number;
    from: string;
    to: string;
    amount: string;
    gas: string;
    type?: number;
    payload?: object | T;
    sig?: string;
}
```

#### TransactionPayloadUnDelegating

This interface contains the transaction hash attribute:

```typescript
export interface TransactionPayloadUnDelegating {
    txhash: string;
}
```

### Exported Classes

#### PubKey Class

Used for cryptographic operations related to public keys. This class can be used to create a public key from a private key, generate SHA-256 and Bitcoin addresses, verify a signature, and transform the public key to a hexadecimal string:

```typescript
export class PubKey {
    // Various methods including:
    // `constructor(k: PrvKey)` - Creates a public key from a given PrvKey object.
    // `toAddress(): BytesUint8Array` - Returns the bitcoin address for this public key.
    // `shaAddress(): BytesUint8Array` - Returns the SHA-256 hashed address for this public key.
    // `btcAddress(): BytesUint8Array` - Returns the bitcoin hashed address for this public key.
    // `ethAddress(): BytesUint8Array` - Not supported.
    // `verify(sig: Uint8Array, msg: Uint8Array): boolean` - Verifies a signature for a given message.
    // `toHex(): string` - Returns a hexadecimal representation of the public key. 
}
```

#### PrvKey Class

Used for manipulating private keys including generation, signature creation and import / export options:

```typescript
export class PrvKey {
    //Various methods including:
    // `constructor()` - Generates a new private key.
    // `sign(msg: Uint8Array): { signature: Uint8Array; recid: number }` - Signs a message with this private key.
    // `export(): BytesUint8Array` - Returns the private key as a bytes array.
    // `static import(k: string | ArrayBufferLike): PrvKey` - Creates a PrvKey object from a string or array buffer.
}
```