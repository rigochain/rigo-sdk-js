import { ReadonlyDateWithNanoseconds } from './responses.js';

/**
 * A runtime checker that ensures a given value is set (i.e. not undefined or null)
 *
 * This is used when you want to verify that data at runtime matches the expected type.
 */
export function assertSet<T>(value: T): T {
    if ((value as unknown) === undefined) {
        throw new Error('Value must not be undefined');
    }

    if ((value as unknown) === null) {
        throw new Error('Value must not be null');
    }

    return value;
}

/**
 * A runtime checker that ensures a given value is a boolean
 *
 * This is used when you want to verify that data at runtime matches the expected type.
 * This implies assertSet.
 */
export function assertBoolean(value: boolean): boolean {
    assertSet(value);
    if (typeof (value as unknown) !== 'boolean') {
        throw new Error('Value must be a boolean');
    }
    return value;
}

/**
 * A runtime checker that ensures a given value is a string.
 *
 * This is used when you want to verify that data at runtime matches the expected type.
 * This implies assertSet.
 */
export function assertString(value: string): string {
    assertSet(value);
    if (typeof (value as unknown) !== 'string') {
        throw new Error('Value must be a string');
    }
    return value;
}

/**
 * A runtime checker that ensures a given value is a number
 *
 * This is used when you want to verify that data at runtime matches the expected type.
 * This implies assertSet.
 */
export function assertNumber(value: number): number {
    assertSet(value);
    if (typeof (value as unknown) !== 'number') {
        throw new Error('Value must be a number');
    }
    return value;
}

/**
 * A runtime checker that ensures a given value is an array
 *
 * This is used when you want to verify that data at runtime matches the expected type.
 * This implies assertSet.
 */
export function assertArray<T>(value: readonly T[]): readonly T[] {
    assertSet(value);
    if (!Array.isArray(value as unknown)) {
        throw new Error('Value must be a an array');
    }
    return value;
}

/**
 * A runtime checker that ensures a given value is an object in the sense of JSON
 * (an unordered collection of key–value pairs where the keys are strings)
 *
 * This is used when you want to verify that data at runtime matches the expected type.
 * This implies assertSet.
 */
export function assertObject<T>(value: T): T {
    assertSet(value);
    if (typeof (value as unknown) !== 'object') {
        throw new Error('Value must be an object');
    }

    // Exclude special kind of objects like Array, Date or Uint8Array
    // Object.prototype.toString() returns a specified value:
    // http://www.ecma-international.org/ecma-262/7.0/index.html#sec-object.prototype.tostring
    if (Object.prototype.toString.call(value) !== '[object Object]') {
        throw new Error('Value must be a simple object');
    }

    return value;
}

interface Lengther {
    readonly length: number;
}

/**
 * Throws an error if value matches the empty value for the
 * given type (array/string of length 0, number of value 0, ...)
 *
 * Otherwise returns the value.
 *
 * This implies assertSet
 */
export function assertNotEmpty<T>(value: T): T {
    assertSet(value);

    if (typeof value === 'number' && value === 0) {
        throw new Error('must provide a non-zero value');
    } else if ((value as any as Lengther).length === 0) {
        throw new Error('must provide a non-empty value');
    }
    return value;
}

// may will run the transform if value is defined, otherwise returns undefined
export function may<T, U>(transform: (val: T) => U, value: T | null | undefined): U | undefined {
    return value === undefined || value === null ? undefined : transform(value);
}

export function dictionaryToStringMap(obj: Record<string, unknown>): Map<string, string> {
    const out = new Map<string, string>();
    for (const key of Object.keys(obj)) {
        const value = obj[key];
        if (typeof value !== 'string') {
            throw new Error('Found dictionary value of type other than string');
        }
        out.set(key, value);
    }
    return out;
}

// Encodings needed for hashing block headers
// Several of these functions are inspired by https://github.com/nomic-io/js-tendermint/blob/tendermint-0.30/src/

// See https://github.com/tendermint/go-amino/blob/v0.15.0/encoder.go#L193-L195
export function encodeString(s: string): Uint8Array {
    const utf8 = toUtf8(s);
    return Uint8Array.from([utf8.length, ...utf8]);
}

// See https://github.com/tendermint/go-amino/blob/v0.15.0/encoder.go#L79-L87
export function encodeUvarint(n: number): Uint8Array {
    return n >= 0x80
        ? // eslint-disable-next-line no-bitwise
          Uint8Array.from([(n & 0xff) | 0x80, ...encodeUvarint(n >> 7)])
        : // eslint-disable-next-line no-bitwise
          Uint8Array.from([n & 0xff]);
}

// See https://github.com/tendermint/go-amino/blob/v0.15.0/encoder.go#L134-L178
export function encodeTime(time: ReadonlyDateWithNanoseconds): Uint8Array {
    const milliseconds = time.getTime();
    const seconds = Math.floor(milliseconds / 1000);
    const secondsArray = seconds ? [0x08, ...encodeUvarint(seconds)] : new Uint8Array();
    const nanoseconds = (time.nanoseconds || 0) + (milliseconds % 1000) * 1e6;
    const nanosecondsArray = nanoseconds ? [0x10, ...encodeUvarint(nanoseconds)] : new Uint8Array();
    return Uint8Array.from([...secondsArray, ...nanosecondsArray]);
}

// See https://github.com/tendermint/go-amino/blob/v0.15.0/encoder.go#L180-L187
export function encodeBytes(bytes: Uint8Array): Uint8Array {
    // Since we're only dealing with short byte arrays we don't need a full VarBuffer implementation yet
    if (bytes.length >= 0x80)
        throw new Error('Not implemented for byte arrays of length 128 or more');
    return bytes.length ? Uint8Array.from([bytes.length, ...bytes]) : new Uint8Array();
}

declare const TextEncoder: any;
declare const TextDecoder: any;

export function toUtf8(str: string): Uint8Array {
    return new TextEncoder().encode(str);
}

/**
 * Takes UTF-8 data and decodes it to a string.
 *
 * In lossy mode, the replacement character � is used to substitude invalid
 * encodings. By default lossy mode is off and invalid data will lead to exceptions.
 */
export function fromUtf8(data: Uint8Array, lossy = false): string {
    const fatal = !lossy;
    return new TextDecoder('utf-8', { fatal }).decode(data);
}
