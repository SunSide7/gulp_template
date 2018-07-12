var gulp         = require('gulp');
var browserSync  = require('browser-sync').create();
var less         = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var concatCss = require('gulp-concat-css');




// Static Server + watching scss/html files
gulp.task('serve', ['less'], function() {

    browserSync.init({
        server: "src/"
    });

    //Следим за изменениями файлов
    gulp.watch("src/less/*.less", ['less']);
    gulp.watch("src/*.html").on('change', browserSync.reload);
});

// Компилируем Less в Css и обновляем страницу

gulp.task('less', function() {
    return gulp.src("src/less/*.less")
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
            }))
        .pipe(concatCss("style.css"))
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);