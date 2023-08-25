import { mergeDeep } from '../../src/objects';
import { mergeDeepData } from '../fixtures/objects';

describe('objects', () => {
    describe('mergeDeep', () => {
        it.each(mergeDeepData)('$message', ({ destination, sources, output }) => {
            mergeDeep(destination, ...sources);

            expect(destination).toEqual(output);
        });

        it('should not mutate the sources', () => {
            const before = { a: undefined, b: true, c: new Uint8Array([1, 2, 3]) };
            const result = mergeDeep({}, before, {
                a: 3,
                d: 'string',
                e: { nested: BigInt(4) },
            }) as any;

            expect(before.a).toBeUndefined();
            expect(result.b).toBe(true);
            expect(result.c).toEqual(new Uint8Array([1, 2, 3]));
        });

        it('should not overwrite if undefined', () => {
            const result = mergeDeep(
                {},
                { a: undefined, b: true, c: new Uint8Array([1, 2, 3]), f: 99 },
                { a: 3, d: 'string', e: { nested: BigInt(4) }, f: undefined },
            ) as any;

            expect(result.a).toBe(3);
            expect(result.b).toBe(true);
            expect(result.c).toEqual(new Uint8Array([1, 2, 3]));
            expect(result.d).toBe('string');
            expect(result.e).toEqual({ nested: BigInt(4) });
            expect(result.f).toBe(99);
        });

        it('should not merge array values', () => {
            const result = mergeDeep({}, { a: [1, 2] }, { a: [3, 4], b: [4, 5] }) as any;

            expect(result.a).toStrictEqual([3, 4]);
            expect(result.b).toStrictEqual([4, 5]);
        });

        it('should not merge typed array values', () => {
            const result = mergeDeep(
                {},
                { a: new Uint8Array([1, 2]) },
                { a: new Uint8Array([3, 4]), b: new Uint8Array([4, 5]) },
            ) as any;

            expect(result.a).toStrictEqual(new Uint8Array([3, 4]));
            expect(result.b).toStrictEqual(new Uint8Array([4, 5]));
        });

        it('should duplicate array values', () => {
            const data = { a: new Uint8Array([1, 2]) };
            const result = mergeDeep({}, data) as any;

            // Mutate source object
            data.a[0] = 3;

            expect(result.a).toStrictEqual(new Uint8Array([1, 2]));
        });
    });
});
