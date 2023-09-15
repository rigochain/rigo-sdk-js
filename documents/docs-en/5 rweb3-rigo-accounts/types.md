# rweb3-rigo-accounts types

## Description

This piece of documentation describes the types and interfaces of RWeb3 Account, which is a key component of the RigoChain RWeb3 project. 

## Types

- **SignTransactionResult**:

    This type describes the output of a transaction that has been signed. The output includes the raw transaction data as well as the hash of the transaction.

```ts
export type SignTransactionResult = {
    rawTransaction: string;
    transactionHash: string;
};
```

- **SignTransactionFunction**:

    This function takes an transaction (which is either a Transaction object or a generic record object) and returns a SignTransactionResult.

```ts
export type SignTransactionFunction = (
    transaction: Transaction<Object> | Record<string, unknown>,
) => SignTransactionResult;
```

## Interface

- **RWeb3Account**: 

    This interface extends Web3BaseWalletAccount and contains the properties address, prvKey (private key), and pubKey (public key).

```ts
export interface RWeb3Account extends Web3BaseWalletAccount {
    address: string;
    prvKey: PrvKey;
    pubKey: PubKey;
}
```
