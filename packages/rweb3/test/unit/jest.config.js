const base = require('../config/jest.config');

module.exports = {
    ...base,
    testTimeout: 10000,
    testMatch: ['<rootDir>/test/unit/**/*.(spec|test).(js|ts)'],

    coverageDirectory: '../../.coverage/unit',
    collectCoverageFrom: ['src/**'],
    collectCoverage: true,
    coverageReporters: [
        [
            'json',
            {
                file: 'rweb3-coverage.json',
            },
        ],
    ],
};
