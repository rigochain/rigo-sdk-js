# Production Release Documentation

## Functions
Here's a list of available functions:

### `assertSet(value: T): T`
A runtime checker that ensures a given value is set (i.e. not undefined or null). This is used when you want to verify that data at runtime matches the expected type.

### `assertBoolean(value: boolean): boolean`
A runtime checker that ensures a given value is a boolean. If a value is not boolean, an Error is thrown. This implies `assertSet`.

### `assertString(value: string): string`
A runtime checker that ensures a given value is a string. If a value is not a string, an Error is thrown. This implies `assertSet`.

### `assertNumber(value: number): number`
A runtime checker that ensures a given value is a number. If a value is not a number, an Error is thrown. This implies `assertSet`.

### `assertArray(value: readonly T[]): readonly T[]`
A runtime checker that ensures a given value is an array. If a value is not an array, an Error is thrown. This implies `assertSet`.

### `assertObject(value: T): T`
A runtime checker that ensures a given value is an object in the sense of JSON (an unordered collection of key–value pairs where the keys are strings). If a value is not an object, an Error is thrown. This implies `assertSet`.

### `assertNotEmpty(value: T): T`
Throws an error if value matches the empty value for the given type (array/string of length 0, number of value 0, ...). Otherwise, it returns the value. This implies `assertSet`.

### `may(transform: (val: T) => U, value: T | null | undefined): U | undefined`
This function will run the transform if value is defined, otherwise returns undefined.

### `dictionaryToStringMap(obj: Record<string, unknown>): Map<string, string>`
This function converts a dictionary to a map of strings.

### `encodeString(s: string): Uint8Array`
This function is used to encode a string into Uint8Array.

### `encodeUvarint(n: number): Uint8Array`
This function is used to encode a `uvarint` to a `Uint8Array`.

### `encodeTime(time: ReadonlyDateWithNanoseconds): Uint8Array`
This function encodes time (in `ReadonlyDateWithNanoseconds` format) into Uint8Array.

### `encodeBytes(bytes: Uint8Array): Uint8Array`
This function allows you to encode a byte array into a Uint8Array.

### `toUtf8(str: string): Uint8Array`
This function is used to encode a string to UTF-8 data.

### `fromUtf8(data: Uint8Array, lossy = false): string`
This function decodes UTF-8 data back to a string. In lossy mode, the replacement character � is used to substitute invalid encodings. By default, lossy mode is off and invalid data will lead to exceptions.
