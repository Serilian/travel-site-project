const gulp = require("gulp");
const postCSS = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const postCSSvars = require('postcss-simple-vars');
const nested = require('postcss-nested');
const imports = require('postcss-import');
const mixins = require('postcss-mixins');

gulp.task('styles', () => {
    return gulp.src('./app/assets/styles/styles.css')
        .pipe(postCSS([imports, mixins, nested, postCSSvars, autoprefixer]))
        .on('error', function (errormsg) {
            console.log(errormsg.toString());
            this.emit('end');
        })
        .pipe(gulp.dest('./app/temp/styles/'));
});