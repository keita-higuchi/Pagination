import gulp from 'gulp'
import pug from 'gulp-pug'
import less from 'gulp-less'
import cleanCss from 'gulp-clean-css'
import plumber from 'gulp-plumber'

import webpackStream from 'webpack-stream'
import webpack from 'webpack'
import webpackConfig from './webpack.config'

gulp.task('watch', () => {
    gulp.watch('./src/js/**/*.js', ['build'])
    gulp.watch('./src/pug/**/*.pug', ['pug'])
    gulp.watch('./src/less/**/*.less', ['less'])
});

gulp.task("build", () => {
    return gulp.src('')
        .pipe(webpackStream(webpackConfig, webpack))
        .pipe(gulp.dest("example/js"))
});


gulp.task('pug', () => {
  gulp.src(['./src/pug/**/*.pug'])
    .pipe(plumber())
    .pipe(pug({
      basedir: './src/pug'
    }))
    .pipe(gulp.dest('./'))
});

gulp.task('less', () => {
  gulp.src(['./src/less/**/*.less'])
    .pipe(plumber())
    .pipe(less())
    .pipe(cleanCss())
    .pipe(gulp.dest('example/css'))
});

gulp.task('default', ['watch']);
