# rweb3 accounts

This documentation is dedicated to the `initAccountsForContext` function exported by Rigo Chain Developers.

## Description
The `initAccountsForContext` function returns an object which contains six methods which are imported from `@rigochain/rweb3-rigo-accounts` module. These methods can be used for creating, handling and managing accounts in Rigo Chain.

## Function Declaration

```javascript
export const initAccountsForContext = () => {
    return {
        create: create,
        privateKeyToAccount: privateKeyToAccount,
        privateKeyToPrvKey: privateKeyToPrvKey,
        prvKeyToAccount: prvKeyToAccount,
        sign: sign,
        signTransaction: signTransaction,
    };
};
```

## Return

The function returns an object with the following methods.

- `create()` : A function to create a new account.
- `privateKeyToAccount(privateKey)` : A function which takes `privateKey` as argument and converts it into an Account.
- `privateKeyToPrvKey(privateKey)` : A method which takes `privateKey` as argument and converts it into a Private Key.
- `prvKeyToAccount(prvKey)` : A function, which takes a `prvKey` and returns an Account.
- `sign(data, privateKey)` : A method, which signs `data` (i.e., a transaction) using the provided `privateKey`, and returns the result.
- `signTransaction(tx, privateKey)` : A function for signing a `tx`(i.e., a transaction) with a `privateKey` and returning the signed transaction.