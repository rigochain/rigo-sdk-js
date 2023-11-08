# rweb3-utils random

## randomBytes Function

The `randomBytes` function returns a random byte array given the size of the array in bytes.

__Parameters:__

- `size (Number)`: The size of the random byte array returned

__Returns:__

- `Uint8Array`: generated random byte array

__Example__

```javascript
console.log(rweb3.utils.randomBytes(32));
//Output: Uint8Array(32) [
// 93, 172, 226,  32,  33, 176, 156, 156,
// 182,  30, 240,   2,  69,  96, 174, 197,
// 33, 136, 194, 241, 197, 156, 110, 111,
// 66,  87,  17,  88,  67,  48, 245, 183
//]
```

## randomHex Function

The `randomHex` function returns a random hexadecimal string given the size of the string in Bytes.

__Parameters:__

- `byteSize (Number)`: The size of the random hex string returned

__Returns:__

- `String`: random hex string

__Example__

```javascript
console.log(RWeb3.utils.randomHex(32));
//Output: 0x139f5b88b72a25eab053d3b57fe1f8a9dbc62a526b1cb1774d0d7db1c3e7ce9e
```