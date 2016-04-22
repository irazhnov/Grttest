"use strict";

module.exports = function (config, gulp, uglify, rename) {
     return  gulp.src(config.WWW_PATH + '/js/scripts.js')
         .pipe(uglify())
         .pipe(rename({suffix: '.min'}))
         .pipe(gulp.dest(config.WWW_PATH + '/js/'))
};
