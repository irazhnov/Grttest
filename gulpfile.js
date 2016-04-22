var gulp = require('gulp'),
    rename = require('gulp-rename');
    uglify = require('gulp-uglify'),
    runSequence = require('run-sequence'),
    concat = require('gulp-concat'),
    config = require('./gulp/gulp-config'),
    ngAnnotate = require('gulp-ng-annotate'),
    gulpConcatCss = require('./gulp/gulp-concat-css'),
    gulpConcat = require('./gulp/gulp-concat'),
    gulpMinifyJs = require('./gulp/gulp-minify-js'),
    gulpMinifyCss = require('./gulp/gulp-minify-css'),
    gulpMinifyHtml = require('./gulp/gulp-minify-html'),
    gulpMinifyImg = require('./gulp/gulp-minify-img');


gulp.task('cs', function (){
    return gulpConcatCss(config, gulp, concat);
});
gulp.task('cj', function (){
    return gulpConcat(config, gulp, concat, ngAnnotate);
});
gulp.task('minjs', function (){
    gulpMinifyJs(config, gulp, uglify, rename);
});

gulp.task('mincss', function (){
    gulpMinifyCss(config, gulp, rename);
});

gulp.task('minhtml', function (){
    gulpMinifyHtml(gulp);
});

gulp.task('minimg', function (){
    gulpMinifyImg(gulp);
});

gulp.task('html', function() {
    return gulp.src('app/**/*.html')
        .pipe(gulp.dest('www'));
});

gulp.task('mock', function() {
    return gulp.src('app/mock/*.json')
        .pipe(gulp.dest('www/mock'));
});

gulp.task('img', function() {
    return gulp.src('app/images/*.*')
        .pipe(gulp.dest('www/images'));
});

gulp.task('build', function(callback) {
    runSequence( 'cj', 'html', 'mock', ['mincss', 'minhtml'], callback);

});

