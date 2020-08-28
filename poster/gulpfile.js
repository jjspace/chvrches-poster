const gulp = require('gulp');
const clean = require('gulp-clean');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const sass = require('gulp-sass');

// ====== Static Files ======
gulp.task('html', () => gulp.src('./src/**/*.html').pipe(gulp.dest('./dist')));
gulp.task('html:watch', () => {
  gulp.watch('./src/**/*.html', gulp.series('html'));
});

gulp.task('audio', () => gulp.src('./src/audio/**/*').pipe(gulp.dest('./dist/audio')));
gulp.task('audio:watch', () => {
  gulp.watch('./src/audio/**/*', gulp.series('audio'));
});

gulp.task('img', () => gulp.src('./src/img/**/*').pipe(gulp.dest('./dist/img')));
gulp.task('img:watch', () => {
  gulp.watch('./src/img/**/*', gulp.series('img'));
});

gulp.task('fonts', () => gulp.src('./src/fonts/**/*').pipe(gulp.dest('./dist/fonts')));
gulp.task('fonts:watch', () => {
  gulp.watch('./src/fonts/**/*', gulp.series('fonts'));
});

// ====== Styles ======
gulp.task('sass', () => {
  const processors = [autoprefixer, cssnano];

  return gulp
    .src('./src/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(postcss(processors))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css'));
});
gulp.task('sass:watch', () => {
  gulp.watch('./src/sass/**/*.scss', gulp.series('sass'));
});

// ====== JavaScript ======
gulp.task('js', () => gulp.src('./src/js/**/*.js').pipe(gulp.dest('./dist/js')));
gulp.task('js:watch', () => {
  gulp.watch('./src/js/**/*.js', gulp.series('js'));
});

// ====== Control tasks ======
gulp.task('clean', () => gulp.src('./dist', { read: false, allowEmpty: true }).pipe(clean()));
gulp.task('static', gulp.parallel('html', 'audio', 'img', 'fonts'));
gulp.task('static:watch', gulp.parallel('html:watch', 'audio:watch', 'img:watch', 'fonts:watch'));
gulp.task('build', gulp.series('clean', 'static', 'sass', 'js'));
gulp.task('build:watch', gulp.parallel('static:watch', 'sass:watch', 'js:watch'));

gulp.task('default', gulp.series('build'));
