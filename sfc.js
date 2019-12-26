const babel = require('@babel/core');
const { resolve, relative } = require('path');
const fs = require('fs-extra');
const glob = require('glob');

const compiler = require('vue-template-compiler');
const stripWith = require('vue-template-es2015-compiler');

const str2ast = require('@babel/template').default;
const generate = require('@babel/generator').default;
const types = require('@babel/types');
const postcss = require('postcss');
const sass = require('node-sass');
const postcssOpts = require('./config/postcss.config.js');

let cssInfo = glob
	.sync(`src/*`, {
		ignore: ['src/{__tpl__,index.js}']
	})
	.reduce((pre, cur) => {
		pre[cur.replace(/src\//, '')] = [];
		return pre;
	}, {});

const files = glob.sync(`src/**/*.{js,scss,vue}`, {
	ignore: ['src/**/{__test__,examples,demo}/**', 'src/__tpl__/**']
});

const exportCss = (data, filepath) => {
	if (!data) return;
	let result = sass.renderSync({
		data,
		file: filepath
	});
	postcss(postcssOpts.plugins)
		.process(result.css, { 
			from: filepath
		})
		.then(({ css }) => {
			filepath = resolve(__dirname, filepath.replace(/src/, 'lib').replace(/\.(vue|js|scss)/, '.css'));
			fs.outputFileSync(
				filepath, 
				css
			);

			let [key, ...rest] = relative(resolve(__dirname, './lib'), filepath).split('/');
			cssInfo[key].push(rest.join('/'));
		})
		.catch((e) => {
			console.error('css 生成失败');
			throw new Error(e);
		});
};

process.on('beforeExit', () => {
	// 异常处理
	const cssFiles = glob.sync(`src/**/*.m.css`);

	if (cssFiles.length > 0) {
		throw new Error('不存在m.css');
	}

	delete cssInfo.style;

	let totalCss = ['style/index.css'];
	Object.keys(cssInfo).forEach((i) => {
		if (cssInfo[i].length === 0) return;
		totalCss.push(i);
		fs.outputFileSync(
			resolve(__dirname, './lib', `./${i}/index.css`), 
			// 如table/index.js -> [table.css, index.css]
			cssInfo[i].filter(i => i === 'index.css').map(i => `@import "./${i}"`).join(';\n') || ''
		);
	});

	fs.outputFileSync(
		resolve(__dirname, './lib', './index.css'), 
		totalCss.map(i => `@import "./${i}/index.css"`).join(';\n')
	);
});

files.forEach((filepath) => {
	let type = filepath.split('.').pop();
	const FILE_PATH = resolve(__dirname, filepath);
	const FILE_CONTENT = fs.readFileSync(FILE_PATH, 'utf-8');

	let fns = {
		js: () => {
			let styleImport = [];
			babel.transform(
				FILE_CONTENT,
				{
					babelrc: true,
					plugins: [
						{
							visitor: {
								// css
								ImportDeclaration(path) {
									let { value } = path.node.source;
									if (/\.(scss|css)$/.test(value)) {
										styleImport.push(`@import "${value}";`);
										path.remove();
									}
								}
							}
						}
					]
				}, 
				(err, result) => {
					if (err) {
						throw err;
					}

					styleImport.length > 0 && (
						exportCss(styleImport.join(`\n`), filepath)
					);

					fs.outputFileSync(
						resolve(__dirname, filepath.replace(/src/, 'lib')), 
						result.code
					);
				}
			);
		},

		vue: () => {
			const { script, template, styles } = compiler.parseComponent(FILE_CONTENT);

			let newRenderAst;
			let newStaticRenderAst;
			if (template && template.content) {
				// 1. template -> render
				const { render, staticRenderFns } = compiler.compile(template.content);

				try {
					// render
					let renderCode = stripWith(`function render(){${render}}`);
					let renderAst = str2ast(renderCode, {
						placeholderPattern: false, // 不使用占位符替换
					})();

					renderAst.type = 'FunctionExpression';
					newRenderAst = types.objectProperty(
						types.identifier('render'), 
						renderAst
					);

					// staticRenderCode
					let staticRenderCode = stripWith(`[${staticRenderFns.map(fn => `function (){${fn}}`).join(',')}]`);
					const staticRenderAst = str2ast(staticRenderCode, {
						placeholderPattern: false, // 不使用占位符替换
					})().expression;

					newStaticRenderAst = types.objectProperty(
						types.identifier('staticRenderFns'), 
						staticRenderAst
					);

				} catch (e) {
					console.log(filepath, '编译失败');
					throw new Error(e);
				}
				
			}
			let result;
			let styleImport = [];
			result = babel.transform(
				script && script.content || '',
				{
					babelrc: true,
					plugins: [
						{
							visitor: {
								// css
								ImportDeclaration(path) {
									let { value } = path.node.source;
									if (/\.(scss|css)$/.test(value)) {
										styleImport.push(`@import "${value}";`);
										path.remove();
									}
								},
								// portal【portal, 只能是wrapperComponent】
								VariableDeclarator(path) {
									if (
										!/wrapperComponent/.test(path.node.id.name) 
										|| !path.node.init.properties
									) return;
									newRenderAst && path.node.init.properties.push(newRenderAst);
									newStaticRenderAst && path.node.init.properties.push(newStaticRenderAst);
								},
								// export default
								ExportDefaultDeclaration(path) {
									if (!path.node.declaration.properties) return;
									newRenderAst && path.node.declaration.properties.push(newRenderAst);
									newStaticRenderAst && path.node.declaration.properties.push(newStaticRenderAst);
								}
							}
						}
					]
				}
			);

			styleImport = styleImport
				.concat((styles || []).map(i => i.content))
				.join(`\n`);

			exportCss(styleImport, filepath);

			fs.outputFileSync(
				resolve(__dirname, filepath.replace(/src/, 'lib').replace(/\.vue/, '.js')), 
				result.code
			);
		},
		scss: () => {
			exportCss(FILE_CONTENT, filepath);
		},
		css: () => {
			exportCss(FILE_CONTENT, filepath);
		}
	};

	fns[type] && fns[type]();
});