# Documentation

The following functions are available in this module:

## uint8ArrayConcat(...parts: Uint8Array[]): Uint8Array

This function is used to concatenate multiple Uint8Array variables to create a new Uint8Array.

### Parameters 

- `parts` (Array of Uint8Array): The Uint8Arrays that you want to concatenate.

### Returns

Uint8Array: A new Uint8Array which is a concatenation of the input Uint8Arrays.

## uint8ArrayEquals(a: Uint8Array, b: Uint8Array): boolean

This function checks if two Uint8Array variables (`a` and `b`) have the same content and returns a boolean indicating the comparison result.

### Parameters 

- `a` (Uint8Array): The first Uint8Array.
- `b` (Uint8Array): The second Uint8Array.

### Returns

boolean: Whether the content of two Uint8Arrays is equal.

## hexStringToUint8Array(hexString: string): Uint8Array

This function converts a hex string `hexString` into a Uint8Array.

### Parameters 

- `hexString` (string): The hex string you want to convert.

### Returns

Uint8Array: The Uint8Array formed by converting the hex string.

