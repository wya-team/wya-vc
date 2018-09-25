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
		require('autoprefixer')({
			/* ...options */
			// 不删除老式写法
			remove: false
		})
	]
};
