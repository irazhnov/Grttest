'use strict';

module.exports = function(config, gulp, concat) {
    var scripts = [
        'node_modules/angular/angular.min.js',
        'node_modules/angular-route/angular-route.min.js',
        'node_modules/angular-ui-router/release/angular-ui-router.min.js',
        'app/js/configuration/*.js',
        'app/js/controllers/*.js',
        'app/js/directives/*.js',
        'app/js/services/*.js'
        ];

    return gulp.src(scripts)
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest(config.WWW_PATH + '/js/'));
};