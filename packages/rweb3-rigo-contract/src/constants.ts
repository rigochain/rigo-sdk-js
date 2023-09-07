import { AbiEventFragment } from 'rweb3-types';

export const ALL_EVENTS = 'ALLEVENTS';
export const ALL_EVENTS_ABI = {
    name: ALL_EVENTS,
    signature: '',
    type: 'event',
    inputs: [],
} as AbiEventFragment & { signature: string };
