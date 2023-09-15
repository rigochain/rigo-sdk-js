# rweb3-utils converters

## Table of Contents
- [RigoUnitMap](#RigoUnitMap)
- [BytesToUint8Array](#BytesToUint8Array)
- [BytesToHex](#BytesToHex)
- [HexToBytes](#HexToBytes)
- [HexToNumber](#HexToNumber)
- [ToDecimal](#ToDecimal)
- [NumberToHex](#NumberToHex)
- [FromDecimal](#FromDecimal)
- [Utf8ToHex](#FromDecimal)
- [FromUtf8](#FromUtf8)
- [StringToHex](#StringToHex)
- [HexToUtf8](#HexToUtf8)
- [ToUtf8](#ToUtf8)
- [HexToAscii](#HexToAscii)
- [ToAscii](#ToAscii)
- [ToNumber](#ToNumber)
- [ToBigInt](#ToBigInt)
- [FromFons](#FromFons)
- [ToFons](#ToFons)
- [ToChecksumAddress](#ToChecksumAddress)

---

### License
Copyright 2023 All Rigo Chain Developers

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

---

### RigoUnitMap

A hashtable that stores the ratio between different units of Rigo.

```ts
export const rigoUnitMap = {
    norigo: BigInt('0'),
    fons: BigInt(1),
    // ...
    trigo: expo10(30),
};
```

### BytesToUint8Array

This method converts an instance of `Bytes` into an instance of `Uint8Array`.

```ts
export const bytesToUint8Array = (data: Bytes): Uint8Array | never => {...}
```

### BytesToHex

This method converts an instance of `Bytes` into a `HexString`.

```ts
export const bytesToHex = (bytes: Bytes): HexString => {...}
```

### HexToBytes

This method converts an instance of `HexString` into `Bytes`.

```ts
export const hexToBytes = (bytes: HexString): Uint8Array => {...}
```

### HexToNumber

This method converts an instance of `HexString` into a number.

```ts
export const hexToNumber = (value: HexString): bigint | number => {...}
```

### ToDecimal

Alias for `hexToNumber`.

```ts
export const toDecimal = hexToNumber;
```

### NumberToHex

This method converts a number into a `HexString`.

```ts
export const numberToHex = (value: Numbers, hexstrict?: boolean): HexString => {...}
```

### FromDecimal

Alias for `numberToHex`.

```ts
export const fromDecimal = numberToHex;
```

### Utf8ToHex

This method converts a string into a `HexString`.

```ts
export const utf8ToHex = (str: string): HexString => {...}
```

### FromUtf8

Alias for `utf8ToHex`.

```ts
export const fromUtf8 = utf8ToHex;
```

### StringToHex

Alias for `utf8ToHex`.

```ts
export const stringToHex = utf8ToHex;
```

### HexToUtf8

This method converts a `HexString` into a string.

```ts
export const hexToUtf8 = (str: HexString): string => {...}
```

### ToUtf8

This method converts an input (which can be `HexString` or `Uint8Array`) into a UTF-8 string.

```ts
export const toUtf8 = (input: HexString | Uint8Array) => {...}
```

### HexToAscii

This method converts a `HexString` into an ASCII string.

```ts
export const hexToAscii = (str: HexString): string => {...}
```

### ToAscii

Alias for `hexToAscii`.

```ts
export const toAscii = hexToAscii;
```

### ToNumber

This method converts a `Numbers` value into a number or bigint representation.

```ts
export const toNumber = (value: Numbers): bigint|number => {...}
```

### ToBigInt

This method converts any given value into its bigint representation.

```ts
export const toBigInt = (value: unknown): bigint => {...}
```

### FromFons

This method converts a given number in fons into any other Rigo unit.

```ts
export const fromFons = (number: Numbers, unit: RigoUnits): string => {...}
```

### ToFons

This method converts a given number from a specified Rigo unit into fons.

```ts
export const toFons = (number: Numbers, unit: RigoUnits): string => {...}
```

### ToChecksumAddress

This method converts an address to a checksum address.

```ts
export const toChecksumAddress = (address: Address): string => {...}
```
