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

const { getWebPackConfig } = require('../../webpack.base.config');

const config = getWebPackConfig(
	__dirname,
	'rweb3.min.js',
	'RWeb3',
	'src/rweb3.ts',
	'tsconfig.cjs.json',
);
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
	...config,
	plugins: [
		...config.plugins,
		new BundleAnalyzerPlugin({
			generateStatsFile: true,
			statsFilename: process.env.STATS_FILE ?? 'stats.json',
			defaultSizes: process.env.ANALYZE_SERVER ? 'stat' : 'gzip',
			analyzerMode: process.env.ANALYZE_SERVER ? 'server' : 'json',
		}),
	],
};
