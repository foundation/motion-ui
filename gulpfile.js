var gulp = require('gulp');
var sass = require('gulp-sass');
var rubySass = require('gulp-ruby-sass');
var rename = require('gulp-rename');
var Super = require('supercollider').init;

gulp.task('docs', function() {
  return gulp.src('./docs/*.md')
    .pipe(Super({
      template: './docs/_template.html',
      adapters: ['sass']
    }))
    .pipe(gulp.dest('./build'));
});

gulp.task('sass', function() {
  return rubySass('./motion-ui.scss')
    .on('error', function (err) {
      console.error('Error:', err.message);
    })
    .pipe(gulp.dest('./build/assets'));
});

gulp.task('dist', ['sass'], function() {
  return gulp.src('./build/assets/motion-ui.css')
    .pipe(gulp.dest('./dist'))
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(rename('motion-ui.min.css'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['docs', 'sass'], function() {
  gulp.watch('./docs/*.md', ['docs']);
  gulp.watch(['./src/**/*.scss', './motion-ui.scss'], ['sass']);
});