let gulp = require('gulp')
let $ = require('gulp-load-plugins')()

gulp.task('beautifyHypertext', done => {
	gulp.src('src/**/*.html')
		.pipe($.jsbeautifier()) // Beautify src
		.pipe(gulp.dest('src')) // Replace src
	done()
})

gulp.task('beautifyScripts', done => {
	gulp.src('src/**/*.js')
		.pipe($.jsbeautifier()) // Beautify src
		.pipe(gulp.dest('src')) // Replace src
	done()
})

gulp.task('beautifyStyles', done => {
	gulp.src('src/**/*.scss')
		.pipe($.csscomb()) // Beautify src
		.pipe($.stylefmt()) // Beautify src
		.pipe(gulp.dest('src')) // Replace src
	done()
})

gulp.task('beautifySrc', gulp.series('beautifyHypertext', 'beautifyScripts', 'beautifyStyles'))