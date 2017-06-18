const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const extractStyles = new ExtractTextPlugin('style.css')

module.exports = {
	devtool: 'source-map', // Generate sourcemap
	entry: './src/scripts/script.js',
	module: {
		rules: [{
			test: /\.html$/, // Hypertext
			exclude: /node_modules/,
			use: [{
				loader: 'file-loader',
				query: {
					publicPath: './build',
					name: '[name].[ext]',
				},
			},
			'extract-loader', {
				loader: 'html-loader',
				options: { minimize: true },
			}],
		}, {
			test: /\.js$/, // Scripts
			exclude: /node_modules/,
			loader: 'babel-loader',
			query: {
				presets: ['es2015'],
				compact: true,
			},
		}, {
			test: /\.scss$/, // Styles
			exclude: /node_modules/,
			use: extractStyles.extract({
				fallback: 'style-loader',
				use: [{
					loader: 'css-loader', // Translate CSS into CommonJS
					options: { sourceMap: true },
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
					options: { sourceMap: true },
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
		new UglifyJSPlugin({ sourceMap: true }),
		extractStyles
	],
}