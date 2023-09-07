import { encodeErrorSignature } from '../../../src/api/errors_api';
import { validErrorsSignatures, invalidErrorSignatures } from '../../fixtures/data';

describe('errors_api', () => {
    describe('encodeErrorSignature', () => {
        describe('valid data', () => {
            it.each(validErrorsSignatures)(
                'should pass for valid values: %s',
                ({ input, output }) => {
                    expect(encodeErrorSignature(input)).toEqual(output);
                },
            );
        });

        describe('invalid data', () => {
            it.each(invalidErrorSignatures)(
                'should pass for valid values: %s',
                ({ input, output }) => {
                    expect(() => encodeErrorSignature(input)).toThrow(output);
                },
            );
        });
    });
});
