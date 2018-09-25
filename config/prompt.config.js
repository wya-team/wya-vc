/**
 * 强化项目的读写能力
 */
const { prompt, Separator } = require('inquirer');
const fs = require('fs-extra');

const question = [
	{
		type: 'input',
		name: 'port',
		message: 'port:',
		default: '8082'
	},
	{
		type: 'input',
		name: 'component',
		message: 'component:',
		default: ''
	}
];
prompt(question).then((result = {}) => {
	let { port, component: str } = result;
	result.component = str ? str.replace(/([a-z\dA-Z])([A-Z])/g, '$1-$2').toLowerCase() : str;

	let contents = '';
	// 对用户输入的信息处理
	// to do ....
	const strObj = JSON.stringify(result || {});

	// 输出
	contents = `const obj = ${strObj}; module.exports = obj;`;
	fs.outputFileSync('./config/user.config.js', contents);

}).catch((res) => {
	console.log(res);
});