process.env.NODE_ENV = process.env.NODE_ENV || 'production';
console.log(`NODE_ENV : ${process.env.NODE_ENV}`);

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
const { rollup } = require('rollup');
const replace = require('@rollup/plugin-replace');
const buble = require('@rollup/plugin-buble');
const commonjs = require('@rollup/plugin-commonjs');
const nodeResolve = require('@rollup/plugin-node-resolve');
const alias = require('@rollup/plugin-alias');
const { uglify } = require('rollup-plugin-uglify');

const postcssOpts = require('./config/postcss.config.js');

let cssInfo = glob
	.sync(`src/*`, {
		ignore: ['src/{__tpl__,index.js}']
	})
	.reduce((pre, cur) => {
		pre[cur.replace(/src\//, '')] = [];
		return pre;
	}, {});

let thirdInfo = [];

const files = glob.sync(`src/**/*.{js,scss,vue}`, {
	ignore: ['src/**/{__test__,examples,demo}/**', 'src/__tpl__/**']
});

const _files = files.map((file) => file.replace(/\.(vue|js|scss)/, ''));
if (files.length !== [...new Set(_files)].length) {
	_files.forEach((file, index, source) => {

	});

	let reject;
	for (let i = 0; i < _files.length; i++) {
		if (i != _files.indexOf(_files[i])) {
			reject = _files[i];
			break;
		}
	}
	
	// ⚠️
	throw new Error(`${reject} + 文件存在重复, 不区分{js,scss,vue}`);
} 
/**
 * TODO：
 * 1. 提示：第三方的third.scss 要放在index.js中
 * 2. Build js (esm, min, browser)
 */
const exportCssFile = (filepath, data, record = true, promise) => {

	if (!data) return promise ? Promise.resolve() : null;
	let result;

	let fn = (onSuccess, onError) => {
		try {
			result = sass.renderSync({
				data,
				file: filepath
			});
		} catch (e) {
			console.error(filepath, 'sass 解析失败');
			throw e;
		}
		
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

				onSuccess && onSuccess();
				if (!record) return;
				let [key, ...rest] = relative(resolve(__dirname, './lib'), filepath).split('/');
				cssInfo[key].push(rest.join('/'));

				if (rest.join('/').includes('third.css')) {
					thirdInfo.push([key, ...rest].join('/'));
				}
			})
			.catch((e) => {
				onError && onError(e);
				console.error('css 生成失败');
				throw new Error(e);
			});
	};


	return promise 
		? new Promise(fn)
		: fn();
	
};

