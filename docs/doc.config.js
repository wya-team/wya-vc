const path = require('path');
const sidebar = require('./nav.config.js');

const ENV_IS_DEV = process.env.NODE_ENV === 'development';

module.exports = {
	version: '1.0.0',
	/**
	 * null | './xxx/xxx.vue' | 'default' | json;
	 */
	routes: {
		'/': '/index',
		'/index': {
			default: './components/index.vue',
			sidebar: null,
			header: 'default',
			footer: 'default',
			extra: null,
		},
		'/components/:name': {
			default: 'default',
			sidebar,
			header: 'default',
			footer: 'default',
			extra: null,
		},
		'*': (to) => {
			return '/zh-CN/index';
		}
	},
	locales: {
		'zh-CN': '简体中文'
	},
	webpackConfig: {
		output: {
			path: path.resolve(__dirname, '../site/'),
			publicPath: ENV_IS_DEV
				? '/'
				: '/wya-vc/site/'
		},
		devServer: {},
	},
	runtime: { 
		define: {
			__DOC_SITE_DIR__: `'${ENV_IS_DEV ? '/' : '/wya-vc/site/'}'`,
			__DOC_MD_DIR__: ENV_IS_DEV 
				? () => (lang, name) => { 
					return `/src/${name}/README${lang != 'zh-CN' ? `_${lang}` : ''}.md`; 
				}
				: (lang, name) => { 
					return `/wya-vc/src/${name}/README${lang != 'zh-CN' ? `_${lang}` : ''}.md`; 
				},
			__DOC_VERSION__: "'1.0.0'",
		}
	}
};