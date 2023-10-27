# rweb3-utils converter

## 목차
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

### RigoUnitMap

Rigo의 다양한 단위 간의 비율을 저장하는 해시 테이블입니다.

```ts
export const rigoUnitMap = {
    norigo: BigInt('0'),
    fons: BigInt(1),
    // ...
    trigo: expo10(30),
};
```

### BytesToUint8Array

이 메서드는 `Bytes`의 인스턴스를 `Uint8Array`의 인스턴스로 변환합니다.

```ts
export const bytesToUint8Array = (data: Bytes): Uint8Array | never => {...}
```

### BytesToHex

이 메서드는 `Bytes`의 인스턴스를 `HexString`으로 변환합니다.

```ts
export const bytesToHex = (bytes: Bytes): HexString => {...}
```

### HexToBytes

이 메서드는 `HexString`의 인스턴스를 `Bytes`로 변환합니다.

```ts
export const hexToBytes = (bytes: HexString): Uint8Array => {...}
```

### HexToNumber

이 메서드는 `HexString`의 인스턴스를 숫자로 변환합니다.

```ts
export const hexToNumber = (value: HexString): bigint | number => {...}
```

### ToDecimal

`hexToNumber`의 별칭입니다.

```ts
export const toDecimal = hexToNumber;
```

### NumberToHex

이 메서드는 숫자를 `HexString`으로 변환합니다.

```ts
export const numberToHex = (value: Numbers, hexstrict?: boolean): HexString => {...}
```

### FromDecimal

`numberToHex`의 별칭입니다.

```ts
export const fromDecimal = numberToHex;
```

### Utf8ToHex

이 메서드는 문자열을 `HexString`으로 변환합니다.

```ts
export const utf8ToHex = (str: string): HexString => {...}
```

### FromUtf8

`utf8ToHex`의 별칭입니다.

```ts
export const fromUtf8 = utf8ToHex;
```

### StringToHex

`utf8ToHex`의 별칭입니다.

```ts
export const stringToHex = utf8ToHex;
```

### HexToUtf8

이 메서드는 `HexString`을 문자열로 변환합니다.

```ts
export const hexToUtf8 = (str: HexString): string => {...}
```

### ToUtf8

이 메서드는 입력값(`HexString` 또는 `Uint8Array` 가능)을 UTF-8 문자열로 변환합니다.

```ts
export const toUtf8 = (input: HexString | Uint8Array) => {...}
```

### HexToAscii

이 메서드는 `HexString`을 ASCII 문자열로 변환합니다.

```ts
export const hexToAscii = (str: HexString): string => {...}
```

### ToAscii

`hexToAscii`의 별칭입니다.

```ts
export const toAscii = hexToAscii;
```

### ToNumber

이 메서드는 `Numbers` 값을 숫자 또는 bigint 표현으로 변환합니다.

```ts
export const toNumber = (value: Numbers): bigint|number => {...}
```

### ToBigInt

이 메서드는 주어진 값을 bigint 표현으로 변환합니다.

```ts
export const toBigInt = (value: unknown): bigint => {...}
```

### FromFons

이 메서드는 주어진 fons 단위의 숫자를 다른 Rigo 단위로 변환합니다.

```ts
export const fromFons = (number: Numbers, unit: RigoUnits): string => {...}
```

### ToFons

이 메서드는 지정된 Rigo 단위에서 주어진 숫자를 fons 단위로 변환합니다.

```ts
export const toFons = (number: Numbers, unit: RigoUnits): string => {...}
```

### ToChecksumAddress

이 메서드는 주소를 체크섬 주소로 변환합니다.

```ts
export const toChecksumAddress = (address: Address): string => {...}
```