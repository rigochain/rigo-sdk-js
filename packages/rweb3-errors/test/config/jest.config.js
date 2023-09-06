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
module.exports = {
    globals: {
        'ts-jest': {
            tsconfig: './test/tsconfig.json',
        },
    },
    rootDir: '../..',
    testMatch: ['<rootDir>/test/**/?(*.)+(spec|test).+(ts|tsx|js)'],
    setupFilesAfterEnv: ['<rootDir>/test/config/setup.js'],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1',
    },
    verbose: false,
    collectCoverage: false,
    coverageReporters: ['json'],
    coverageDirectory: '.coverage',
    /**
     * restoreMocks [boolean]
     *
     * Default: false
     *
     * Automatically restore mock state between every test.
     * Equivalent to calling jest.restoreAllMocks() between each test.
     * This will lead to any mocks having their fake implementations removed
     * and restores their initial implementation.
     */
    restoreMocks: true,

    /**
     * resetModules [boolean]
     *
     * Default: false
     *
     * By default, each test file gets its own independent module registry.
     * Enabling resetModules goes a step further and resets the module registry before running each individual test.
     * This is useful to isolate modules for every test so that local module state doesn't conflict between tests.
     * This can be done programmatically using jest.resetModules().
     */
    resetModules: true,
};
