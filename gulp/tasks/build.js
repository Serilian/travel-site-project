const gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    del = require("del"),
    usemin = require('gulp-usemin'),
    cssnano = require('gulp-cssnano'),
    rev = require('gulp-rev'),
    uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();


gulp.task('previewDocs', ['build'], () => {
    browserSync.init({
        notify: false,
        server: {
            baseDir: 'docs',
        }
    });
});


gulp.task('deleteDocsFolder', ['icons'], () => {
        return del("./docs")
    }
)
;


gulp.task('copyGeneralFiles', ['deleteDocsFolder'], () => {

    let paths = ['./app/**/*', '!./app/index.html',
        '!./app/assets/images/**',
        '!./app/assets/styles/**',
        '!./app/assets/scripts/**',
        '!./app/temp',
        '!./app/temp/**'
    ];

    return gulp.src(paths)
        .pipe(gulp.dest('./docs'))
});

gulp.task('optimizeImages', ['deleteDocsFolder'], () => {
    return gulp.src(['./app/assets/images/**/*', "!./app/assets/images/icons", "!./app/assets/images/icons/**/*"])
        .pipe(imagemin({
            progessive: true,
            interlaced: true,
            multipass: true
        }))
        .pipe(gulp.dest("./docs/assets/images"));
});


gulp.task('useMinTrigger', ['deleteDocsFolder'], () => {
    gulp.start('useMin');
});

gulp.task('useMin', ['styles', 'webpack'], () => {
    return gulp.src('./app/index.html')
        .pipe(usemin({
            css: [function () {
                return rev()
            }, function () {
                return cssnano()
            }],
            js: [function () {
                return rev()
            }, function () {
                return uglify()
            }]
        }))
        .pipe(gulp.dest("./docs"));
});


gulp.task('build', ['deleteDocsFolder', 'copyGeneralFiles', 'optimizeImages', 'useMinTrigger'], () => {

});