var gulp = require('gulp');
var gls = require('gulp-live-server');
var jshint = require('gulp-jshint');

//starting serving
gulp.task('start', function(){
	var server = gls.new('app/app.js');
	server.start();
});

//running lint on all js files
gulp.task('lint', function () {
    return gulp.src(['app/public/js/*.js','app/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

//running watch task to notify any changes in js files
gulp.task('watch', function(){
	gulp.watch(['*.js', '**/*.js'],['lint', 'start']);
});

//gulp default task to run all 
gulp.task('default', function(){
	gulp.start('lint', 'watch', 'start');
});