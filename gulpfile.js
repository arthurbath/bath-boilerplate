let del = require('del')
let browserSync = require('browser-sync').create()
let webpackStream = require('webpack-stream')
let UglifyJSPlugin = require('uglifyjs-webpack-plugin')
let gulp = require('gulp')
let $ = require('gulp-load-plugins')()

// Build tasks
gulp.task('clearBuild', done => {
	del(['build/*'])
	done()
})

gulp.task('buildHypertext', done => {
	gulp.src(['src/hypertext/**/*.html', '!**/vendor/**'])
		.pipe($.htmlmin({ collapseWhitespace: true }))
		.pipe(gulp.dest('build')) // Copy to build
	done()
})

gulp.task('buildScripts', done => {
	gulp.src('src/scripts/**/*.js')
		.pipe(webpackStream({
			devtool: 'source-map', // Generate sourcemap
			module: {
				loaders: [{
					loader: 'babel-loader', // Transpile ES6
					exclude: /node_modules/,
					query: {
						presets: ['es2015'],
						compact: true,
					},
				}],
			},
			output: {
				filename: 'script.js',
			},
			plugins: [
				new UglifyJSPlugin({
					sourceMap: true,
				})
			],
		}))
		.pipe(gulp.dest('build')) // Copy to build
	done()
})

gulp.task('buildStyles', done => {
	gulp.src(['src/styles/**/*.scss', '!**/vendor/**'])
		.pipe($.sourcemaps.init()) // Initialize sourcemap
		.pipe($.sass() // Transpile
			.on('error', $.sass.logError) // Catch transpilation error
		)
		.pipe($.autoprefixer()) // Auto-prefix properties for browser support
		.pipe($.cssnano()) // Minify
		.pipe($.sourcemaps.write('.')) // Write sourcemap
		.pipe(gulp.dest('build')) // Copy to build
	done()
})

gulp.task('build', gulp.series('clearBuild', 'buildHypertext', 'buildScripts', 'buildStyles'))

// BrowserSync tasks
gulp.task('startBrowserSync', () => {
	browserSync.init({
		notify: false,
		open: false,
		server: {
			baseDir: 'build',
		},
	})
})

gulp.task('reloadBrowserSync', done => {
	browserSync.reload()
	done()
})

// Watch tasks
gulp.task('watch', done => {
	gulp.watch('src/hypertext/**/*.html', gulp.series('buildHypertext', 'reloadBrowserSync'))
	gulp.watch('src/scripts/**/*.js', gulp.series('buildScripts', 'reloadBrowserSync'))
	gulp.watch('src/styles/**/*.scss', gulp.series('buildStyles', 'reloadBrowserSync'))
	done()
})

// Beautification tasks
gulp.task('beautifyHypertext', done => {
	gulp.src(['src/hypertext/**/*.html', '!**/vendor/**'])
		.pipe($.jsbeautifier()) // Beautify src
		.pipe(gulp.dest('src/hypertext')) // Replace src
	done()
})

gulp.task('beautifyScripts', done => {
	gulp.src(['src/scripts/**/*.js', '!**/vendor/**'])
		.pipe($.jsbeautifier()) // Beautify src
		.pipe(gulp.dest('src/scripts')) // Replace src
	done()
})

gulp.task('beautifyStyles', done => {
	gulp.src(['src/styles/**/*.scss', '!**/vendor/**'])
		.pipe($.csscomb()) // Beautify src
		.pipe($.stylefmt()) // Beautify src
		.pipe(gulp.dest('src/styles')) // Replace src
	done()
})

gulp.task('beautifySrc', gulp.series('beautifyHypertext', 'beautifyScripts', 'beautifyStyles'))

// Task flows
gulp.task('default', gulp.series('build', gulp.parallel('startBrowserSync', 'watch')))