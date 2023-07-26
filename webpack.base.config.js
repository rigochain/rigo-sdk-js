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

const webpack = require('webpack');
const path = require('path');

/**
 * Shared webpack configuration for all packages
 */
function getWebPackConfig(packagePath, filename, library, entry, tsconf) {
	return {
		mode: 'production',
		entry: path.resolve(packagePath, entry),
		output: {
			path: path.resolve(packagePath, 'dist'),
			filename: filename,
			library: library,
			libraryExport: 'default',
			libraryTarget: 'umd',
			globalObject: 'this',
		},

		module: {
			rules: [
				{
					test: /\.ts$/,
					loader: 'ts-loader',
					options: {
						configFile: path.resolve(packagePath, tsconf),
					},
					exclude: ['/node_modules/', '/test/'],
				},
			],
		},
		resolve: {
			extensions: ['.ts', '.js'],
			fallback: {
				stream: require.resolve('readable-stream'),
			},
			extensionAlias: {
				'.js': ['.js', '.ts'],
			},
		},
		devtool: 'source-map',
		plugins: [
			new webpack.IgnorePlugin({
				checkResource(resource) {
					// "@ethereumjs/common/genesisStates" consists ~800KB static files which are no more needed
					return /(.*\/genesisStates\/.*\.json)/.test(resource);
				},
			}),
			new webpack.ProvidePlugin({
				process: 'process/browser',
			}),
		],
	};
}

module.exports = {
	getWebPackConfig,
};
