const path = require('path');
const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const common = require('./webpack.config.js');

module.exports = merge(common, {
	mode: 'production',
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: path.resolve(__dirname, 'remove-console-loader.js'), // Custom loader to remove console.log
					}
				]
			}
		],
	},
	optimization: {
		minimize: true,
		minimizer: [new TerserPlugin({
			terserOptions: {
				compress: {
					// Remove console.log statements
					drop_console: true,
					// Remove dead code (e.g., unused variables)
					dead_code: true,
				},
			},
		})],
	},
});