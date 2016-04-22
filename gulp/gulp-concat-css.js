"use strict";

module.exports = function(config, gulp, concat) {
    var sources = [
        config.STYLES_PATH + '*.css'
    ];
    return gulp.src(sources)
        .pipe(concat('main.css'))
        .pipe(gulp.dest(config.WWW_PATH + '\\css\\'));
};