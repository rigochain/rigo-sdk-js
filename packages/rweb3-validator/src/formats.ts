import { Filter } from 'rweb3-types';
import { ValidInputTypes } from './types.js';
import { isAddress } from './validation/address.js';
import { isBlockNumber,isBlockNumberOrTag,
	isBlockTag, } from './validation/block.js';
import { isBloom } from './validation/bloom.js';
import { isBoolean } from './validation/boolean.js';
import { isBytes } from './validation/bytes.js';
import { isFilterObject } from './validation/filter.js';
import { isHexStrict, isString } from './validation/string.js';
import { isNumber, isInt, isUInt } from './validation/numbers.js';

const formats: { [key: string]: (data: unknown) => boolean } = {
	address: (data: unknown) => isAddress(data as ValidInputTypes),
	bloom: (data: unknown) => isBloom(data as ValidInputTypes),
	blockNumber: (data: unknown) => isBlockNumber(data as string | number | bigint),
	blockTag: (data: unknown) => isBlockTag(data as string),
	blockNumberOrTag: (data: unknown) => isBlockNumberOrTag(data as string | number | bigint),
	bool: (data: unknown) => isBoolean(data as ValidInputTypes),
	bytes: (data: unknown) => isBytes(data as ValidInputTypes | Uint8Array | number[]),
	filter: (data: unknown) => isFilterObject(data as Filter),
	hex: (data: unknown) => isHexStrict(data as ValidInputTypes),
	uint: (data: unknown) => isUInt(data as ValidInputTypes),
	int: (data: unknown) => isInt(data as ValidInputTypes),
	number: (data: unknown) => isNumber(data as ValidInputTypes),
	string: (data: unknown) => isString(data as ValidInputTypes),
};
// generate formats for all numbers types
for (let i = 3; i <= 8; i += 1) {
	const bitSize = 2 ** i;
	formats[`int${bitSize}`] = data => isInt(data as ValidInputTypes, { bitSize });
	formats[`uint${bitSize}`] = data => isUInt(data as ValidInputTypes, { bitSize });
}
// generate bytes
for (let size = 1; size <= 32; size += 1) {
	formats[`bytes${size}`] = data =>
		isBytes(data as ValidInputTypes | Uint8Array | number[], { size });
}

export default formats;
