'use strict';

var gulp 						= require('gulp');
var del 						=	require('del');
var runSequence	 		=	require('run-sequence');
var gulpLoadPlugins = require('gulp-load-plugins');
var gp 							= gulpLoadPlugins();
var browserSync	 		=	require('browser-sync');
var reload					= browserSync.reload;
var fs 							= require('fs');

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
		'./app/modules/**/*.php',
		'./.htaccess'
	],
	php: './app/modules/**/*.php',
	dev: '_dev',
	build: '_build',
	translations: './app/translations/**/*',
	pug: ['./app/templates/**/*.pug', '!./app/templates/inc/{,/**}'],
	templates: './app/templates/**/*.html'
};

var getJsonData = function(file) {
	return JSON.parse(fs.readFileSync(file + '.json'));
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
	.pipe(gp.pixrem())
	.pipe(gp.plumber.stop())
	.pipe(gp.sourcemaps.write())
	.pipe(gulp.dest(src.dev + '/css'));
});

gulp.task('sass:build', function(){
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
	.pipe(gp.sass())
	.pipe(gp.cssnano())
	.pipe(gp.pixrem())
	.pipe(gp.plumber.stop())
	.pipe(gulp.dest(src.build + '/css'));
});

gulp.task('css:dev', function(){
	gulp.src(src.css)
	.pipe(gulp.dest(src.dev + '/css'));
});

gulp.task('css:build', function(){
	gulp.src(src.css)
	.pipe(gp.cssnano())
	.pipe(gulp.dest(src.build + '/css'));
});


gulp.task('js:dev', function(){
	return gulp.src(src.js, { base: 'app' })
	.pipe(gp.sourcemaps.init())
		.pipe(gp.concat('app.js'))
		.pipe(gp.uglify())
	.pipe(gp.sourcemaps.write())
	.pipe(gulp.dest(src.dev + '/js'));
});

gulp.task('js:build', function(){
	return gulp.src(src.js, { base: 'app' })
		.pipe(gp.concat('app.js'))
		.pipe(gp.uglify())
	.pipe(gulp.dest(src.build + '/js'));
});

gulp.task('jscomponents:dev', function(){
	return gulp.src(src.jscomponents, { base: 'app' })
	//.pipe(gp.sourcemaps.init())
		.pipe(gp.concat('components.js'))
		.pipe(gp.uglify())
	//.pipe(gp.sourcemaps.write())
	.pipe(gulp.dest(src.dev + '/js'));
});

gulp.task('jscomponents:build', function(){
	return gulp.src(src.jscomponents, { base: 'app' })
		.pipe(gp.concat('components.js'))
		.pipe(gp.uglify())
	.pipe(gulp.dest(src.build + '/js'));
});

gulp.task('jscomponentsie:dev', function(){
	return gulp.src(src.jscomponents, { base: 'app' })
		.pipe(gp.concat('components_ie.js'))
		.pipe(gulp.dest(src.dev + '/js'));
});

gulp.task('jscomponentsie:build', function(){
	return gulp.src(src.jscomponents, { base: 'app' })
		.pipe(gp.concat('components_ie.js'))
		.pipe(gulp.dest(src.build + '/js'));
});

gulp.task('jsothers:dev', function(){
	gulp.src(src.jsothers)
	.pipe(gulp.dest(src.dev + "/js"));
});

gulp.task('jsothers:build', function(){
	gulp.src(src.jsothers)
	.pipe(gulp.dest(src.build + "/js"));
});

gulp.task('jslegacy:dev', function(){
	return gulp.src(src.jslegacy, { base: 'app' })
	.pipe(gp.sourcemaps.init())
		.pipe(gp.concat('legacy.js'))
		.pipe(gp.uglify())
	.pipe(gp.sourcemaps.write())
	.pipe(gulp.dest(src.dev + '/js'));
});

gulp.task('jslegacy:build', function(){
	return gulp.src(src.jslegacy, { base: 'app' })
		.pipe(gp.concat('legacy.js'))
		.pipe(gp.uglify())
	.pipe(gulp.dest(src.build + '/js'));
});

gulp.task('slick:dev', function(){
	return gulp.src(src.slick)
	.pipe(gulp.dest(src.dev + '/css'));
});

gulp.task('slick:build', function(){
	return gulp.src(src.slick)
	.pipe(gulp.dest(src.build + '/css'));
});

gulp.task('images:dev', function(){
	return gulp.src(src.img)
	.pipe(gp.cache(gp.imagemin({
		optimizationLevel: 3,
			progresive: true,
			interlaced: true
	})))
	.pipe(gulp.dest(src.dev + '/img'));
});

gulp.task('images:build', function(){
	return gulp.src(src.img)
	.pipe(gp.cache(gp.imagemin({
		optimizationLevel: 3,
			progresive: true,
			interlaced: true
	})))
	.pipe(gulp.dest(src.build + '/img'));
});

gulp.task('imgleaflet:dev', function(){
	gulp.src(src.imgleaflet)
	.pipe(gulp.dest(src.dev + '/css/images'));
});

gulp.task('imgleaflet:build', function(){
	gulp.src(src.imgleaflet)
	.pipe(gulp.dest(src.build + '/css/images'));
});

gulp.task('root:dev', function(){
	gulp.src(src.root)
	.pipe(gulp.dest(src.dev));
});

gulp.task('root:build', function(){
	gulp.src(src.root)
	.pipe(gulp.dest(src.build));
});

gulp.task('fonts:dev', function(){
	return gulp.src(src.fonts)
	.pipe(gulp.dest(src.dev + '/fonts'));
});

gulp.task('fonts:build', function(){
	return gulp.src(src.fonts)
	.pipe(gulp.dest(src.build + '/fonts'));
});

gulp.task('pug:dev', function (){
	return gulp.src(src.pug)
	.pipe(gp.data(getJsonData('./app/translations/es')))
	.pipe(gp.pug({pretty: true}))
	.pipe(gulp.dest(src.dev));
});

gulp.task('pug:build', function (){
	return gulp.src(src.pug)
	.pipe(gp.pug())
	.pipe(gulp.dest(src.build));
});

gulp.task('dev', ['clean'], cb=> {
	runSequence(
		'pug:dev', 'sass:dev', 'css:dev', 'js:dev', 'jscomponents:dev', 'jscomponentsie:dev', 'jsothers:dev', 'jslegacy:dev', 'slick:dev', 'fonts:dev', 'images:dev', 'imgleaflet:dev', 'root:dev', cb
	);
});

gulp.task('build', ['clean'], function(){
	runSequence('pug:build', 'sass:build', 'css:build', 'js:build', 'jscomponents:build', 'jscomponentsie:build', 'jsothers:build', 'jslegacy:build', 'slick:build', 'fonts:build', 'images:build', 'imgleaflet:build', 'root:build');
});

gulp.task('deploy:dev', ['dev'], function(){
  return gp.surge({
    project: src.dev,
    domain: 'matchtalent.surge.sh'
  })
})

gulp.task('default', ['dev'], function(){
	browserSync({
		server: [src.dev],
		notify: false
	});

	gulp.watch([src.scss, './app/*.scss'], ['sass:dev', reload]);
	gulp.watch([src.js], ['js:dev', reload]);
	gulp.watch([src.img], ['images:dev', reload]);
	gulp.watch(['./app/templates/**/*.pug'], ['pug:dev', reload]);
	gulp.watch(src.translations, ['pug:dev', reload]);
	gulp.watch([src.php], ['root:dev', reload]);
});