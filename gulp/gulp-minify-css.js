"use strict";

module.exports = function (config, gulp, rename) {
    var cssmin = require('gulp-cssmin');


    return  gulp.src(config.STYLES_PATH + 'main.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(config.WWW_PATH + 'styles'));
};
