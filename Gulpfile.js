'use strict';

var path = require('path');
var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');
var gutil = require('gulp-util');
var webpack = require('webpack');
var del = require('del');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
const webpackConfig = require('./webpack.config.js');


const projectDir = path.resolve(__dirname, './webapp');
const sourceStyles = `${projectDir}/sass`;
const outputStyles = `${projectDir}/static/stylesheets`;
const sourceJS = `${projectDir}/react`;


const SASS_PATHS = [
  './node_modules/govuk-elements-sass/public/sass',
  './node_modules/govuk_frontend_toolkit/stylesheets',
  './node_modules/govstrap/sass'
];

console.log(outputStyles);

gulp.task('css', (done) => {
  const sourcemaps = require('gulp-sourcemaps');
  gulp.src(`${sourceStyles}/styles.scss`)
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: SASS_PATHS
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['> 1%', 'last 2 versions', 'IE 9']
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(outputStyles));
  done();
});

gulp.task('webpack', done => {
  webpack(webpackConfig).run((err, stats) => {
    if (err) { throw new gutil.PluginError('webpack', err); }

    gutil.log('[webpack]', stats.toString({
      colors: true,
      chunks: false
    }));
    done();
  });
});

gulp.task('watch', (done) => {
  gulpSequence('build', 'serve', 'browserSync', () => {
    gulp.watch(`${sourceJS}/**/*.js`, ['webpack']);
    gulp.watch(`${sourceStyles}/**/*.scss`, ['css']);
    done();
  });
});

gulp.task('build', (done) => {
  gulpSequence('css','webpack', done);
});

gulp.task('default', ['build']);
