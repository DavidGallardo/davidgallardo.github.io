var gulp = require("gulp"),
    sass = require("gulp-sass"),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    cssnano = require("cssnano"),
    concat = require("gulp-concat"),
    terser = require("gulp-terser"),
    del = require('del'),
    image = require('gulp-image'),
    sourcemaps = require("gulp-sourcemaps");

var browserSync = require("browser-sync").create();

// Paths to all files needed
var paths = {
  styles: {
    src: "./dev/scss/main.scss",
    srcWatch: "./dev/scss/**/*.scss",
    dest: "./css"
  },
  markup: {
    src: ["./dev/**/*.html"],
    srcWatch: ["./dev/**/*.html", "./dev/js/**/*.js"],
    dest: "./"
  },
  scripts: {
    src: ["./dev/js/plugins.js", "./dev/js/modernizr.min.js", "./dev/js/main.js"],
    srcWatch: "./dev/js/**/*.js",
    dest: "./js"
  },
  imgs: {
    src: "./dev/img/**/*",
    srcWatch: "./dev/img/**/*",
    dest: "./img"
  }

}

// Transpile, concatenate and minify scripts
function markup() {
  return (
    gulp
    .src(paths.markup.src)
    .pipe(gulp.dest(paths.markup.dest))
  );
}


// SASS to CSS compilation with sourcemaps
function styles() {
  return (
    gulp
    .src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .on("error", sass.logError)
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream())
    );
}

// Transpile, concatenate and minify scripts
function scripts() {
  return (
    gulp
    .src(paths.scripts.src)
    .pipe(concat('main.min.js'))
    .pipe(terser())
    .pipe(gulp.dest(paths.scripts.dest))
  );
}

// Optimize images and copy them into docs
function images() {
  return (
    gulp
    .src(paths.imgs.src)
    .pipe(image({
      zopflipng: false
    }))
    .pipe(gulp.dest(paths.imgs.dest))
    );
}

//Clean all auto-generated code from docs
function clean() {
  return del([
    './css',
    './img',
    './js',
    './index.html'
  ]);
}

//Task to reload the page if something change
function reload(done) {
  browserSync.reload();
  done();
}

// Watch for changes
function watch(){

  browserSync.init({
    server: {
      baseDir: "./"
    }
  });

  gulp.watch(paths.styles.srcWatch, styles);
  gulp.watch(paths.imgs.srcWatch, images);
  gulp.watch(paths.scripts.srcWatch, scripts);
  gulp.watch(paths.markup.srcWatch, gulp.series(markup, reload));
}


//Build task
var build = gulp.series(clean, markup, gulp.parallel(images, styles, scripts), watch);

//export tasks
exports.clean = clean;
exports.markup = markup;
exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.watch = watch;
exports.default = build;
