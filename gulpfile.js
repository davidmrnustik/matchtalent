'use strict';

var gulp 						= require('gulp');
var del 						=	require('del');
var runSequence	 		=	require('run-sequence');
var gulpLoadPlugins = require('gulp-load-plugins');
var gp 							= gulpLoadPlugins();
var browserSync	 		=	require('browser-sync');
var reload					= browserSync.reload;

var src = {
	scss: ['./app/**/*.scss'],
	js: ['./app/base/utils/*.js','./app/base/*.js','./app/blocks/**/*.js','./app/app.js'],
	jscomponents: [
		'./app/components/modernizr-load/modernizr.js',
		'./app/components/jquery/dist/jquery.slim.js',
		'./app/components/slick-carousel/slick/slick.js'
	],
	slick: './app/components/slick-carousel/slick/ajax-loader.gif',
	slickFonts: './app/components/slick-carousel/slick/fonts/*',
	jslegacy: ['./app/components/respond/dest/respond.src.js'],
	dev: '_dev',
	build: '_build',
	jade: './**/*.jade'
};

gulp.task('clean', function(){
	return del.sync([src.dev, src.build]);
});

gulp.task('sass:dev', function(){
	return gulp.src(['./app/*.scss'])
	.pipe(gp.plumber({
		errorHandler: function (error) {
			console.log(error.message);
			this.emit('end');
		}
	}))
	.pipe(gp.cssGlobbing({
		extensions: ['.scss']
	}))
	.pipe(gp.sourcemaps.init())
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

gulp.task('jscomponents', function(){
	return gulp.src(src.jscomponents, { base: 'app' })
	//.pipe(gp.sourcemaps.init())
		.pipe(gp.concat('components.js'))
		.pipe(gp.uglify())
	//.pipe(gp.sourcemaps.write())
	.pipe(gulp.dest(src.dev + '/js'));
});

gulp.task('jslegacy', function(){
	return gulp.src(src.jslegacy, { base: 'app' })
	.pipe(gp.sourcemaps.init())
		.pipe(gp.concat('legacy.js'))
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

	gulp.watch([src.scss, './app/*.scss'], ['sass:dev', reload]);
	gulp.watch([src.js], ['js', reload]);
});

gulp.task('slick', ['slick-fonts'], function(){
	return gulp.src(src.slick)
	.pipe(gulp.dest(src.dev + '/css'));
});

gulp.task('slick-fonts', function(){
	return gulp.src(src.slickFonts)
	.pipe(gulp.dest(src.dev + '/css/fonts'));
});

gulp.task('watch:jade', function(){
	gulp.watch([src.jade], ['jade']);
});

gulp.task('build', ['clean'], function(){
	runSequence('sass:dev', 'js', 'jscomponents', 'jslegacy', 'slick');
});

gulp.task('jade', function(){
	gulp.src(src.jade)
	.pipe(gp.jade())
	.pipe(gulp.dest('./html'));
});

gulp.task('default', ['serve'], function(){});