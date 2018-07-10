var gulp         = require('gulp');
var browserSync  = require('browser-sync').create();
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var concatCss = require('gulp-concat-css');




// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "src/"
    });

    //Следим за изменениями файлов
    gulp.watch("src/sass/*.sass", ['sass']);
    gulp.watch("src/*.html").on('change', browserSync.reload);
});

// Компилируем Sass в Css и обновляем страницу
gulp.task('sass', function() {
    return gulp.src("src/sass/*.sass")
        .pipe(sass().on('error', sass.logError))
        
        // настройки autoprefixer
        .pipe(autoprefixer({
            browsers: ['last 4 versions'],
            cascade: false
        }))

        //настройки concat-css
        .pipe(concatCss("style.css"))

        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);