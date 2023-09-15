# rweb3-utils formatter

This documentation describes a set of conversion and formatting utilities developed for the Rigo Chain.

## Node Modules

This project depends on the following modules:

- `@rigochain/rweb3-errors`
- `@rigochain/rweb3-types`
- `@rigochain/rweb3-validator`
- local functions from `converters.js`, `objects.js`, `string_manipulation.js`, and `uint8array.js`.

## Utility Functions

This code includes a multitude of useful conversion and formatting functions for standard and scalar data types:

- `isDataFormat(dataFormat: unknown): dataFormat is DataFormat` - Checks if a value is a valid `DataFormat`.

- `findSchemaByDataPath(schema: JsonSchema, dataPath: string[], oneOfPath: [string, number][]): JsonSchema | undefined` - Finds the schema that corresponds to a specific data path within a larger  JSON schema.

- `convertScalarValue(value: unknown, ethType: string, format: DataFormat): unknown` - Converts a scalary value depending on the given format.

- `convert(data: Record<string, unknown> | unknown[] | unknown, schema: JsonSchema, dataPath: string[], format: DataFormat, oneOfPath: [string, number][]): Record<string, unknown> | unknown[] | unknown` - Converts data according to the provided schema, data path, format, and "oneOf" path.

- `format<DataType, ReturnType>(schema: ValidationSchemaInput | JsonSchema, data: DataType, returnFormat: ReturnType): FormatType<DataType, ReturnType>` - Takes a validation schema, data, and return format to parse and format it accordingly.
    
    Based on the type of data, it leverages `isObject` and `isArray` for object and array-type data, and uses the pre-defined utility functions such as `mergeDeep`, `rigoAbiToJsonSchema`, and `convert` to parse and convert the data.

## Commentary

Be mindful that potential limitations may occur with the approach to handling schemas with `oneOf`. Additionally, special attention should be given to `BlockSchema.transactions` as they are not being formatted currently. More refinement in the implementation or a more robust method may be needed for handling these situations. For more detailed use and understanding, review the code comments within the module.