'use strict';
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    less = require('gulp-less'),
    uglify = require('gulp-uglify'),
    autoprefixer = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    minifyCSS = require('gulp-minify-css');

//task for js scripts
gulp.task('js', function () {
    gulp.src([
        'js/*.js'
    ])
        .pipe(concat('src/app.js'))
        .pipe(uglify())
        .pipe(gulp.dest('.'))
});

//task for less and css styles
gulp.task('less', function () {
    gulp.src([
        'less/styles.less'
    ])
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(minifyCSS())
        .pipe(concat('src/style.css'))
        .pipe(gulp.dest('.'))
});

gulp.task('image', function () {
    gulp.src([
        'img/*.*',
        'img/**/*.*'
    ])
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest('src/img/'))
});


// start task gulp watch
gulp.task('watch', function() {
    gulp.start('less');
    gulp.start('js');
    gulp.start('image');

    gulp.watch(['less/*.less', 'less/**/*.less'], function() {
        gulp.start('less');
    });

    gulp.watch(['js/*.js'], function() {
        gulp.start('js');
    });

    gulp.watch(['img/*.*', 'img/**/*.*'], function() {
        gulp.start('image');
    });
});
