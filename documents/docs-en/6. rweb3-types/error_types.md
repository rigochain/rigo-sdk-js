# rweb3-types error types

## Overview
The code mainly introduces an interface named `RWeb3Error` and a type alias `RWeb3ValidationErrorObject`.

## Interface: RWeb3Error
`RWeb3Error` extends the native `Error` interface. In addition to the regular properties, `RWeb3Error` has a `name` and `code` which are read-only.

The properties of `RWeb3Error` are
- `name: string`: The name of the error
- `code: number`: The code of the error
- `stack?: string`: The stack trace of the error (optional)

### Usage: 

```ts
let errorObj:RWeb3Error = {
    name: "Custom Error",
    code: 101
};
```

## Type: RWeb3ValidationErrorObject
`RWeb3ValidationErrorObject` is designed to hold validation error details.

It takes three generic parameters 
- `K`: Represents the type of `keyword` (default is `string`)
- `P`: Represents the type of `params` (default is an object)
- `S`: Represents the type of `schema` (default is `unknown`)

The properties of `RWeb3ValidationErrorObject` are:
- `keyword: K`: The keyword causing the validation error
- `instancePath: string`: The instance path of the error
- `schemaPath: string`: The schema path of the error
- `params: P`: Parameters mapping of the error
- `propertyName?: string`: Property name causing the error (only for "propertyNames" keyword schema)
- `message?: string`: Message of the error (excluded if option `messages` set to false)
- `schema?: S`: Schema of the error
- `data?: unknown`: Any related data of the error

### Usage: 

```ts
let validationError:RWeb3ValidationErrorObject = {
    keyword: "required",
    instancePath: "/info",
    schemaPath: "/definitions/info",
    params: { missingProperty: "title" },
    message: "is a required property"
};
```