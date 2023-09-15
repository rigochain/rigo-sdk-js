# Documentation for Rigo Chain Developers' Code 

### Table of Contents
1. [Prerequisites](#prerequisites)
2. [Types Useful in SDK](#types)
3. [Interfaces](#interfaces)
4. [HardForks](#hardforks)
5. [Blocks](#blocks)
6. [Transaction](#transaction)

---

## Prerequisites <a name="prerequisites"></a>

This package expects that the data-types `Bytes`, `HexString`, and `Numbers` to be imported from the primitive_types module.

---

## Types Useful in SDK <a name="types"></a>

Here are types that form the building blocks of the exported types in the SDK:

```ts
export type ValueTypes = 'address' | 'bool' | 'string' | 'int256' | 'uint256' | 'bytes' | 'bigint';
export type HexString32Bytes = HexString;
export type HexString16Bytes = HexString;
export type HexString8Bytes = HexString;
export type HexStringSingleByte = HexString;
export type HexStringBytes = HexString;
export type Uint = HexString;
export type Uint256 = HexString;
export type Address = HexString;
export type Topic = HexString32Bytes;
export type TransactionHash = HexString;
```

---

## Interfaces <a name="interfaces"></a>

The following are interfaces mentioned in the code. An interface in TypeScript is an abstract type that’s useful for working with complex structures.

```ts
export interface TransactionReceiptBase<numberType, hashByteType, logsBloomByteType, logsType> {
    readonly transactionHash: hashByteType;
    readonly transactionIndex: numberType;
    readonly blockHash: hashByteType;
    readonly blockNumber: numberType;
    readonly from: Address;
    readonly to: Address;
    readonly cumulativeGasUsed: numberType;
    readonly gasUsed: numberType;
    readonly effectiveGasPrice?: numberType;
    readonly contractAddress?: Address;
    readonly logs: logsType[];
    readonly logsBloom: logsBloomByteType;
    readonly root: hashByteType;
    readonly status: numberType;
    readonly type?: numberType;
}
```

---

## HardForks <a name="hardforks"></a>

The following is an enumeration object that lists the available Hardforks:

```ts
export enum HardforksOrdered {
    chainstart = 'chainstart',
    frontier = 'frontier',
    homestead = 'homestead',
    dao = 'dao',
    tangerineWhistle = 'tangerineWhistle',
    spuriousDragon = 'spuriousDragon',
    byzantium = 'byzantium',
    constantinople = 'constantinople',
    petersburg = 'petersburg',
    istanbul = 'istanbul',
    muirGlacier = 'muirGlacier',
    berlin = 'berlin',
    london = 'london',
    altair = 'altair',
    arrowGlacier = 'arrowGlacier',
    grayGlacier = 'grayGlacier',
    bellatrix = 'bellatrix',
    merge = 'merge',
    capella = 'capella',
    shanghai = 'shanghai',
}
```
---

## Blocks <a name="blocks"></a>

The BlockBase interface represents the base structure of a block. It has the following signature:

```ts
export interface BlockBase<
    ByteType,
    HexStringType,
    NumberType,
    extraDataType,
    TransactionTypes,
    logsBloomType,
> {
    readonly parentHash: ByteType;
    readonly sha3Uncles: ByteType;
    readonly miner: HexStringType;
    readonly stateRoot: ByteType;
    readonly transactionsRoot: ByteType;
    readonly receiptsRoot: ByteType;
    readonly logsBloom?: logsBloomType;
    readonly difficulty?: NumberType;
    readonly number: NumberType;
    readonly gasLimit: NumberType;
    readonly gasUsed: NumberType;
    readonly timestamp: NumberType;
    readonly extraData: extraDataType;
    readonly mixHash: ByteType;
    readonly nonce: NumberType;
    readonly totalDifficulty: NumberType;
    readonly baseFeePerGas?: NumberType;
    readonly size: NumberType;
    readonly transactions: TransactionTypes;
    readonly uncles: Uncles;
    readonly hash?: ByteType;
}
```

---

## Transaction <a name="transaction"></a>

Here is the Transaction interface:

```ts
interface TransactionBase {
    value?: Numbers;
    accessList?: AccessList;
    common?: Common;
    gas?: Numbers;
    gasPrice?: Numbers;
    type?: Numbers;
    maxFeePerGas?: Numbers;
    maxPriorityFeePerGas?: Numbers;
    data?: Bytes;
    input?: Bytes;
    nonce?: Numbers;
    chain?: ValidChains;
    hardfork?: Hardfork;
    chainId?: Numbers;
    networkId?: Numbers;
    gasLimit?: Numbers;
    yParity?: Uint;
    v?: Numbers;
    r?: Bytes;
    s?: Bytes;
}
```

---

## LogBase <a name="hardware"></a>

The following interface represents a structure of a log base.

```ts
export interface LogBase<NumberType, ByteType> {
    readonly removed?: boolean;
    readonly logIndex?: NumberType;
    readonly transactionIndex?: NumberType;
    readonly transactionHash?: ByteType;
    readonly blockHash?: ByteType;
    readonly blockNumber?: NumberType;
    readonly address?: Address;
    readonly data?: ByteType;
    readonly topics?: ByteType[];
    readonly id?: string;
}
```