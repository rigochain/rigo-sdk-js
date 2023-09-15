# rweb3-types bytes unit8array

## Overview 

This documentation refers to the `BytesUint8Array` class, developed by the Rigo Chain Developers team.


## Class Members

### `fromHex(hex: string)`

The `fromHex` static method accepts a hexadecimal string and returns a new instance of `BytesUint8Array` filled with byte values parsed from the string.

### `fromWords(w: cryptojs.lib.WordArray)`

`fromWords` is another static method taking a `crypto-js` `WordArray` and returning a BytesUint8Array populated with byte values extracted from the `WordArray`.

### `parse(d: any, enc: string)`

The `parse` static method is capable of parsing different encodings from a given object `d` based on the encoding provided `enc`. It currently supports `hex` and `words` encodings and will throw an error for unsupported encodings.

### `toHex()`

The `toHex` method converts instance's byte array into a lower-case hexadecimal string, which is then returned.

### `toWords()`

The `toWords` method converts this instance's byte array into a `crypto-js` `WordArray`, which is then returned.

### `isEqual(o: BytesUint8Array)`

The `isEqual` method compares this instance's byte array with another `BytesUint8Array` instance, `o`. Returns `true` if all bytes are same else, `false` is returned.

### `b64ToBytes(base64: string)`

The `b64ToBytes` static method enables to convert a base64 encoded string into a `BytesUint8Array` instance.

## Conclusion

This class can be utilized for handling binary data in terms of a hexadecimal string, raw bytes in `Uint8Array` format, or `WordArray` as used by `crypto-js`. Moreover, it can interpret base64 encoded strings and perform basic comparative operations on its instances. The code can run in both browser and Node.js environments.