var gulp			= require('gulp');
var sass			= require('gulp-sass');
var clean			= require('gulp-clean');
var runSequence		= require('gulp-sequence');
var browserSync		= require('browser-sync');
var minifyCss 		= require('gulp-clean-css');
var cssGlobbing 	= require('gulp-css-globbing');
var plumber 		= require('gulp-plumber');
var pixrem 			= require('gulp-pixrem');
var uglify 			= require('gulp-uglify');
var rename 			= require("gulp-rename");
var concat 			= require('gulp-concat');
var reload			= browserSync.reload;
var surge 			= require('gulp-surge');
var htmlmin = require('gulp-htmlmin');