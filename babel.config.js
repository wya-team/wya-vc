const APP_ROOT = process.cwd();
const path = require('path');

module.exports = (api) => {
	// 编译缓存
	api && api.cache.forever();

	return {
		compact: false,
		presets: [
			"@babel/preset-env"
		],
		plugins: [
			"@babel/plugin-proposal-export-namespace-from",
			"@babel/plugin-proposal-export-default-from",
			"@babel/plugin-proposal-function-bind",
			"@babel/plugin-syntax-dynamic-import",
			// @rollup/plugin-babel 下不要使用(源码内搜索：skipPreflightCheck)
			"@babel/plugin-transform-modules-commonjs",
			"@babel/plugin-syntax-jsx",
			// @rollup/plugin-babel 只能在babelHelpers：'runtime'下使用
			"@babel/plugin-transform-runtime",
			"transform-vue-jsx",
			[
				"@babel/plugin-proposal-object-rest-spread",
				{
					"loose": true
				}
			],
			[
				"@babel/plugin-proposal-decorators",
				{
					"legacy": true
				}
			],
			[
				"@babel/plugin-proposal-class-properties",
				{
					"assumptions": {
						"setPublicClassFields": true
					}
				}
			]
		],
		env: {
			"test": {
				"plugins": ["istanbul"]
			}
		}
	};
};
