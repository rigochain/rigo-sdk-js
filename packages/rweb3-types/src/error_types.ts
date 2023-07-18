

export interface Web3Error extends Error {
	readonly name: string;
	readonly code: number;
	readonly stack?: string;
}

export type Web3ValidationErrorObject<
	K extends string = string,
	P = Record<string, any>,
	S = unknown,
> = {
	keyword: K;
	instancePath: string;
	schemaPath: string;
	params: P;
	// Added to validation errors of "propertyNames" keyword schema
	propertyName?: string;
	// Excluded if option `messages` set to false.
	message?: string;
	schema?: S;
	data?: unknown;
};
