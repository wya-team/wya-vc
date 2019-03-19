const { resolve } = require('path');
const { prompt, Separator } = require('inquirer');
const fs = require('fs-extra');

const directory = resolve(__dirname, '../src/');
const docPath = resolve(__dirname, '../README.md');
const targetModules = [];
fs.readdirSync(directory).forEach((file) => {

	const fullpath = resolve(directory, file);
	// 获取文件信息
	const stat = fs.statSync(fullpath);
	if (!['__tpl__', 'style', 'extends', 'utils'].includes(file) && stat.isDirectory()) {
		targetModules.push(file);
	}
});

let content = fs.existsSync(docPath) ? fs.readFileSync(docPath, 'utf-8') : '';

targetModules.forEach((item) => {
	let component = item.split('-').slice(0).map(item => `${item[0].toUpperCase()}${item.slice(1)}`).join('');
	const injectContent = `[${component}]: https://github.com/wya-team/wya-vc/tree/master/src/${item}/\n`;
	if (!content.includes(injectContent)) {
		content += injectContent;
	}
});


fs.outputFileSync(docPath, content);