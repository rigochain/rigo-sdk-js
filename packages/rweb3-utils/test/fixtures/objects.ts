/*
    Copyright 2023 All Rigo Chain Developers

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/
export const mergeDeepData: {
    message: string;
    destination: Record<string, unknown>;
    sources: Record<string, unknown>[];
    output: Record<string, unknown>;
}[] = [
    {
        message: 'multiple sources',
        destination: {},
        sources: [
            { a: undefined, b: true, c: new Uint8Array([1, 2, 3]) },
            { a: 3, d: 'string', e: { nested: BigInt(4) } },
        ],
        output: {
            a: 3,
            b: true,
            c: new Uint8Array([1, 2, 3]),
            d: 'string',
            e: { nested: BigInt(4) },
        },
    },

    {
        message: 'array elements',
        destination: {},
        sources: [{ a: [1, 2] }, { a: [3, 4] }],
        output: { a: [3, 4] },
    },

    {
        message: 'array elements with null values',
        destination: {},
        sources: [{ a: [1, 2] }, { a: undefined }],
        output: { a: [1, 2] },
    },

    {
        message: 'nested array elements',
        destination: {},
        sources: [{ a: [[1, 2]] }, { a: [[3, 4]] }],
        output: { a: [[3, 4]] },
    },

    {
        message: 'items pre-exists in the destination',
        destination: { a: 4, b: false },
        sources: [
            { a: undefined, b: true, c: new Uint8Array([1, 2, 3]) },
            { a: undefined, d: 'string', e: { nested: 4 } },
        ],
        output: { a: 4, b: true, c: new Uint8Array([1, 2, 3]), d: 'string', e: { nested: 4 } },
    },

    {
        message: 'items with different types',
        destination: { a: 4, b: false },
        sources: [
            { a: undefined, b: true, c: new Uint8Array([1, 2, 3]) },
            { a: '4', b: 'true', d: 'string', e: { nested: 4 } },
        ],
        output: { a: '4', b: 'true', c: new Uint8Array([1, 2, 3]), d: 'string', e: { nested: 4 } },
    },
];
