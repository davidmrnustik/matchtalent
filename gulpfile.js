'use strict';

var gulp 						= require('gulp');
var runSequence	 		=	require('run-sequence');
var gulpLoadPlugins = require('gulp-load-plugins');
var gp 							= gulpLoadPlugins();
var browserSync	 		=	require('browser-sync');
var reload					= browserSync.reload;

var src = {
	scss: ['./app/base/**/*.scss','./app/blocks/**/*.scss'],
	js: ['./app/base/**/*.js','./app/blocks/**/*.js','./app/app.js'],
	dev: '_dev',
	build: '_build',
	jade: './**/*.jade'
};

gulp.task('sass:dev', function(){
	return gulp.src('app/app.scss')
	.pipe(gp.plumber({
		errorHandler: function (error) {
			console.log(error.message);
			this.emit('end');
		}
	}))
	.pipe(gp.sourcemaps.init())
	.pipe(gp.cssGlobbing({
		extensions: ['.scss']
	}))
	.pipe(gp.sass())
	.pipe(gp.cssnano())
	.pipe(gp.plumber.stop())
	.pipe(gp.sourcemaps.write())
	.pipe(gulp.dest(src.dev + '/css'));
});

gulp.task('js', function(){
	return gulp.src(src.js, { base: 'app' })
	.pipe(gp.sourcemaps.init())
		.pipe(gp.concat('app.js'))
		.pipe(gp.uglify())
	.pipe(gp.sourcemaps.write())
	.pipe(gulp.dest(src.dev + '/js'));
});

gulp.task('serve', ['build'], function(){
	browserSync({
		server: {
			baseDir: './'
		}
	});

	gulp.watch([src.scss, './app/app.scss'], ['sass:dev', reload]);
	gulp.watch([src.js], ['js', reload]);
});

gulp.task('watch:jade', function(){
	gulp.watch([src.jade], ['jade']);
});

gulp.task('build', [], function(){
	runSequence('sass:dev', 'js');
});

gulp.task('jade', function(){
	gulp.src(src.jade)
	.pipe(gp.jade())
	.pipe(gulp.dest('./html'));
});

gulp.task('default', ['build'], function(){});