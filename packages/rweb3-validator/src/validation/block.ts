
import { BlockTags } from 'rweb3-types';
import { isUInt } from './numbers.js';

export const isBlockNumber = (value: string | number | bigint): boolean => isUInt(value);

/**
 * Returns true if the given blockNumber is 'latest', 'pending', 'earliest, 'safe' or 'finalized'
 */
export const isBlockTag = (value: string) => Object.values(BlockTags).includes(value as BlockTags);

/**
 * Returns true if given value is valid hex string and not negative, or is a valid BlockTag
 */
export const isBlockNumberOrTag = (value: string | number | bigint) =>
	isBlockTag(value as string) || isBlockNumber(value);
