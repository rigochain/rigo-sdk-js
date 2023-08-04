
import {
	isResponseWithResult,
	isResponseWithError,
	isResponseWithNotification,
	isSubscriptionResult,
	isValidResponse,
	isBatchResponse,
	toPayload,
} from '../../src/json_rpc';
import {
	isResponseWithResultValidTest,
	isResponseWithErrorValidTest,
	isResponseWithNotificationValidTest,
	isSubscriptionResultValidTest,
	toPayloadValidTest,
	isValidResponseValidTest,
	isBatchResponseValidTest,
} from '../fixtures/json_rpc';

describe('json rpc tests', () => {
	describe('isResponseWithResult', () => {
		describe('valid cases', () => {
			it.each(isResponseWithResultValidTest)('%s', (input, output) => {
				const result = isResponseWithResult(input);
				expect(result).toBe(output);
			});
		});
	});
	describe('isResponseWithError', () => {
		describe('valid cases', () => {
			it.each(isResponseWithErrorValidTest)('should error', (input, output) => {
				const result = isResponseWithError(input);
				expect(result).toBe(output);
			});
		});
	});
	describe('isResponseWithNotification', () => {
		describe('valid cases', () => {
			it.each(isResponseWithNotificationValidTest)('should have notify', (input, output) => {
				const result = isResponseWithNotification(input);
				expect(result).toBe(output);
			});
		});
	});
	describe('isSubscriptionResult', () => {
		describe('valid cases', () => {
			it.each(isSubscriptionResultValidTest)('subscription valid test', (input, output) => {
				const result = isSubscriptionResult(input);
				expect(result).toBe(output);
			});
		});
	});
	describe('isValidResponse', () => {
		describe('valid cases', () => {
			it.each(isValidResponseValidTest)('isValidresponse valid test', (input, output) => {
				const result = isValidResponse(input);
				expect(result).toBe(output);
			});
		});
	});
	describe('isBatchResponseValid', () => {
		describe('valid cases', () => {
			it.each(isBatchResponseValidTest)('isValidresponse valid test', (input, output) => {
				const result = isBatchResponse(input);
				expect(result).toBe(output);
			});
		});
	});
	describe('toPayloadValid', () => {
		describe('valid cases', () => {
			it.each(toPayloadValidTest)('isValidresponse valid test', (input, output) => {
				const result = toPayload(input);
				expect(result).toStrictEqual(output);
			});
		});
	});
});
