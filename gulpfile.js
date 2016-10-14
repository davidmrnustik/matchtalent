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
	js: ['./app/base/utils/*.js','./app/base/*.js','./app/blocks/**/*.js','./app/app.js', '!./app/anti-spam-email.js'],
	css: [
		'./app/components/leaflet/dist/leaflet.css'
	],
	jscomponents: [
		'./app/components/modernizr-load/modernizr.js',
		'./app/components/jquery/jquery.js',
		'./app/components/slick-carousel/slick/slick.js',
		'./app/components/picturefill/dist/picturefill.js',
		'./app/components/smooth-scroll/dist/js/smooth-scroll.js'
	],
	jsothers: [
		'./app/components/leaflet/dist/leaflet.js',
		'./app/base/anti-spam-email.js'
	],
	slick: './app/components/slick-carousel/slick/ajax-loader.gif',
	fonts: ['./app/fonts/*', './app/components/font-awesome/fonts/*'],
	jslegacy: ['./app/components/respond/dest/respond.src.js'],
	img: ['./app/img/**/*', '!./app/img/fav*.*'],
	imgleaflet: './app/components/leaflet/dist/images/*',
	root: [
		'./app/img/favicon.ico',
		'./app/img/fav-icon-16.png',
		'./app/modules/**/*.php'
	],
	php: './app/modules/**/*.php',
	dev: '_dev',
	build: '_build',
	pug: ['./app/templates/**/*.pug', '!./app/templates/inc/{,/**}'],
	templates: './app/templates/**/*.html'
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

gulp.task('css', function(){
	gulp.src(src.css)
	.pipe(gp.cssnano())
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

gulp.task('jsothers', function(){
	gulp.src(src.jsothers)
	.pipe(gulp.dest(src.dev + "/js"));
});

gulp.task('jslegacy', function(){
	return gulp.src(src.jslegacy, { base: 'app' })
	.pipe(gp.sourcemaps.init())
		.pipe(gp.concat('legacy.js'))
		.pipe(gp.uglify())
	.pipe(gp.sourcemaps.write())
	.pipe(gulp.dest(src.dev + '/js'));
});

gulp.task('templates', function(){
	gulp.src(src.templates)
	.pipe(gulp.dest(src.dev));
});

gulp.task('serve', ['build'], function(){
	browserSync({
		server: [src.dev],
		notify: false
	});

	gulp.watch([src.scss, './app/*.scss'], ['sass:dev', reload]);
	gulp.watch([src.js], ['js', reload]);
	gulp.watch([src.img], ['images', reload]);
	//gulp.watch([src.templates], ['templates', reload]);
	gulp.watch(['./app/templates/**/*.pug'], ['pug', reload]);
	gulp.watch([src.php], ['root', reload]);
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

gulp.task('imgleaflet', function(){
	gulp.src(src.imgleaflet)
	.pipe(gulp.dest(src.dev + '/css/images'));
});

gulp.task('root', function(){
	gulp.src(src.root)
	.pipe(gulp.dest(src.dev));
});

gulp.task('fonts', function(){
	return gulp.src(src.fonts)
	.pipe(gulp.dest(src.dev + '/fonts'));
});

gulp.task('watch:pug', function(){
	gulp.watch([src.pug], ['pug']);
});

gulp.task('build', ['clean'], function(){
	runSequence('pug', 'sass:dev', 'css', 'js', 'jscomponents', 'jscomponentsie', 'jsothers', 'jslegacy', 'slick', 'fonts', 'images', 'imgleaflet', 'root');
});

gulp.task('pug', function buildHTML(){
	return gulp.src(src.pug)
	.pipe(gp.pug())
	.pipe(gulp.dest(src.dev));
});

gulp.task('deploy:dev', ['build'], function(){
  return gp.surge({
    project: src.dev,
    domain: 'matchtalent.surge.sh'
  })
})

gulp.task('default', ['serve'], function(){});