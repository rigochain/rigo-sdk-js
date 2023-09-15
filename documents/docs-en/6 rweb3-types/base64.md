# rweb3-types base64

This library includes functionality for encoding and decoding data through the Base64 algorithm. This robust solution is applicable across a wide range of setups due to its design and implementation.

## Methods

There are two main methods available in this library which are discussed with examples in detail below:

### toBase64 Method:
This method encodes data to a Base64 string.

Example Useage: 

```typescript
let data = Uint8Array([values here]);
let base64String = toBase64(data);
```

### fromBase64 Method:
This method decodes Base64 strings back to data.

Example Useage: 

```typescript
let base64String = "Base64 string here";
let data = fromBase64(base64String);
```
If the provided string is not a valid Base64 string, it will throw an "Invalid base64 string format" error.
