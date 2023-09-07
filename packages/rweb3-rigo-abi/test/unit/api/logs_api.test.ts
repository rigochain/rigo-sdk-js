import { decodeLog } from '../../../src/api/logs_api';
import { validDecodeLogsData } from '../../fixtures/data';

describe('logs_api', () => {
    describe('decodeLog', () => {
        describe('valid data', () => {
            it.each(validDecodeLogsData)(
                'should pass for valid values: %j',
                ({ input: { abi, data, topics }, output }) => {
                    const expected = decodeLog(abi, data, topics);
                    expect(JSON.parse(JSON.stringify(expected))).toEqual(output);
                },
            );
        });
    });
});
