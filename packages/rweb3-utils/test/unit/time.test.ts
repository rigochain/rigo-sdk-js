import Long from 'long';
import { fromNanoSecond, getNanoSecond } from '../../src/time';

describe('Timestamp conversion tests', () => {
    test('getNanoSecond without parameter', () => {
        const now = Date.now();
        const nano = getNanoSecond();
        // We can't directly compare the two since time has passed between the calls
        // but we can at least make sure they're within the same second.
        expect(nano.div(1000000000).toNumber()).toBeGreaterThanOrEqual(Math.floor(now / 1000));
    });

    test('getNanoSecond with parameter', () => {
        const now = new Date();
        const nano = getNanoSecond(now);
        expect(nano.toNumber()).toEqual(now.getTime() * 1000000);
    });

    test('fromNanoSecond', () => {
        const now = new Date();
        const nano = Long.fromNumber(now.getTime() * 1000000);
        const recovered = fromNanoSecond(nano);
        expect(recovered.getTime()).toEqual(now.getTime());
    });
});
