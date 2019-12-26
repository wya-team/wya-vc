module.exports = {
	plugins: [
		require('postcss-smart-import')(),
		require('postcss-flexbugs-fixes')(),
		// 将scss -> css, webpack下使用sass-loader（loader执行右到左）, node下先使用node-sass
		// require('precss')(), 
		require('cssnano')(),
		require('autoprefixer')({
			remove: false
		})
	]
};
