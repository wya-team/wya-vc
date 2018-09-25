const libDir = process.env.LIB_DIR;
const APP_ROOT = process.cwd();
const path = require('path');

module.exports = {
	setupFiles: [
		path.resolve(APP_ROOT, 'tests/setup.js')
	],
	/**
	 * 匹配相关
	 */
	moduleFileExtensions: [
		'js',
		'jsx',
		'json',
		'md',
		'vue'
	],
	// 匹配规则很重要，不声明rootDir，需要改成path.resolve(APP_ROOT, 'tests')
	rootDir: process.cwd(),
	roots: [
		'tests',
		'src'
	],
	// modulePathIgnorePatterns 与 testPathIgnorePatterns相似
	modulePathIgnorePatterns: [
		// '/src/mock'
	],
	testPathIgnorePatterns: [
		'/src/mock',
		'/node_modules/',
		'dekko'
	],
	testRegex: '.*\\.test\\.js$',
	/**
	 * 覆盖率相关
	 */
	collectCoverage: true, // 覆盖率统计暂时先关闭
	coverageDirectory: 'tests/coverage',
	// 检测src[js|jsx]是否都写了test用例
	collectCoverageFrom: [
		'src/**/*.{js,jsx,vue}'
	],
	coverageThreshold: {
		"global": {
			"branches": 95,
			"functions": 95,
			"lines": 95,
			"statements": 95
		}
	},
	/**
	 * 解析相关相关
	 */
	transform: {
		'^.+\\.jsx?$': 'babel-jest',
		'^.+\\.vue$': "vue-jest"
	},
	transformIgnorePatterns: [
		'/dist/',
		'/node_modules/'
		// Ignore modules without es dir
		// 'node_modules\/[^/]+?\/(?!(es|node_modules)\/)',
	],
	globals: {},
	/**
	 * https://github.com/adriantoine/enzyme-to-json
	 */
	snapshotSerializers: [
		'enzyme-to-json/serializer'
	]
};
