import gulp from 'gulp';
import sass from 'gulp-sass';
// import sassGlob from 'gulp-sass-glob';
import cssImport from 'gulp-cssimport';
import plumber from 'gulp-plumber';
import autoprefixer from 'gulp-autoprefixer';
import gcmq from 'gulp-group-css-media-queries';
import cleanCSS from 'gulp-clean-css';
import rename from 'gulp-rename';
import gulpif from 'gulp-if';
import config from '../config';

export const stylesBuild = () => (
  gulp.src(`${config.src.sass}/main.scss`, { sourcemaps: config.isDev })
    .pipe(plumber())
    // .pipe(sassGlob())
    .pipe(sass())
    .pipe(cssImport({
      includePaths: ['./node_modules'],
    }))
    .pipe(gulpif(config.isProd, gcmq()))
    .pipe(gulpif(config.isProd, autoprefixer()))
    .pipe(gulpif(config.isProd, cleanCSS({ level: 2 })))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(config.dest.css, { sourcemaps: config.isDev }))
);

export const stylesWatch = () => gulp.watch(`${config.src.sass}/**/*.scss`, stylesBuild);
