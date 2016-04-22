"use strict";

module.exports = function (gulp) {
    var htmlmin = require('gulp-htmlmin');

    return gulp.src('app/**/*.html')
        .pipe(htmlmin({collapseWhitespace: true, removeComments: true, minifyURLs: true}))
        .pipe(gulp.dest('www/'))
};