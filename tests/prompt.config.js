/**
 * 强化项目的读写能力
 */
const { resolve } = require('path');
const { prompt, Separator, registerPrompt } = require('inquirer');
const autocomplete = require('inquirer-autocomplete-prompt');
const fs = require('fs-extra');

const directory = resolve(__dirname, '../src/');
const components = ['all'];
fs.readdirSync(directory).forEach((file) => {

	const fullpath = resolve(directory, file);
	// 获取文件信息
	const stat = fs.statSync(fullpath);
	if (!['style'].includes(file) 
		&& stat.isDirectory()
	) {
		components.push(file);
	}

});

const question = [
	{
		type: 'autocomplete',
		message: 'Select component:',
		name: 'component',
		// suggestOnly: true, 开启后可以验证数据且需要使用tab选中
		default: 'all',
		source: (answers, input) => {
			input = input || '';
			return new Promise((resolve => {
				let filter = input 
					? components.filter(item => item.includes(input))
					: components;
				resolve(filter);
			}));
		}
	}
];

registerPrompt('autocomplete', autocomplete);
prompt(question).then((result = {}) => {
	let { component } = result;
	component = component != 'all' ? component.replace(/([a-z\dA-Z])([A-Z])/g, '$1-$2').toLowerCase() : '';

	// 输出
	contents = `const testsContext = require.context('../src/${component ? `${component}/__test__/` : ''}', true, /\\.test$/);`;
	contents += `\ntestsContext.keys().forEach(testsContext);\n`;

	fs.outputFileSync(resolve(__dirname, '../tests/index.js'), contents);

}).catch((res) => {
	console.log(res);
});