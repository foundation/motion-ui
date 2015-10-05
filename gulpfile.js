var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var sequence = require('run-sequence');
var rimraf = require('rimraf').sync;
var rubySass = require('gulp-ruby-sass');
var rename = require('gulp-rename');
var Super = require('supercollider').init;
var uglify = require('gulp-uglify');
var umd = require('gulp-umd');
var minifyCSS = require('gulp-minify-css');

var COMPATIBILITY = [
  'last 2 versions',
  'ie >= 9',
  'and_chr >= 2.3'
];

gulp.task('clean', function(done) {
  rimraf('./_build');
  rimraf('./docs/*.md');
  done();
});

gulp.task('docs', function() {
  return gulp.src('./docs/src/*.md')
    .pipe(Super({
      template: './docs/src/_template.hbs',
      adapters: ['sass'],
      extension: 'md',
      marked: false
    }))
    .pipe(gulp.dest('./docs'));
});

gulp.task('sass', function() {
  return gulp.src('./motion-ui.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: COMPATIBILITY
    }))
    .pipe(gulp.dest('./_build'));
});

gulp.task('javascript', function() {
  return gulp.src('./motion-ui.js')
    .pipe(umd({
      dependencies: function(file) {
        return [{ name: 'jquery', amd: 'jquery', cjs: 'jquery', global: 'jQuery', param: '$' }];
      },
      exports: function(file) {
        return 'MotionUI';
      },
      namespace: function(file) {
        return 'MotionUI';
      }
    }))
    .pipe(gulp.dest('./_build'));
});

gulp.task('dist', ['dist:sass', 'dist:javascript']);

gulp.task('dist:sass', ['sass'], function() {
  return gulp.src('./_build/motion-ui.css')
    .pipe(gulp.dest('./dist'))
    .pipe(minifyCSS())
    .pipe(rename('motion-ui.min.css'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('dist:javascript', ['javascript'], function() {
  return gulp.src('./_build/motion-ui.js')
    .pipe(gulp.dest('./dist'))
    .pipe(uglify())
    .pipe(rename('motion-ui.min.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('build', function(done) {
  sequence('clean', ['docs', 'sass', 'javascript'], done);
});

gulp.task('default', ['build'], function() {
  gulp.watch(['./docs/src/*.md', './docs/src/_template.hbs'], ['docs']);
  gulp.watch(['./src/**/*.scss', './motion-ui.scss'], ['sass']);
  gulp.watch('./motion-ui.js', ['javascript']);
});
