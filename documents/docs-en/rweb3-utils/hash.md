# Web3 Utilities Documentation

## Table of Contents
1. [Functions](#functions)
     1. [sha3](#sha3)
     2. [sha3Raw](#sha3raw)
     3. [keccak256Wrapper](#keccak256wrapper)
     4. [getType](#gettype)
     5. [elementaryName](#elementaryname)
     6. [solidityPack](#soliditypack)
     7. [processSolidityEncodePackedArgs](#processSolidityEncodePackedArgs)
     8. [encodePacked](#encodepacked)
     9. [soliditySha3](#soliditysha3)
     10. [soliditySha3Raw](#soliditysha3raw)
     11. [getStorageSlotNumForLongString](#getstorageslotnumforlongstring)

## Functions

### sha3
This function computes the Keccak-256 hash of the input and returns a hexstring.
Input: Bytes
Output: string | undefined

Example: 

```ts
    console.log(web3.utils.sha3('web3.js'));
    > 0x63667efb1961039c9bb0d6ea7a5abdd223a3aca7daa5044ad894226e1f83919a

    console.log(web3.utils.sha3(''));
    > undefined
```

### sha3Raw
This function will calculate the sha3 of the input but does return the hash value instead of null if for example an empty string is passed.
Input: Bytes
Output: string

Example: 

```ts
    console.log(web3.utils.sha3Raw('web3.js'));
    > 0x63667efb1961039c9bb0d6ea7a5abdd223a3aca7daa5044ad894226e1f83919a
    console.log(web3.utils.sha3Raw(''));
    > 0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470
```
      
### keccak256Wrapper
This function is a wrapper for ethereum-cryptography/keccak256 to allow hashing a `string` and a `bigint` in addition to `UInt8Array`.
Inputs: Bytes | Numbers | string | ReadonlyArray<number>
Output: string

Example:
```ts
    console.log(web3.utils.keccak256Wrapper('web3.js'));
    > 0x63667efb1961039c9bb0d6ea7a5abdd223a3aca7daa5044ad894226e1f83919a
    console.log(web3.utils.keccak256Wrapper(1));
    > 0xc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc6
    console.log(web3.utils.keccak256Wrapper(0xaf12fd));
    > 0x358640fd4719fa923525d74ab5ae80a594301aba5543e3492b052bf4598b794c
```

### getType
Return type and value
Input: Sha3Input
Output: [string, EncodingTypes]

### elementaryName
Returns the type with size if uint or int
Input: string
Output: string

### solidityPack
Pads the value based on size and type
returns a string of the padded value
Input: string, EncodingTypes
Output: string

### processSolidityEncodePackedArgs
Returns a string of the tightly packed value given based on the type
Input: Sha3Input
Output: string

### encodePacked
Encodes packed arguments to a hexstring
Input: Sha3Input[]
Output: string

### soliditySha3
This function will tightly pack values given in the same way solidity would then hash. Returns a hash string, or null if input is empty.
Input: Sha3Input
Output: string | undefined`

Example: 
```ts
    console.log([{ type: 'string', value: '31323334' }]);
    console.log(web3.utils.soliditySha3({ type: "string", value: "31323334" }));
    > 0xf15f8da2ad27e486d632dc37d24912f634398918d6f9913a0a0ff84e388be62b
```

### soliditySha3Raw
This function will tightly pack values given in the same way solidity would then hash. Returns a hash string, if input is empty will return `0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470`.
Input: Sha3Input
Output: string

Example: 
```ts
    console.log(web3.utils.soliditySha3Raw({ type: "string", value: "helloworld" }))
    > 0xfa26db7ca85ead399216e7c6316bc50ed24393c3122b582735e7f3b0f91b93f0
```

### getStorageSlotNumForLongString
Get the slot number for storing a long string in the contract. This function is particularly useful for getStorage method.
Returns the slot number where the long string will be stored.
Input: number | string
Output: string
