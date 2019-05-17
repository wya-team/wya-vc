module.exports = {
	plugins: [
		require('postcss-smart-import')({
			/* ...options */
		}),
		require('postcss-flexbugs-fixes')({

		}),
		require('precss')({
			/* ...options */ 
		}),
		require('cssnano')({
			preset: 'default',
		}),
		require('autoprefixer')({
			/* ...options */
			// 不删除老式写法
			remove: false,
			// 样式前缀添加
			browsers: [
				"> 1%", 
				"IE > 8",
				"last 2 versions", 
				"Firefox ESR", 
				"Opera 12.1",
				"Safari > 7"
			]
		})
	]
};
