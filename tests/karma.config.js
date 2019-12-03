const webpackConfig = require('../config/webpack.config.test');

module.exports = function (config) {
	const configuration = {
		files: [
			'./setup.js'
		],
		browsers: ['ChromeHeadless'],

		// 测试单元/断言
		frameworks: ['mocha', 'sinon-chai'], // expect

		// 预编译处理
		preprocessors: {
		  './setup.js': ['webpack', 'sourcemap'], // 'coverage' 同 istanbul
		},
		webpack: webpackConfig,
		webpackMiddleware: {
			noInfo: true,
			stats: 'errors-only'
		},
		client: {
			mocha: {
				timeout: 30000
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
