var gulp = require('gulp'),
    rename = require('gulp-rename');
    uglify = require('gulp-uglify'),
    runSequence = require('run-sequence'),
    concat = require('gulp-concat'),
    ngAnnotate = require('gulp-ng-annotate'),
    gulpConcat = require('./gulp/gulp-concat'),
    gulpMinifyJs = require('./gulp/gulp-minify-js'),
    gulpMinifyCss = require('./gulp/gulp-minify-css'),
    gulpMinifyHtml = require('./gulp/gulp-minify-html');


gulp.task('cj', function (){
    return gulpConcat(gulp, concat, ngAnnotate);
});
gulp.task('minjs', function (){
    gulpMinifyJs(gulp, uglify, rename);
});

gulp.task('mincss', function (){
    gulpMinifyCss(gulp, rename);
});

gulp.task('minhtml', function (){
    gulpMinifyHtml(gulp);
});

gulp.task('html', function() {
    return gulp.src('app/**/*.html')
        .pipe(gulp.dest('www'));
});

gulp.task('mock', function() {
    return gulp.src('app/mock/*.json')
        .pipe(gulp.dest('www/mock'));
});

gulp.task('build', function(callback) {
    runSequence( 'cj', 'html', 'mock', ['minjs','mincss', 'minhtml'], callback);

});

