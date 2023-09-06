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
