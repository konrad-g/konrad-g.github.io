var gulp = require('gulp');
var fs = require("fs");
var clean = require('gulp-clean');
var runSequence = require('gulp-run-sequence');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var concatJs = require('gulp-concat');
var concatCss = require('gulp-concat-css');
var rename = require("gulp-rename");
var replace = require('gulp-replace');
var sourcemaps = require('gulp-sourcemaps');

var OUTPIT_FOLDER_PATH = './dist';

// Client imports

var IMPORT_STYLES = [

  // Styles
  "./bower_components/bootstrap/dist/css/bootstrap.min.css",
  "./bower_components/bootstrap/dist/css/bootstrap-theme.min.css",

  // General
  "./styles/main.css"
];

var IMPORT_SCRIPTS = [
  "./scripts/GoogleAnalytics.js"
];

gulp.task('clean', function () {
  // Clean output folder
  return gulp.src(OUTPIT_FOLDER_PATH, {read: false})
    .pipe(clean({force: true}));
});

gulp.task('minimize-js', function () {

  gulp.src(IMPORT_SCRIPTS)
    .pipe(concatJs({path: 'scripts.min.js'}))
    .pipe(uglify())
    .pipe(gulp.dest(OUTPIT_FOLDER_PATH));

});

gulp.task('minimize-css', function () {

  gulp.src(IMPORT_STYLES)
    .pipe(concatCss('styles.min.css', {rebaseUrls: true}))
    .pipe(cleanCSS({relativeTo: './public/out/', target: './public/out/', rebase: true}))
    .pipe(gulp.dest(OUTPIT_FOLDER_PATH));

});

/**
 * Build production project
 */
gulp.task('build', ['clean'], function () {
  runSequence(
    'minimize-js', 'minimize-css');
});
