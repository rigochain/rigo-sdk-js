
import { TypedArray } from 'rweb3-types';

// Explicitly check for the
// eslint-disable-next-line @typescript-eslint/ban-types
export const isNullish = (item: unknown): item is undefined | null =>
	// Using "null" value intentionally for validation
	// eslint-disable-next-line no-null/no-null
	item === undefined || item === null;

export const isObject = (item: unknown): item is Record<string, unknown> =>
	typeof item === 'object' &&
	!isNullish(item) &&
	!Array.isArray(item) &&
	!(item instanceof TypedArray);
