

// eslint-disable-next-line max-classes-per-file
import {
	JsonRpcError,
	JsonRpcPayload,
	JsonRpcResponse,
	JsonRpcResponseWithError,
} from 'rweb3-types';
import { BaseWeb3Error } from '../web3_error_base.js';
import { ERR_INVALID_RESPONSE, ERR_RESPONSE } from '../error_codes.js';

// To avoid circular package dependency, copied to code here. If you update this please update same function in `json_rpc.ts`
const isResponseWithError = <Error = unknown, Result = unknown>(
	response: JsonRpcResponse<Result, Error>,
): response is JsonRpcResponseWithError<Error> =>
	!Array.isArray(response) &&
	response.jsonrpc === '2.0' &&
	!!response &&
	// eslint-disable-next-line no-null/no-null
	(response.result === undefined || response.result === null) &&
	// JSON RPC consider "null" as valid response
	'error' in response &&
	(typeof response.id === 'number' || typeof response.id === 'string');

const buildErrorMessage = (response: JsonRpcResponse<unknown, unknown>): string =>
	isResponseWithError(response) ? response.error.message : '';

export class ResponseError<ErrorType = unknown, RequestType = unknown> extends BaseWeb3Error {
	public code = ERR_RESPONSE;
	public data?: ErrorType | ErrorType[];
	public request?: JsonRpcPayload<RequestType>;

	public constructor(
		response: JsonRpcResponse<unknown, ErrorType>,
		message?: string,
		request?: JsonRpcPayload<RequestType>,
	) {
		super(
			message ??
				`Returned error: ${
					Array.isArray(response)
						? response.map(r => buildErrorMessage(r)).join(',')
						: buildErrorMessage(response)
				}`,
		);

		if (!message) {
			this.data = Array.isArray(response)
				? response.map(r => r.error?.data as ErrorType)
				: response?.error?.data;
		}

		this.request = request;
	}

	public toJSON() {
		return { ...super.toJSON(), data: this.data, request: this.request };
	}
}

export class InvalidResponseError<ErrorType = unknown, RequestType = unknown> extends ResponseError<
	ErrorType,
	RequestType
> {
	public constructor(
		result: JsonRpcResponse<unknown, ErrorType>,
		request?: JsonRpcPayload<RequestType>,
	) {
		super(result, undefined, request);
		this.code = ERR_INVALID_RESPONSE;

		let errorOrErrors: JsonRpcError | JsonRpcError[] | undefined;
		if (`error` in result) {
			errorOrErrors = result.error as JsonRpcError;
		} else if (result instanceof Array) {
			errorOrErrors = result.map(r => r.error) as JsonRpcError[];
		}

		// @ts-ignore
		this.innerError = errorOrErrors as Error | Error[] | undefined;
	}
}
