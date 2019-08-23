// src -> dist
var gulp = require('gulp');
var pkg = require('./package.json');

var imagemin = require('gulp-imagemin');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var header = require('gulp-header');
var webserver = require('gulp-webserver');

// gulp.src('./src/index.html')
// gulp.src(['./src/index.html', './src/main.html'])
// gulp.src('./src/*.html')
// gulp.src('./src/**/*.html')
// gulp.src(['./src/**/*.html', '!./src/donotcopy.html'])

gulp.task('html', function() {
    gulp.src('./src/index.html')
        .pipe(gulp.dest('./dist'));
});

gulp.task('img', function() {
    gulp.src('./src/img/*.jpg')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/img'));
});

gulp.task('js', function() {
    gulp.src('./src/coffee/*.coffee')
        .pipe(plumber())
        .pipe(coffee())
        .pipe(concat('all.min.js'))
        .pipe(uglify())
        // .pipe(header('/* copyright @taguchi */'))
        // .pipe(header('/* copyright <%= name %> */', {name: 'taguchi'}))
        .pipe(header('/* copyright <%= pkg.name %> */', {pkg: pkg}))
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('watch', function() {
    gulp.watch('./src/coffee/*.coffee', ['js'])
    gulp.watch('./src/*.html', ['html'])
});

gulp.task('webserver', function() {
    gulp.src('./dist')
        .pipe(
            webserver({
                host: '192.168.33.1',
                livereload: true
            })
        );
});

gulp.task('default', ['html', 'img', 'js', 'watch', 'webserver']);
