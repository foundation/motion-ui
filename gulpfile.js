var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');

gulp.task('compile', function() {
  gulp.src('./src/motion-ui.scss')
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(gulp.dest('./build'));
});

gulp.task('dist', ['compile'], function() {
  gulp.src('./build/motion-ui.css')
    .pipe(gulp.dest('./dist'))
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(rename('motion-ui.min.css'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['compile'], function() {
  gulp.watch('./motion-ui.scss', ['compile']);
});