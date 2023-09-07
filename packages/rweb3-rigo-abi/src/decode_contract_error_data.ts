import { Eip838ExecutionError } from 'rweb3-errors';
import { AbiErrorFragment } from 'rweb3-types';

import { encodeErrorSignature } from './api/errors_api.js';
import { decodeParameters } from './api/parameters_api.js';
import { jsonInterfaceMethodToString } from './utils.js';

export const decodeContractErrorData = (
    errorsAbi: AbiErrorFragment[],
    error: Eip838ExecutionError,
) => {
    if (error?.data) {
        let errorName: string | undefined;
        let errorSignature: string | undefined;
        let errorArgs: { [K in string]: unknown } | undefined;
        try {
            const errorSha = error.data.slice(0, 10);
            const errorAbi = errorsAbi.find((abi) =>
                encodeErrorSignature(abi).startsWith(errorSha),
            );

            if (errorAbi?.inputs) {
                errorName = errorAbi.name;
                errorSignature = jsonInterfaceMethodToString(errorAbi);
                // decode abi.inputs according to EIP-838
                errorArgs = decodeParameters([...errorAbi.inputs], error.data.substring(10));
            }
        } catch (err) {
            console.error(err);
        }
        if (errorName) {
            error.setDecodedProperties(errorName, errorSignature, errorArgs);
        }
    }
};
