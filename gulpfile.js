'use strict';

/* пути к исходным файлам (src), к готовым файлам (build), а также к тем, за изменениями которых нужно наблюдать (watch) */
var paths = {
    build: {
        html: 'dist/',
        js: 'dist/js/',
        css: 'dist/css/',
        img: 'dist/img/',
        fonts: 'dist/webfonts/'
    },
    src: {
        html: 'src/*.html',
        js: 'src/js/*.js',
        style: 'src/style/app.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/webfonts/**/*.*',
        service: 'src/service/**/*.*',
        info: 'src/info/**/*.*'
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        css: 'src/style/**/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'srs/webfonts/**/*.*'
    },
    clean: 'dist',
    baseDir: 'dist'
};

// для выбора режимов
// режим отладки development
let isDev = true;
// режим production
// let isDev = false;
let isProd = !isDev;
