
import { uint8ArrayConcat, uint8ArrayEquals } from '../../src/uint8array';
import { uint8ArrayConcatData, uint8ArrayEqualsValidData } from '../fixtures/uint8array';

describe('uint8Array utils', () => {
	describe('uint8ArrayConcat', () => {
		it.each(uint8ArrayConcatData)('%s', (input, output) => {
			expect(uint8ArrayConcat(...input)).toEqual(output);
		});
		describe('uint8ArrayConcat', () => {
			describe('cases', () => {
				it.each(uint8ArrayEqualsValidData)('%s', (input, output) => {
					expect(uint8ArrayEquals(input[0], input[1])).toEqual(output);
				});
			});
		});
	});
});
