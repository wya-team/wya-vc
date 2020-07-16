const ENV_IS_DEV = process.env.NODE_ENV === 'development';

const path = require('path');
const upath = require('upath');
const fs = require('fs-extra');
const glob = require('glob');

const APP_ROOT = process.cwd();

const HtmlWebpackPlugin = require('html-webpack-plugin');

let { component } = require('./user.config.js') || {};

if (!ENV_IS_DEV) {
	component = '';
}

let entry = {
};
let openPage = {};
// 入口文件
const getEntryFileContent = (entryPath, fullpath) => {
	let relativePath = path.relative(path.join(entryPath, '../'), fullpath);
	relativePath = upath.normalize(relativePath);
	let contents = '';
	contents += `\nimport Vue from 'vue';\n`;
	if (ENV_IS_DEV) {
		let stylePath = path.relative(path.join(entryPath, '../'), 'src/style');
		stylePath = upath.normalize(stylePath);
		contents += `\nimport '${stylePath}';\n`;
	}
	contents += `\nimport App from '${relativePath.replace(/\.vue/, '')}';\n`;
	contents += `\nVue.config.devtools = true;\n`;
	contents += `\nconst app = new Vue({`;
	contents += `\n	el: "#pages",`;
	contents += `\n	components: { App },`;
	contents += `\n	template: '<App />'`;
	contents += `\n});\n`;
	contents += `\nwindow.app = app;`;
	return contents;
};
const getEntryFile = (dir) => {
	dir = dir || '.';
	const directory = path.join(APP_ROOT, 'src', dir);

	// 将返回一个包含“指定目录下所有文件名称”的数组对象
	fs.readdirSync(directory).forEach((file) => {
		// 文件地址
		const fullpath = path.join(directory, file);
		const paths = upath.normalize(fullpath).split('/') || [];
		// 获取文件信息
		const stat = fs.statSync(fullpath);
		// 获取文件后缀名
		const extname = path.extname(fullpath);
		if (stat.isFile() 
			&& (extname === '.js' || extname === '.vue') 
			&& (!component || fullpath.includes(component))
			&& paths.length >= 2 && paths[paths.length - 2] === 'examples'
		) {
			// 获取文件名字
			let name = path.join(dir, path.basename(file, extname));
			name = upath.normalize(name);
			// 用户测试单独文件
			const entryFile = path.join('temp', upath.normalize(dir).replace(/\/examples/, ''), file);
			const _entryFile = entryFile.replace(/\.vue/, '.js');
			fs.outputFileSync(
				path.join(_entryFile), 
				getEntryFileContent(entryFile, fullpath)
			);
			// 文件路径
			entry[name.replace(/\/examples/, '')] = path.join(APP_ROOT, _entryFile);
		} else if (stat.isDirectory() && file !== 'dist') {
			const subdir = path.join(dir, file);
			getEntryFile(subdir);
		}
	});
};
getEntryFile('.');
// const getCopyConfig = () => {
// 	const foundScripts = glob.sync('temp/*/', {});
// 	const ret = [];
// 	foundScripts.forEach(fullpath => {
// 		fullpath = upath.normalize(fullpath);
// 		let filename = path.join(APP_ROOT, fullpath.replace(/temp\//, 'dist/'), 'index.html');
// 		if (!/(__tpl__|__test__)/.test(fullpath)) {
// 			ret.push({
// 				from: 'templates/index.tpl.html',
// 				to: filename
// 			});
// 		}
// 	});
// 	return ret;
// };
// new CopyWebpackPlugin(getCopyConfig(), { copyUnmodified: true }),
const getHTMLConfig = () => {
	const foundScripts = glob.sync(`temp/${component || '*'}/*.js`, {});
	const ret = [];
	foundScripts.forEach(fullpath => {
		fullpath = upath.normalize(fullpath);
		if (!/(__tpl__|__test__)/.test(fullpath)) {
			let chunk = fullpath.replace(/temp\//, '').replace(/^(.*)\.js$/, '$1');
			let filename = path.join(APP_ROOT, fullpath.replace(/temp\//, 'demo/').replace(/\.js/, '.html'));
			openPage[chunk] = path.join(fullpath.replace(/temp\//, '/').replace(/\.js/, '.html'));
			ret.push(
				new HtmlWebpackPlugin({
					__DEV__: ENV_IS_DEV, 
					template: path.resolve(APP_ROOT, 'templates/tpl.ejs'),
					chunks: [chunk],
					inject: 'body',
					filename
				})
			);
		}
	});
	ret.push(
		new HtmlWebpackPlugin({
			inject: false,
			title: `${component || 'All'} Demo`,
			publicPath: ENV_IS_DEV ? '' : '',
			openPage,
			template: path.resolve(APP_ROOT, 'templates/index.ejs'),
			// filename: path.join(APP_ROOT, 'dist/index.html')
		})
	);
	return ret;
};

module.exports = {
	entry,
	openPage,
	getHTMLConfig
};