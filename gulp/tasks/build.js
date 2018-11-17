const gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    del = require("del"),
    usemin = require('gulp-usemin'),
    cssnano = require('gulp-cssnano'),
    rev = require('gulp-rev'),
    uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();



gulp.task('previewDist',['build'], ()=>{
    browserSync.init({
        notify: false,
        server: {
            baseDir:'dist',
        }
    });
});


gulp.task('deleteDistFolder', ()=>{
    return del("./dist")
});


gulp.task('copyGeneralFiles',['deleteDistFolder'] ,()=>{

    let paths = ['./app/**/*', '!./app/index.html',
    '!./app/assets/images/**',
        '!./app/assets/styles/**',
        '!./app/assets/scripts/**',
        '!./app/temp',
        '!./app/temp/**'
    ];

    return gulp.src(paths)
        .pipe(gulp.dest('./dist'))
});

gulp.task('optimizeImages',['deleteDistFolder','icons'], ()=>{
   return gulp.src(['./app/assets/images/**/*', "!./app/assets/images/icons", "!./app/assets/images/icons/**/*"])
       .pipe(imagemin({
           progessive: true,
           interlaced: true,
           multipass: true
       }))
       .pipe(gulp.dest("./dist/assets/images"));
});


gulp.task('useMin',['deleteDistFolder','styles', 'webpack'], ()=>{
    return gulp.src('./app/index.html')
        .pipe(usemin({
            css: [function() {return rev()}, function() {return cssnano()}],
            js: [function() {return rev()}, function(){ return uglify()}]
        }))
        .pipe(gulp.dest("./dist"));
});


gulp.task('build', ['deleteDistFolder','copyGeneralFiles','optimizeImages', 'useMin'], ()=>{

});