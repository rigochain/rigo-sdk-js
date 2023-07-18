

export type HexString = string;
export type Bytes = Uint8Array | HexString;
export type Numbers = number | bigint | string | HexString;

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const TypedArray = Object.getPrototypeOf(Uint8Array);
