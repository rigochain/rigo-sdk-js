# Rigo Chain Developers

## Functions

**assert Function**

The function checks whether the condition is truthy. It throws an error when the condition fails.

```typescript
export function assert(condition: any, msg?: string): asserts condition {
    if (!condition) {
        throw new Error(msg || 'condition is not truthy');
    }
}
```

**assertDefined Function**

The function checks whether the value is defined. It throws an error when the value is undefined.

```typescript
export function assertDefined<T>(value: T | undefined, msg?: string): asserts value is T {
    if (value === undefined) {
        throw new Error(msg ?? 'value is undefined');
    }
}
```

**assertDefinedAndNotNull Function**

The function checks whether the value is defined and not null. It throws an error when the value is undefined or null.

```typescript
export function assertDefinedAndNotNull<T>(
    value: T | undefined | null,
    msg?: string,
): asserts value is T {
    if (value === undefined || value === null) {
        throw new Error(msg ?? 'value is undefined or null');
    }
}
```
