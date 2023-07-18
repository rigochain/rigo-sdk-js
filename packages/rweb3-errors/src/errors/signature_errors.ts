

import { ERR_SIGNATURE_FAILED } from '../error_codes.js';
import { InvalidValueError } from '../web3_error_base.js';

export class SignatureError extends InvalidValueError {
	public code = ERR_SIGNATURE_FAILED;
}
