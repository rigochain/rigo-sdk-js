# Rigo Chain - RWeb3DeferredPromiseInterface

## RWeb3DeferredPromiseInterface

This is an interface extending the `Promise<T>` that adds custom functionalities to help manage deferred promises more easily.

```typescript
export interface RWeb3DeferredPromiseInterface<T> extends Promise<T> {
    state: 'pending' | 'fulfilled' | 'rejected';
    resolve(value: T | PromiseLike<T>): void;
    reject(reason?: unknown): void;
    startTimer(): void;
}
```

## Properties

### `state`

The `state` property can hold any of the following values: `'pending' | 'fulfilled' | 'rejected'`. This property stores the current status of the Promise.

## Methods

### `resolve(value: T | PromiseLike<T>)`

This method sets the Promise as resolved with the given value which can either be of type `T` or a `PromiseLike<T>`.

### `reject(reason?: unknown)`

This method sets the Promise as rejected and optionally takes a reason parameter for the rejection.

### `startTimer()`

This method starts a timer for the Promise. This can be used for setting timeouts or similar functionality.