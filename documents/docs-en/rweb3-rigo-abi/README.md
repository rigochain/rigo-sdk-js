# Rigo Chain rweb3-rigo-abi Documentation

Rigo Chain ABI modules offer an extensive set of tools tailored for interacting with blockchain smart contracts. By bridging the gap between human-readable contract definitions and machine-level instructions, our ABI tools ensure seamless, accurate, and efficient communication with the Ethereum Virtual Machine (EVM).

## Core Functions

### ABI Fragment Validations

- **isAbiFragment(item):** Validates if an item qualifies as an AbiFragment.
- **isAbiErrorFragment(item):** Ensures the item is an AbiEventFragment and is of the 'error' type.
- **isAbiEventFragment(item):** Confirms the item as an AbiEventFragment.
- **isAbiFunctionFragment(item):** Verifies the item as an AbiFunctionFragment.
- **isAbiConstructorFragment(item):** Validates the item as an AbiConstructorFragment.

### ABI Struct Handling

- **isSimplifiedStructFormat(type):** Determines if a given type uses a simplified struct format.
- **mapStructNameAndType(structName):** Maps struct name and type when a simplified format is used.
- **mapStructToCoderFormat(struct):** Transforms a simplified struct format to the format expected by the ABICoder.

### Parameter Management

- **mapTypes(types):** Adapts the types of inputs if a simplified format is chosen.
- **isOddHexstring(param):** Checks if a hexstring is of odd length, essential for certain Ethereum operations.
- **formatOddHexstrings(param):** Converts odd-length bytes to even-length, ensuring data integrity.
- **formatParam(type, _param):** Standardizes parameter formatting, maintaining backward compatibility with Ethers V4.
- **modifyParams(coder, param):** Adjusts parameters as needed.

### ABI Utility Functions

- **flattenTypes(includeTuple, puts):** Converts JSON ABI inputs/outputs into a concise array of type-strings.
- **jsonInterfaceMethodToString(json):** Generates a complete function/event name using the JSON ABI.

## Rigo Chain AbiCoder: A Deep Dive

The `Rigo Chain AbiCoder` is a cornerstone module, meticulously designed to encode and decode contract parameters.

### Encoding Functions

- **encodeParameters(abi, params):** Transforms contract data into a hexadecimal string based on the ABI specification.

  \```typescript
  encodeParameters(abi: ReadonlyArray<AbiInput>, params: unknown[]): string
  \```

- **encodeParameter(abi, param):** Encodes individual parameters to hexadecimal.

  \```typescript
  encodeParameter(abi: AbiInput, param: unknown): string
  \```

### Decoding Functions

- **decodeParametersWith(abis, bytes, loose):** Decodes encoded data, allowing for flexible type rules.

  \```typescript
  decodeParametersWith(abis: AbiInput[], bytes: HexString, loose: boolean):
  { [key: string]: unknown; __length__: number }
  \```

- **decodeParameters(abi, bytes):** Provides stricter type rules when decoding and offers the number of decoded parameters.

  \```typescript
  decodeParameters(abi: AbiInput[], bytes: HexString):
  { [key: string]: unknown; __length__: number }
  \```

- **decodeParameter(abi, bytes):** Targets the decoding of individual parameters.

  \```typescript
  decodeParameter(abi: AbiInput, bytes: HexString): unknown
  \```

## Rigo Chain ABI Encoding Techniques

Rigo Chain encapsulates the intricate process of transforming contract interfaces and values for on-chain execution.

### Function Signatures

- **encodeFunctionSignature(functionName):** Produces a Keccak-256 hash from a function's signature.

  \```typescript
  encodeFunctionSignature(functionName: string | AbiFunctionFragment): string;
  \```

### Function Calls

- **encodeFunctionCall(jsonInterface, params):** Combines an encoded function signature with encoded parameters for on-chain function invocation.

  \```typescript
  encodeFunctionCall(jsonInterface: AbiFunctionFragment, params: unknown[]): string;
  \```

For a deeper understanding of ABI operations, we recommend the Ethereum Solidity's [ABI specifications](https://docs.soliditylang.org/en/v0.5.3/abi-spec.html).
