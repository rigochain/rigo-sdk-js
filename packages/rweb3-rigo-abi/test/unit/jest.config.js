const base = require('../config/jest.config');

module.exports = {
    ...base,
    testMatch: ['<rootDir>/test/unit/**/*.(spec|test).(js|ts)'],
    // testMatch: ['<rootDir>/test/unit/**/constructor.(spec|test).(js|ts)'],
    // testMatch: ['<rootDir>/test/unit/**/decodeContractErrorData.(spec|test).(js|ts)'],
    // testMatch: ['<rootDir>/test/unit/**/types.(spec|test).(js|ts)'],
    // testMatch: ['<rootDir>/test/unit/**/utils.(spec|test).(js|ts)'],
    // testMatch: ['<rootDir>/test/unit/**/api/errors_api.(spec|test).(js|ts)'],
    // testMatch: ['<rootDir>/test/unit/**/api/events_api.(spec|test).(js|ts)'],
    // testMatch: ['<rootDir>/test/unit/**/api/functions_api.(spec|test).(js|ts)'],
    // testMatch: ['<rootDir>/test/unit/**/api/logs_api.(spec|test).(js|ts)'],
    // testMatch: ['<rootDir>/test/unit/**/api/parameters_api.(spec|test).(js|ts)'],

    coverageDirectory: '../../.coverage/unit',
    collectCoverageFrom: ['src/**'],
    collectCoverage: true,
    coverageReporters: [
        [
            'json',
            {
                file: 'web3-eth-abi-unit-coverage.json',
            },
        ],
    ],
};
