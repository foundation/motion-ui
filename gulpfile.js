var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var Super = require('supercollider').init;

gulp.task('docs', function() {
  gulp.src('./docs/*.md')
    .pipe(Super({
      template: './docs/_template.html',
      adapters: ['sass']
    }))
    .pipe(gulp.dest('./build'));
});

gulp.task('sass', function() {
  gulp.src('./src/motion-ui.scss')
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(gulp.dest('./build/assets'));
});

gulp.task('dist', ['sass'], function() {
  gulp.src('./build/motion-ui.css')
    .pipe(gulp.dest('./dist'))
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(rename('motion-ui.min.css'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['docs', 'sass'], function() {
  gulp.watch('./docs/*.md', ['docs']);
  gulp.watch('./src/**/*.scss', ['sass']);
});