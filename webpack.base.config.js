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
