# rweb3-types integers

## Overview

This library provides a set of classes to interact with integers of different sizes, namely `Uint32`, `Int53`, `Uint53` and `Uint64`. These classes ensure all integer types can be used in a uniform way.

## Integer Interface

The `Integer` interface provides basic mathematical operations that can be applied to all types, including conversion to number, big integer, and string.

```typescript
interface Integer {
    readonly toNumber: () => number;
    readonly toBigInt: () => bigint;
    readonly toString: () => string;
}
```

## Byte Converters Interface

The `WithByteConverters` interface provides methods to convert a given integer to corresponding byte arrays in both big and little endian forms.

```typescript
interface WithByteConverters {
    readonly toBytesBigEndian: () => Uint8Array;
    readonly toBytesLittleEndian: () => Uint8Array;
}
```

## Uint32 Class

The `Uint32` class handles 32-bit unsigned integers and implements both the `Integer` and `WithByteConverters` interfaces.

## Int53 Class

The `Int53` class handles 53-bit signed integers and implements the `Integer` interface.

## Uint53 Class

The `Uint53` class handles 53-bit unsigned integers and implements `Integer` interface.

## Uint64 Class

The `Uint64` class handles 64-bit unsigned integers and implements both `Integer` and `WithByteConverters` interfaces.

Each of these classes provide several static methods to convert from different representations (strings, byte arrays, numbers) into their respective formats. They also provide checks to ensure that the input values are within respective bounds of each of the integer types.

Please, refer to the source code to get details on usage of these classes.