let gulp = require('gulp')
let $ = require('gulp-load-plugins')()

gulp.task('beautifyHypertext', done => {
	gulp.src('src/hypertext/**/*.html')
		.pipe($.jsbeautifier()) // Beautify src
		.pipe(gulp.dest('src/hypertext')) // Replace src
	done()
})

gulp.task('beautifyScripts', done => {
	gulp.src('src/scripts/**/*.js')
		.pipe($.jsbeautifier()) // Beautify src
		.pipe(gulp.dest('src/scripts')) // Replace src
	done()
})

gulp.task('beautifyStyles', done => {
	gulp.src('src/styles/**/*.scss')
		.pipe($.csscomb()) // Beautify src
		.pipe($.stylefmt()) // Beautify src
		.pipe(gulp.dest('src/styles')) // Replace src
	done()
})

gulp.task('beautifySrc', gulp.series('beautifyHypertext', 'beautifyScripts', 'beautifyStyles'))