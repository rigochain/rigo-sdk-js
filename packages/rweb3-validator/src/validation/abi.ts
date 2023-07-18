
import { AbiParameter } from 'rweb3-types';
import { ShortValidationSchema } from '../types';

export const isAbiParameterSchema = (
	schema: string | ShortValidationSchema | AbiParameter,
): schema is AbiParameter => typeof schema === 'object' && 'type' in schema && 'name' in schema;
