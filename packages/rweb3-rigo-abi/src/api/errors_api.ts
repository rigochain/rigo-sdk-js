import { sha3Raw } from 'web3-utils';
import { AbiError } from 'web3-errors';
import { AbiErrorFragment } from 'web3-types';
import { jsonInterfaceMethodToString, isAbiErrorFragment } from '../utils.js';

/**
 * Encodes the error name to its ABI signature, which are the sha3 hash of the error name including input types.
 */
export const encodeErrorSignature = (functionName: string | AbiErrorFragment): string => {
    if (typeof functionName !== 'string' && !isAbiErrorFragment(functionName)) {
        throw new AbiError('Invalid parameter value in encodeErrorSignature');
    }

    let name: string;

    if (functionName && (typeof functionName === 'function' || typeof functionName === 'object')) {
        name = jsonInterfaceMethodToString(functionName);
    } else {
        name = functionName;
    }

    return sha3Raw(name);
};
