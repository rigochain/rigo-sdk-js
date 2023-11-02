# rweb3-utils uuid


---

## API Method - uuidV4

This function is used to generate a version 4 (random) UUID. The function is based on the [uuid](https://github.com/uuidjs/uuid/blob/main/src/v4.js#L5) package. 

### Signature

```typescript
export const uuidV4 = (): string
```

### Returns 

A version 4 UUID of the form `xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx`

### Example

```ts
console.log(rweb3.utils.uuidV4());
> "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed"
```

---

### Underlying Logic

The uuidV4 function generates a set of 16 random bytes using the `randomBytes` function.

The 7th byte is then manipulated such that its high nibble (half-byte) is set to `4`, which indicates a version 4 UUID. This is in accordance with Section 4.1.3 of the relevant specifications.

The 9th byte is then manipulated such that its high nibble is set to `8`, which is a variant for version 4 UUIDs. This manipulation is in accordance with Section 4.4 of the relevant specifications.

Finally, the function transforms the resulting bytes into a hexadecimal string and formats it into the conventional UUID format of `xxxxxxxx-xxxx-4xxx-yyyy-xxxxxxxxxxxx`. Each 'x' is a random hexadecimal digit, 'y' is a hexadecimal digit from the manipulated 9th byte.

**Make sure your linter is set to ignore the two explicit byte manipulations. This operation is intentional and necessary for the aforementioned functionality.**