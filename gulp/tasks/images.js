import gulp from 'gulp';
import gulpif from 'gulp-if';
import rename from 'gulp-rename';
import changed from 'gulp-changed';
import imagemin from 'gulp-imagemin';
import imageminPngquant from 'imagemin-pngquant';
import imageminWebp from 'imagemin-webp';
import config from '../config';

const copyImages = () => (
  gulp.src(`${config.src.images}/**/*`)
    .pipe(changed(config.dest.images))
    .pipe(gulpif(config.isProd, imagemin([
      imagemin.mozjpeg({ quality: 80 }),
      imageminPngquant({ quality: [0.8, 0.9] }),
      imagemin.svgo(),
    ]))) // ], { verbose: true } // info
    .pipe(gulp.dest(config.dest.images))
);

const convertImagesToWebp = () => (
  gulp.src(`${config.src.images}/**/*.{jpg, png}`)
    .pipe(changed(config.dest.images, { extension: '.webp' }))
    .pipe(imagemin([
      imageminWebp({ quality: 80 }),
    ]))
    .pipe(rename({
      extname: '.webp',
    }))
    .pipe(gulp.dest(config.dest.images))
);

export const imagesBuild = () => gulp.series(copyImages, convertImagesToWebp);
export const imagesWatch = () => gulp.watch(`${config.src.images}/**/*`, imagesBuild);
