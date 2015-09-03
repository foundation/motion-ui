var gulp = require('gulp');
var sass = require('gulp-sass');
var rubySass = require('gulp-ruby-sass');
var rename = require('gulp-rename');
var Super = require('supercollider').init;
var umd = require('gulp-umd');

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
    .pipe(gulp.dest('./build/assets'));
});

gulp.task('dist', ['sass', 'javascript'], function() {
  gulp.src('./build/assets/motion-ui.css')
    .pipe(gulp.dest('./dist'))
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(rename('motion-ui.min.css'))
    .pipe(gulp.dest('./dist'));

  return gulp.src('./build/assets/motion-ui.js')
    .pipe(gulp.dest('./dist'))
    .pipe(uglify())
    .pipe(rename('motion-ui.min.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['docs', 'sass', 'javascript'], function() {
  gulp.watch('./docs/*.md', ['docs']);
  gulp.watch(['./src/**/*.scss', './motion-ui.scss'], ['sass']);
  gulp.watch('./motion-ui.js', ['javascript']);
});
