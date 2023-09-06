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

export const fullErrors: any[] = [
    {
        instancePath: '',
        schemaPath: '#/minItems',
        keyword: 'minItems',
        params: { limit: 1 },
        message: 'must NOT have fewer than 1 items',
    },
    {
        instancePath: '',
        schemaPath: '#/minItems',
        keyword: 'minItems',
        params: { limit: 2 },
        message: 'must NOT have fewer than 2 items',
    },
    {
        instancePath: '',
        schemaPath: '#/maxItems',
        keyword: 'maxItems',
        params: { limit: 1 },
        message: 'must NOT have more than 1 items',
    },
];

export const fullErrorsWithInstance: any[] = [
    {
        message: 'must pass "uint" validation',
        keyword: 'eth',
        params: { value: -1 },
        instancePath: '/0',
        schemaPath: '#/items/0/eth',
    },
];

export const errorsWithInstanceNoParams: any[] = [
    {
        message: 'must pass "uint" validation',
        keyword: 'eth',
        instancePath: '/0',
        schemaPath: '#/items/0/eth',
    },
];

export const errorsWithInstanceNoParamsNoMessage: any[] = [
    {
        keyword: 'eth',
        instancePath: '/0',
        schemaPath: '#/items/0/eth',
    },
];

export const unspecifiedErrors: any[] = [{}];
