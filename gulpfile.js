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
		'./app/components/jquery/jquery.js',
		'./app/components/slick-carousel/slick/slick.js',
		'./app/components/picturefill/dist/picturefill.js'
	],
	slick: './app/components/slick-carousel/slick/ajax-loader.gif',
	fonts: ['./app/fonts/*', './app/components/font-awesome/fonts/*'],
	jslegacy: ['./app/components/respond/dest/respond.src.js'],
	img: './app/img/**/*',
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
	.pipe(gp.pixrem())
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

gulp.task('jscomponentsie', function(){
	return gulp.src(src.jscomponents, { base: 'app' })
		.pipe(gp.concat('components_ie.js'))
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
	gulp.watch([src.img], ['images', reload]);
});

gulp.task('slick', function(){
	return gulp.src(src.slick)
	.pipe(gulp.dest(src.dev + '/css'));
});

gulp.task('images', function(){
	return gulp.src(src.img)
	.pipe(gp.cache(gp.imagemin({
		optimizationLevel: 3,
			progresive: true,
			interlaced: true
	})))
	.pipe(gulp.dest(src.dev + '/img'));
});


gulp.task('fonts', function(){
	return gulp.src(src.fonts)
	.pipe(gulp.dest(src.dev + '/fonts'));
});

gulp.task('watch:jade', function(){
	gulp.watch([src.jade], ['jade']);
});

gulp.task('build', ['clean'], function(){
	runSequence('sass:dev', 'js', 'jscomponents', 'jscomponentsie', 'jslegacy', 'slick', 'fonts', 'images');
});

gulp.task('jade', function(){
	gulp.src(src.jade)
	.pipe(gp.jade())
	.pipe(gulp.dest('./html'));
});

gulp.task('default', ['serve'], function(){});