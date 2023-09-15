# Rigo Chain Documentation

This document provides an overview of the Rigo Chain code and its export types, enums, and constants.

## Exported Enums

### FMT_NUMBER 

It has the following fields:

- NUMBER_NUMBER
- NUMBER_HEX
- NUMBER_STR
- NUMBER_BIGINT

### FMT_BYTES

It has the following fields:

- BYTES_HEX
- BYTES_UINT8ARRAY

-----------

## Exported Types

### NumberTypes

A type which assigns a data type to each of the `FMT_NUMBER` enum fields.

Field | Data Type 
--- | --- 
NUMBER | Number
HEX | HexString
STR | String
BIGINT | BigInt

### ByteTypes

A type which assigns a data type to each of the `FMT_BYTES` enum fields.

Field | Data Type 
--- | --- 
HEX | HexString
UINT8ARRAY | Uint8Array

### DataFormat

An object with two readonly fields:

- `number` of type `FMT_NUMBER`
- `bytes` of type `FMT_BYTES`

### FormatType

A complex type that depends on other types. It's designed for providing a format for an unknown data type T.

-----------

## Exported constants

- `DEFAULT_RETURN_FORMAT`: an object with `number` set to `FMT_NUMBER.BIGINT` and `bytes` set to `FMT_BYTES.HEX`.
- `RIGO_DATA_FORMAT`: an object with `number` set to `FMT_NUMBER.HEX` and `bytes` set to `FMT_BYTES.HEX`.