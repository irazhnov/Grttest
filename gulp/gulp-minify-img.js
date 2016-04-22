'use strict';

module.exports = function (gulp) {
  var imagemin = require('gulp-imagemin'),
      pngquant = require('imagemin-pngquant');

  return gulp.src('app/images/*')
      .pipe(imagemin({
        progressive: true,
        optimizationLevel: 1,
        //svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
      }))
      .pipe(gulp.dest('www/images'));
};
