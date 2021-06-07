import gulp from 'gulp';
import svgSprite from 'gulp-svg-sprite';
import config from '../config';

const spriteMono = () => (
  gulp.src(`${config.src.iconMono}/**/*.svg`)
    .pipe(svgSprite({
      mode: {
        symbol: '../sprites/sprite-mono.svg',
      },
      shape: {
        transform: [
          {
            svgo: {
              plugins: [
                {
                  removeAttrs: {
                    attrs: ['class', 'data-name', 'fill', 'stroke.*'],
                  },
                },
              ],
            },
          },
        ],
      },
    }))
    .pipe(gulp.dest(config.dest.images))
);

const spriteMulti = () => (
  gulp.src(`${config.src.iconMulti}/**/*.svg`)
    .pipe(svgSprite({
      mode: {
        symbol: '../sprites/sprite-multi.svg',
      },
      shape: {
        transform: [
          {
            svgo: {
              plugins: [
                {
                  removeAttrs: {
                    attrs: ['class', 'data-name'],
                  },
                },
                {
                  removeUselessStrokeAndFill: false,
                },
                {
                  inlineStyles: true,
                },
              ],
            },
          },
        ],
      },
    }))
    .pipe(gulp.dest(config.dest.images))
);

export const spritesBuild = () => gulp.parallel(spriteMono, spriteMulti);

export const spritesWatch = () => {
  gulp.watch(`${config.src.iconMono}/**/*.svg`, spriteMono);
  gulp.watch(`${config.src.iconMulti}/**/*.svg`, spriteMulti);
};
