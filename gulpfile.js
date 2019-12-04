const gulp = require('gulp');

const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const browsersync = require('browser-sync');
const autoprefixer = require('gulp-autoprefixer');
const pug = require('gulp-pug');

gulp.task('styles', () =>  {
  return gulp.src('./src/style.scss')
    .pipe(plumber())
    .pipe(sass({
      precision: 7
    }))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./docs'))
    .pipe(browsersync.stream())
});

gulp.task('html', () =>  {
  return gulp.src('./src/index.pug')
    .pipe(plumber())
    .pipe(pug())
    .pipe(gulp.dest('./docs'))
    .on('end', browsersync.reload)
});

gulp.task('server', (done) => {
  browsersync.init({
    server: './docs/',
    port: 4000,
    notify: true
  });

  gulp.watch('./src/style.scss', {usePolling: true}, gulp.series('styles'));
  gulp.watch('./src/index.pug', {usePolling: true}, gulp.series('html'));

  done();
});

gulp.task('dev', gulp.series('styles', 'html', 'server'));
gulp.task('build', gulp.series('styles', 'html'));

gulp.task('default', gulp.series('dev'));
