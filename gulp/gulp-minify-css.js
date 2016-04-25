"use strict";

module.exports = function (gulp, rename) {
    var cssmin = require('gulp-cssmin');


    return  gulp.src('app/styles/main.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('www/styles'));
};
