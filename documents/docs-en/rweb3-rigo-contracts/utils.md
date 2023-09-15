# Rigo Chain Developer Documentation 


This file contains API implementations that include:

1. `getSendTxParams`
2. `getEthTxCallParams`
3. `getEstimateGasParams`
4. `getCreateAccessListParams`
5. `isContractInitOptions`

These functions include enhancements and customizations for the contract options. Custom error handling is present in certain cases such as the contract and 'from' address not being specified.

### getSendTxParams Function

```javascript
export const getSendTxParams = ({
    abi,
    params,
    options,
    contractOptions,
}: {
    abi: AbiFunctionFragment;
    params: unknown[];
    options?: (PayableCallOptions | NonPayableCallOptions) & {
        input?: HexString;
        data?: HexString;
        to?: Address;
    };
    contractOptions: ContractOptions;
}): TransactionCall => {
    // Function implementation here
};
```

### getEthTxCallParams Function

```javascript
export const getEthTxCallParams = ({
    abi,
    params,
    options,
    contractOptions,
}: {
    abi: AbiFunctionFragment;
    params: unknown[];
    options?: (PayableCallOptions | NonPayableCallOptions) & { to?: Address };
    contractOptions: ContractOptions;
}): TransactionCall => {
    // Function implementation here
};
```
### getEstimateGasParams Function

```javascript
export const getEstimateGasParams = ({
    abi,
    params,
    options,
    contractOptions,
}: {
    abi: AbiFunctionFragment;
    params: unknown[];
    options?: PayableCallOptions | NonPayableCallOptions;
    contractOptions: ContractOptions;
}): Partial<TransactionWithSenderAPI> => {
    // Function implementation here
};
```

### getCreateAccessListParams Function

```javascript
export const getCreateAccessListParams = ({
    abi,
    params,
    options,
    contractOptions,
}: {
    abi: AbiFunctionFragment;
    params: unknown[];
    options?: (PayableCallOptions | NonPayableCallOptions) & { to?: Address };
    contractOptions: ContractOptions;
}): TransactionForAccessList => {
    // Function implementation here
};
```

### isContractInitOptions Function

```javascript
export const isContractInitOptions = (options: unknown): options is ContractInitOptions =>
    // Function implementation here
```
These provide the development team with streamlined, easier-to-navigate code which allows for better maintenance and potential feature expansions in the future.