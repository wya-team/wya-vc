process.env.NODE_ENV = 'development';
const path = require('path');

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const { APP_ROOT, commonConfig, localIp, localPort } = require('./webpack.config.common');

const { component } = require('./user.config.js') || {};
const { entry, openPage } = require('./temp.config.js') || {};

let host = `http://${localIp}:${localPort}`;
let messages = [`Dev Server: ${host}`];
if (component && Object.keys(openPage).length > 0) {
	for (let item in openPage) {
		messages.push(`${item}: ${host}${openPage[item]}`);
	}
}
let webpackConfig = {
	// webpack 4 新增
	mode: 'development',
	plugins: [
		/**
		 * 开发环境
		 * webpack 4 默认支持: 'process.env.NODE_ENV': JSON.stringify('development')
		 */
		new webpack.DefinePlugin({
			__DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
		}),
		/**
		 * 友好提示
		openPage: 'web/preview.html?page=containers/tab-bar/index.js',
		 * 
		 */
		new FriendlyErrorsWebpackPlugin({
			compilationSuccessInfo: {
				messages,
				notes: [`Success!`]
			},
			onErrors: (severity, errors) => {
			},
			clearConsole: true,
			additionalFormatters: [],
			additionalTransformers: []
		})
		/**
		 * StyleLint
		 */
		// new StyleLintPlugin({
		// 	configFile: path.resolve(APP_ROOT, '.stylelintrc')
		// })
	]
};

module.exports = webpackMerge(
	commonConfig,
	webpackConfig
);
