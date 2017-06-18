const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

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
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: [{
					loader: 'css-loader', // Translate CSS into CommonJS
					options: {
						sourceMap: true,
					},
				}, {
					loader: 'postcss-loader', // PostCSS processing
					options: {
						plugins: loader => [
							require('postcss-import')(), // Collapse imports
							require('postcss-cssnext')(), // Handle future CSS syntax, autoprefixing
							require('cssnano')() // Minify CSS
						],
						sourceMap: true,
					},
				}, {
					loader: 'sass-loader', // Compile SCSS to CSS
					options: {
						sourceMap: true,
					},
				}],
			}),
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
		}),
		new ExtractTextPlugin('style.css')
	],
}