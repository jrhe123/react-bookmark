var webpack = require('webpack')
var path = require('path')

module.exports = {
	entry: {
		app: './src/app.js'
	},
	output: {
		filename: 'public/dist/bundle.js',
		sourceMapFilename: 'public/dist/bundle.map.js'
	},
	devtool: '#source-map',
	module: {
		loaders: [
			{
				loader: 'babel-loader',
				test: /\.js?$/,
				exclude: /(node_modules)/,
				query: {
					presets: ['react', 'es2015']
				}
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				loaders: [
					'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
					'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
				]
			}
		]
	}
}