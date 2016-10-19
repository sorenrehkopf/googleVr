const gulp = require('gulp');
const connect = require('gulp-connect');
const babel = require('gulp-babel');

const paths = {
	scripts:['app.js'],
	notScripts:['*.html','*.css','vrview-analytics.js','vrview/build/*.js']
}

gulp.task('start',['build','serve','watch']);
gulp.task('watch',['watch:scripts','watch:notScripts']);

gulp.task('serve',function(){
	connect.server({
		root:'',
		port:'3000',
		livereload:true,
		fallback:'index.html'
	})
});

gulp.task('reload',function(){
	return gulp.src(['*.*'])
	.pipe(connect.reload());
});

gulp.task('build',function(){
	return gulp.src(paths.scripts)
	.pipe(babel({
		presets:['es2015']
	}))
	.pipe(gulp.dest('js'))
	.pipe(connect.reload());
});

gulp.task('watch:notScripts',function(){
	gulp.watch(paths.notScripts,['reload']);
});
gulp.task('watch:scripts',function(){
	gulp.watch(paths.scripts,['build']);
});