const path = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
	devtool: 'source-map', // Generate sourcemap
	entry: './src/scripts/script.js',
	module: {
		rules: [{
			exclude: /node_modules/,
			loader: 'babel-loader',
			query: {
				presets: ['es2015'],
				compact: true,
			},
			test: /\.js$/,
		}, {
			exclude: /node_modules/,
			test: /\.scss$/,
			use: [{
				loader: 'style-loader', // Create style nodes from JS strings
			}, {
				loader: 'css-loader', // Translate CSS into CommonJS
				options: {
					sourceMap: true,
				},
			}, {
				loader: 'sass-loader', // Compile SCSS to CSS
				options: {
					sourceMap: true,
				},
			}],
		}],
	},
	output: {
		filename: 'script.js',
		path: path.resolve(__dirname, 'build'),
	},
	plugins: [
		new CleanWebpackPlugin(['build']),
		new UglifyJSPlugin({
			sourceMap: true,
		})
	],
}