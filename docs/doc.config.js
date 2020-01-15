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
	layout: {
		header: {
			name: '@wya/vc',
			logo: 'https://avatars3.githubusercontent.com/u/34465004?s=200&v=4',
			path: '/index',
			nav: [
				{
					"name": {
						'zh-CN': "首页",
						'en-US': "Home",
					},
					path: '/index'
				},
				{
					"name": {
						'zh-CN': "团队地址",
						'en-US': "Team Site",
					},
					path: 'https://github.com/wya-team',
					// _blank | _self 
					target: '_blank',
					// referrer
					rel: ''
				}
			]
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
			__DOC_SITE_DIR__: ENV_IS_DEV ? '/' : '/wya-vc/site/',
			__DOC_VERSION__: '1.0.0',
			__DOC_MD_DIR__: 
				ENV_IS_DEV 
					? (lang, name) => { 
						if (['i18n', 'installation', 'quickstart'].includes(name)) {
							return `${location.origin}/docs/${lang ? `${lang}/` : ''}${name}.md`; 
						}
						if (name === 'changelog') {
							return `${location.origin}/CHANGELOG.md`; 
						}
						return `${location.origin}/src/${name}/README${lang != 'zh-CN' ? `_${lang}` : ''}.md`; 
					}
					: (lang, name) => { 
						if (['i18n', 'installation', 'quickstart'].includes(name)) {
							return `https://raw.githubusercontent.com/wya-team/wya-vc/2.x/docs/${lang ? `${lang}/` : ''}${name}.md`; 
						}
						if (name === 'changelog') {
							return `https://raw.githubusercontent.com/wya-team/wya-vc/2.x/CHANGELOG.md`; 
						}
						return `https://raw.githubusercontent.com/wya-team/wya-vc/2.x/src/${name}/README${lang != 'zh-CN' ? `_${lang}` : ''}.md`; 
					}
		}
	}
};