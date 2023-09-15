# rweb3-utils web3 deferred promise


The `RWeb3DeferredPromise` class is an implementation of a deferred promise which includes optional timeout functionality. This can be useful for managing asynchronous tasks.

## Class Description 

### Constructor

The constructor for this class can be called with the following parameters:

- `timeout` (optional): The timeout in milliseconds.
- `eagerStart` (optional): If set to true, the timer starts as soon as the promise is created.
- `timeoutMessage` (optional): The message to include in the timeout error that is thrown when the promise times out.

### Properties

- `state`: Returns the current state of the promise, which can be 'pending', 'fulfilled', or 'rejected'.

### Methods

#### then

This method is defined with the following parameters:

- `onfulfilled` (optional): The callback to execute when the promise is fulfilled.
- `onrejected` (optional): The callback to execute when the promise is rejected.

This method returns a Promise.

#### catch

This method is defined with the following parameter:

- `onrejected` (optional): The callback to execute when the promise is rejected.

This method returns a Promise.

#### finally

This method is defined with the following parameter:

- `onfinally` (optional): The callback to execute when the promise is settled (fulfilled or rejected).

This method returns a Promise.

#### resolve

This method resolves the current promise with the provided `value`.

#### reject

This method rejects the current promise with the provided `reason`.

#### startTimer

This method starts the timeout timer for the promise.

---

The functionality of `RWeb3DeferredPromise` also includes handling the timeout for promises, verifying the timeout, and clearing the timeout when the promise is either resolved or rejected.