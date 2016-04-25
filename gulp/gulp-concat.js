'use strict';

module.exports = function(gulp, concat, ngAnnotate) {
    var scripts = [
        'node_modules/angular/angular.min.js',
        'node_modules/angular-ui-router/release/angular-ui-router.min.js',
        'app/js/configuration/*.js',
        'app/js/controllers/*.js',
        'app/js/directives/*.js',
        'app/js/services/*.js'
        ];

    return gulp.src(scripts)
        .pipe(concat('scripts.js'))
        .pipe(ngAnnotate())
        .pipe(gulp.dest('tmp'));
};