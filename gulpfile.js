const
    {src, dest, series, watch} = require('gulp'),
    del = require('del'),
    sass = require('gulp-sass'),
    csso = require('gulp-csso'),
    include = require('gulp-file-include'),
    htmlMin = require('gulp-htmlmin'),
    autoPrefix = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    sync = require('browser-sync').create();

function html() {
    return src('app/**.html')
        .pipe(include({prefix: '@@'}))
        .pipe(htmlMin({
            collapseWhitespace: true
        }))
        .pipe(dest('dist'))
}
function scss () {
    return src('app/scss/**.scss')
        .pipe(sass())
        .pipe(autoPrefix())
        .pipe(csso())
        .pipe(concat('main.min.css'))
        .pipe(dest('dist/css'))
}
function clear() {
    return del('dist');
}
function serve() {
    sync.init({
        server: './dist'
    });

    watch('app/**.html', series(html)).on('change', sync.reload);
    watch("app/scss/**.scss", series(scss)).on('change', sync.reload);
}
exports.build = series(clear, scss, html);
exports.devB = series(clear, scss, html, serve);
exports.clear = clear;