process.on('beforeExit', async () => {

	delete cssInfo.style;

	let totalCss = [];

	await Promise.all(Object.keys(cssInfo).map((i) => {
		if (cssInfo[i].length === 0) return;

		totalCss.push(i);
		return exportCssFile(
			resolve(__dirname, './lib', `./${i}/index.css`), 
			// 如table/index.js -> [table.css, index.css]
			cssInfo[i]
				.filter(i => i !== 'index.css' && i.indexOf('third.css') === -1)
				// ⚠️ 要求组件的主入口必须和文件夹同名，否则样式会存在先后问题
				.reduce((pre, cur, index, source) => {
					pre[0] = pre[0] || [];
					pre[1] = pre[1] || [];
					if (cur.includes('mobile/')) {
						[`mobile/${i}.css`].some(item => cur === item) 
							? pre[1].unshift(cur)
							: pre[1].push(cur);
					} else {
						[`${i}.css`].some(item => cur === item) 
							? pre[0].unshift(cur)
							: pre[0].push(cur);
					}
					if (index === source.length - 1) {
						pre = pre[0].concat(pre[1]);
					}
					return pre;
				}, [])
				.map(i => `@import './${i}'`)
				.filter((i, index, source) => source.indexOf(i) != -1)
				.join(';\n') || '',
			false,
			true
		);
	}));

	await exportCssFile(
		resolve(__dirname, './lib', './vc.reset.css'), 
		['style']
			.map(i => `@import './${i}/index.css'`)
			.join(';\n'),
		false,
		true
	);

	// 第三方资源
	await exportCssFile(
		resolve(__dirname, './lib', './vc.third.css'), 
		thirdInfo
			.map(i => `@import './${i}'`)
			.join(';\n'),
		false,
		true
	);

	// 纯组件含有
	await exportCssFile(
		resolve(__dirname, './lib', './vc.normal.css'), 
		[...new Set(['icon', 'img', 'button', 'input', 'spin', ...totalCss])]
			.map(i => `@import './${i}/index.css'`)
			.join(';\n'),
		false,
		true
	);

	// 全部
	await exportCssFile(
		resolve(__dirname, './lib', './vc.min.css'), 
		[`@import './vc.reset.css'`, `@import './vc.third.css'`, `@import './vc.normal.css'`].join(';\n'),
		false,
		true
	);


	// 含Vue
	let browserJS = await rollup({
		input: 'lib/index.js',
		plugins: [
			alias({
				entries: [{
					find: /^vue$/, 
					replacement: 'vue/dist/vue.esm.js'
				}]
			}),
			nodeResolve(), 
			commonjs({}), 
			replace({
				'__VC_VERSION__': process.env.VERSION || require('./package.json').version,
				'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
			}),
			buble(),
			uglify()
		]
	});
	await browserJS.write({
		output: {
			file: `lib/vc.browser.js`,
			format: 'umd',
			name: 'WYA_VC',
			exports: 'named'
		}
	});

	// 不含Vue
	let minJS = await rollup({
		input: 'lib/index.js',
		external: filename => {
			let regex = ['^vue$'].join('|');

			return new RegExp(`(${regex})`).test(filename);
		},
		plugins: [
			nodeResolve(), 
			commonjs({}), 
			replace({
				'__VC_VERSION__': process.env.VERSION || require('./package.json').version,
				'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
			}),
			buble(),
			uglify()
		]
	});
	await minJS.write({
		output: {
			file: `lib/vc.min.js`,
			format: 'umd',
			name: 'WYA_VC',
			exports: 'named',
			globals: {
				vue: 'Vue'
			},
		}
	});

	// 不含第三方
	let commonJS = await rollup({
		input: 'lib/index.js',
		external: filename => {
			let regex = [
				'^vue$', 
				'^html2canvas$', 
				'^echarts$', 
				'^quill$',
				'^photoswipe$',
				'^photoswipe/dist/photoswipe-ui-default$'
			].join('|');

			return new RegExp(`(${regex})`).test(filename);
		},
		plugins: [
			nodeResolve(), 
			commonjs({}), 
			replace({
				'__VC_VERSION__': process.env.VERSION || require('./package.json').version,
				'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
			}),
			buble(),
			uglify()
		]
	});
	await commonJS.write({
		output: {
			file: `lib/vc.common.js`,
			format: 'umd',
			name: 'WYA_VC',
			exports: 'named',
			globals: {
				vue: 'Vue',
				echarts: 'echarts',
				photoswipe: 'PhotoSwipe',
				'photoswipe/dist/photoswipe-ui-default': 'PhotoSwipeUI_Default',
				quill: 'Quill',
				html2canvas: 'html2canvas',
			},
		}
	});


	// 异常处理
	const cssFiles = glob.sync(`src/**/*.m.css`);

	if (cssFiles.length > 0) {
		throw new Error('不存在m.css');
	}

	console.log('Build Success!!!');
	process.exit();
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

									// ⚠️
									if (/\.(vue)$/.test(value)) {
										throw new Error(`
											\n文件中不允许出现.vue文件后缀
											\n文件: ${FILE_PATH}
										`);
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
						exportCssFile(filepath, styleImport.join(`\n`))
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
				script && script.content || 'export default {};',
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

									if (/\.(vue)$/.test(value)) {
										throw new Error(`
											\n文件中不允许出现.vue文件后缀
											\n文件: ${FILE_PATH}
										`);
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
								},

								// ⚠️
								NewExpression(path) {
									if (path.node.callee.name === 'Portal') {
										let arg0 = path.node.arguments[0].name;
										if (arg0 !== 'wrapperComponent') {
											throw new Error(`
												\nPortal第一个参数应该命名为wrapperComponent
												\n当前值: ${arg0}
												\n文件: ${FILE_PATH}
											`);
										}
										
									}
								}
							}
						}
					]
				}
			);

			styleImport = styleImport
				.concat((styles || []).map(i => i.content))
				.join(`\n`);

			exportCssFile(filepath, styleImport);

			fs.outputFileSync(
				resolve(__dirname, filepath.replace(/src/, 'lib').replace(/\.vue/, '.js')), 
				result.code
			);
		},
		scss: () => {
			exportCssFile(filepath, FILE_CONTENT);
		},
		css: () => {
			exportCssFile(filepath, FILE_CONTENT);
		}
	};

	fns[type] && fns[type]();
});