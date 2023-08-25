const { getWebPackConfig } = require('../../webpack.base.config');

module.exports = getWebPackConfig(
    __dirname,
    'rweb3-validator.min.js',
    'rweb3-validator',
    'src/index.ts',
    'tsconfig.ems.json',
);
