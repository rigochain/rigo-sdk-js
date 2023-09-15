# Rigo Chain Developers Code Documentation

## How to Use

This library provides tools to handle integer values coming from the Tendermint RPC API and to send compatible responses. 

### `apiToSmallInt(input: string | number): number`

This function receives an integer value from the Tendermint RPC API and returns it as a number. 

This operation only works within the safe integer range. If the input is a number, the function will cast it into a JavaScript integer object using an `Int53` constructor, and then return it. If the input is a string, the function will convert it into a JavaScript integer object using `Int53.fromString(input)`, and then return it.

### `apiToBigInt(input: string): bigint`

This function receives an integer value from the Tendermint RPC API in string format and returns it as a BigInt.

For safety reasons, the string must match the regular expression `^-?[0-9]+$`, otherwise an error is thrown. This supports the full `uint64` and `int64` ranges.

### `smallIntToApi(num: number): string`

This function receives an integer in the safe integer range and returns a string representation of it. This is used to prepare data for a response to the Tendermint RPC API. It initializes a new JavaScript integer object `Int53(num)` and then converts it into a string.

Please note that while the function signatures are TypeScript's, they work equally well in JavaScript environments.