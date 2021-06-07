import gulp from 'gulp';
import gulpif from 'gulp-if';
import plumber from 'gulp-plumber';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import gcmq from 'gulp-group-css-media-queries';
import cleanCSS from 'gulp-clean-css';
import rename from 'gulp-rename';
import config from '../config';

export const stylesBuild = () => (
  gulp.src(`${config.src.sass}/styles.scss`, { sourcemaps: config.isDev })
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulpif(config.isProd, gcmq()))
    .pipe(gulpif(config.isProd, autoprefixer()))
    .pipe(gulpif(config.isProd, cleanCSS({ level: 2 })))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(config.dest.css))
);

export const stylesWatch = () => gulp.watch(`${config.src.sass}/**/*.scss`, stylesBuild);
