'use strict';

/* пути к исходным файлам (src), к готовым файлам (build), а также к тем, за изменениями которых нужно наблюдать (watch) */
var paths = {
  build: {
    html: 'build/',
    js: 'build/js/',
    style: 'build/style/',
    img: 'build/img/',
    fonts: 'build/fonts/'
  },
  src: {
    html: 'src/*.html',
    js: 'src/js/*.js',
    style: 'src/scss/*.scss',
    img: 'src/img/**/*.*',
    fonts: 'src/fonts/**/*.*',
    service: 'src/service/**/*.*',
    info: 'src/info/**/*.*'
  },
  watch: {
    html: 'src/**/*.html',
    js: 'src/js/**/*.js',
    style: 'src/scss/**/*.scss'
  },
  clean: 'build',
  baseDir: 'build'
};

// для выбора режимов
// режим отладки development
// let isDev = true;
// режим production
let isDev = false;
let isProd = !isDev;

const gulp = require('gulp');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
const gulpif = require('gulp-if');
const tildeImporter = require('node-sass-tilde-importer');
const concat = require('gulp-concat')

sass.compiler = require('node-sass');

// удаление папки сборки
function clean() {
  return del(paths.clean);
}

function fonts() {
  return gulp.src(paths.src.fonts)
    .pipe(gulp.dest(paths.build.fonts)) // выкладывание готовых файлов
}

function img() {
  return gulp.src(paths.src.img)
    .pipe(gulp.dest(paths.build.img)) // выкладывание готовых файлов
}

function html() {
  return gulp.src(paths.src.html)
    .pipe(plumber()) // отслеживание ошибок
    .pipe(gulpif(isProd, htmlmin({
      collapseWhitespace: true
    })))
    .pipe(gulp.dest(paths.build.html)) // выкладывание готовых файлов
    .pipe(browserSync.stream()); // перезагрузка сервера
}

function styles() {
  return gulp.src(paths.src.style) // получим файл .scss
    .pipe(sourcemaps.init())
    .pipe(sass({
      importer: tildeImporter
    }).on('error', sass.logError)) // scss -> css + импорт из nodemodules c использованием ~
    .pipe(autoprefixer({ // добавим префиксы
      overrideBrowserslist: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulpif(isProd, cleanCSS({
      level: 1
    })))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.build.style)) // выгружаем в build
    .pipe(browserSync.stream()); // перезагрузим сервер
}

function script() {
  return gulp.src(paths.src.js, {
      sourcemaps: true
    })
    .pipe(plumber())
    .pipe(concat('script.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.build.js)) // выкладывание готовых файлов
    .pipe(browserSync.stream()); // перезагрузим сервер
}

// Инкрементальная сборка - пересборка если изменился файлы
function watch() {
  browserSync.init({
    server: paths.baseDir
  });
  gulp.watch(paths.watch.html, html);
  gulp.watch(paths.watch.style, styles);
  gulp.watch(paths.watch.js, script);
};

exports.clean = clean;
exports.styles = styles;
exports.script = script;
exports.html = html;
exports.watch = watch;
exports.fonts = fonts;
exports.img = img;

// сборка
gulp.task('build',
  gulp.series(clean,
    gulp.parallel(
      html,
      styles,
      fonts,
      img,
      script
    )
  )
);

// Сборка заданий в одно общее -задача по умолчанию
gulp.task('default', gulp.series('build', watch));