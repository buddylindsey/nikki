var gulp = require('gulp');
var stylus = require('gulp-stylus');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');


var paths = {
  scripts: ['static/js/app.js'],
  css: ['static/stylus/*.styl']
};

gulp.task('stylus', function () {
  gulp.src('./static/stylus/*.styl')
    .pipe(stylus())
    .pipe(gulp.dest('./static/build/css'));
});

gulp.task('app', function () {
  gulp.src('./static/js/app.js')
    .pipe(gulp.dest('./staticfiles/js'));
});

gulp.task('vendor', function () {
  gulp.src('./static/css/*.css')
    .pipe(concat('vendor.css'))
    .pipe(rename({extname: ".min.css"}))
    .pipe(gulp.dest('./static/build/css'));
  gulp.src([
    './static/js/jquery-2.1.1-min.js',
    './static/js/bootstrap-3.2.0.min.js',
    './static/js/underscore-1.6.0-min.js',
    './static/js/backbone-1.1.2-min.js',
    './static/js/django-csrf.js'])
    .pipe(concat('vendor.js'))
    .pipe(rename({extname: ".min.js"}))
    .pipe(gulp.dest('./static/build/js'));
});

gulp.task('watch', function () {
  gulp.watch(paths.scripts, ['app']);
  gulp.watch(paths.css, ['stylus']);
});

gulp.task('default', ['watch', 'stylus', 'vendor', 'app']);
