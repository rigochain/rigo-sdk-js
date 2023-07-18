
import { ValidInputTypes } from '../types.js';
import { hexToUint8Array, parseBaseType } from '../utils.js';
import { isHexStrict } from './string.js';

/**
 * checks input if typeof data is valid Uint8Array input
 */
export const isUint8Array = (data: ValidInputTypes) => data instanceof Uint8Array;

export const isBytes = (
	value: ValidInputTypes | Uint8Array | number[],
	options: { abiType: string; size?: never } | { size: number; abiType?: never } = {
		abiType: 'bytes',
	},
) => {
	if (typeof value !== 'string' && !Array.isArray(value) && !(value instanceof Uint8Array)) {
		return false;
	}

	// isHexStrict also accepts - prefix which can not exists in bytes
	if (typeof value === 'string' && isHexStrict(value) && value.startsWith('-')) {
		return false;
	}

	if (typeof value === 'string' && !isHexStrict(value)) {
		return false;
	}

	let valueToCheck: Uint8Array;

	if (typeof value === 'string') {
		if (value.length % 2 !== 0) {
			// odd length hex
			return false;
		}
		valueToCheck = hexToUint8Array(value);
	} else if (Array.isArray(value)) {
		if (value.some(d => d < 0 || d > 255 || !Number.isInteger(d))) {
			return false;
		}
		valueToCheck = new Uint8Array(value);
	} else {
		valueToCheck = value;
	}

	if (options?.abiType) {
		const { baseTypeSize } = parseBaseType(options.abiType);

		return baseTypeSize ? valueToCheck.length === baseTypeSize : true;
	}

	if (options?.size) {
		return valueToCheck.length === options?.size;
	}

	return true;
};
