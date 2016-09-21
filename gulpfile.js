'use strict';

var gulp 				= require('gulp');
var sass				=	require('gulp-sass');
var cssmin 			=	require('gulp-clean-css');
var concat			= require('gulp-concat');
var uglify			= require('gulp-uglify');
var cssGlobbing = require('gulp-css-globbing');
var runSequence	=	require('run-sequence');
var browserSync	=	require('browser-sync');
var plumber 		= require('gulp-plumber');
var jade 				= require('gulp-jade');
var reload			= browserSync.reload;

var src = {
	scss: ['./app/blocks/**/*.scss'],
	dev: '_dev',
	build: '_build',
	jade: './**/*.jade'
};

gulp.task('sass:dev', function(){
	return gulp.src('app/app.scss')
	.pipe(plumber({
		errorHandler: function (error) {
			console.log(error.message);
			this.emit('end');
		}
	}))
	.pipe(cssGlobbing({
		extensions: ['.scss']
	}))
	.pipe(sass())
	.pipe(plumber.stop())
	.pipe(gulp.dest(src.dev + '/css'));
});

gulp.task('serve', function(){
	browserSync({
		server: {
			baseDir: './'
		}
	});

	gulp.watch([src.scss], ['sass:dev', reload]);
});

gulp.task('watch:jade', function(){
	gulp.watch([src.jade], ['jade']);
});

gulp.task('build', [], function(){
	runSequence('sass:dev');
});

gulp.task('jade', function(){
	gulp.src(src.jade)
	.pipe(jade())
	.pipe(gulp.dest('./html'));
});

gulp.task('default', ['build'], function(){});