var gulp = require('gulp');  
var sass = require('gulp-sass');  
var browserSync = require('browser-sync');
const autoprefixer = require('gulp-autoprefixer');

var input = './scss/main.scss';
var output = './css';


gulp.task('browser-sync', function() {  
    browserSync.init(["../*/*.html", "css/*.css", "js/*.js"], {
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('sass', function () {
  gulp.src(input)
    .pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 4 versions', 'android 4'],
      cascade: false
    }))
    .pipe(gulp.dest(output))
    .pipe(browserSync.stream());
});



gulp.task('default', ['browser-sync', 'sass'], function () {  
    gulp.watch("./scss/*/*.scss", ['sass']);
});