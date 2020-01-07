module.exports = [
	{
		"path": "/changelog",
		"name": {
			'zh-CN': "更新日志",
			'en-US': "Changelog",
		}
	},
	{
		"name": {
			'zh-CN': "开发指南",
			'en-US': "Development",
		},
		"children": [
			{
				"path": "/installation",
				"name": {
					'zh-CN': "安装",
					'en-US': "Installation",
				}
			},
			{
				"path": "/quickstart",
				"name": {
					'zh-CN': "快速上手",
					'en-US': "Quick Start",
				}
			},
			{
				"path": "/i18n",
				"name": {
					'zh-CN': "国际化",
					'en-US': "Internationalization",
				}
			}
		]
	},	
	{
		"name": {
			'zh-CN': "组合",
			'en-US': "Group",
		},
		"group": [
			{
				"name": {
					'zh-CN': "组合 1",
					'en-US': "Group 1",
				},
				list: [
					{
						"path": "/children-group-11",
						"name": {
							'zh-CN': "子 1 - 1",
							'en-US': "children 1 - 1",
						}
					},
					{
						"path": "/children-group-12",
						"name": {
							'zh-CN': "子 1 - 2",
							'en-US': "children 1 - 2",
						}
					},
					{
						"path": "/children-group-13",
						"name": {
							'zh-CN': "子 1 - 3",
							'en-US': "children 1 - 3",
						}
					}
				]
			},
			{
				"name": {
					'zh-CN': "组合 2",
					'en-US': "Group 2",
				},
				list: [
					{
						"path": "/children-group-21",
						"name": {
							'zh-CN': "子 2 - 1",
							'en-US': "children 2 - 1",
						}
					},
					{
						"path": "/children-group-22",
						"name": {
							'zh-CN': "子 2 - 2",
							'en-US': "children 2 - 2",
						}
					},
					{
						"path": "/children-group-23",
						"name": {
							'zh-CN': "子 2 - 3",
							'en-US': "children 2 - 3",
						}
					}
				]
			}
		]
	}
];