const webpackConfig = require('./webpack.config.test');

module.exports = function (config) {
	const configuration = {
		files: ['./index.js'],

		browsers: ['ChromeHeadless'],

		// 测试单元/断言
		frameworks: ['mocha', 'sinon-chai'], // expect

		// 预编译处理
		preprocessors: {
		  './index.js': ['webpack', 'sourcemap'], // 'coverage' 同 istanbul
		},

		webpack: webpackConfig,

		// webpack-dev配置
		webpackMiddleware: {
			noInfo: true,
			stats: 'errors-only'
		},

		// 设置超时时间5分钟
		client: {
			mocha: {
				timeout: 5 * 60 * 1000
			}
		},

		// 报告输出
		reporters: ['spec', 'coverage'],
		coverageReporter: {
			dir: './coverage',
			reporters: [
				{ type: 'lcov', subdir: '.' },
				{ type: 'text-summary' }
			]
		},
	};

	config.set(configuration);
};
