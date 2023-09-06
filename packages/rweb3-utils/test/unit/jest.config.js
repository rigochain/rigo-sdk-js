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
const base = require('../config/jest.config');

module.exports = {
    ...base,
    testMatch: ['<rootDir>/test/unit/**/*.(spec|test).(js|ts)'],
    // testMatch: ['<rootDir>/test/unit/**/chunk_response_parser.(spec|test).(js|ts)'],
    // testMatch: ['<rootDir>/test/unit/**/converters.(spec|test).(js|ts)'],
    // testMatch: ['<rootDir>/test/unit/**/formatter.(spec|test).(js|ts)'],
    // testMatch: ['<rootDir>/test/unit/**/hash.(spec|test).(js|ts)'],
    // testMatch: ['<rootDir>/test/unit/**/json_rpc.(spec|test).(js|ts)'],
    // testMatch: ['<rootDir>/test/unit/**/objects.(spec|test).(js|ts)'],
    // testMatch: ['<rootDir>/test/unit/**/promise_helpers.(spec|test).(js|ts)'],
    // testMatch: ['<rootDir>/test/unit/**/random.(spec|test).(js|ts)'],
    // testMatch: ['<rootDir>/test/unit/**/string_manipulation.(spec|test).(js|ts)'],
    // testMatch: ['<rootDir>/test/unit/**/time.(spec|test).(js|ts)'],
    // testMatch: ['<rootDir>/test/unit/**/trx.(spec|test).(js|ts)'],
    // testMatch: ['<rootDir>/test/unit/**/uint8array.(spec|test).(js|ts)'],
    // testMatch: ['<rootDir>/test/unit/**/validation.(spec|test).(js|ts)'],
    // testMatch: ['<rootDir>/test/unit/**/web3_deferred_promise.(spec|test).(js|ts)'],

    coverageDirectory: '../../.coverage/unit',
    collectCoverageFrom: ['src/**'],
    collectCoverage: true,
    coverageReporters: [
        [
            'json',
            {
                file: 'rweb3-utils-coverage.json',
            },
        ],
    ],
};
