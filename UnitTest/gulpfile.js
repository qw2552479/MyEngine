const gulp = require('gulp');
const ts = require('gulp-typescript');
const browserSync = require('browser-sync').create();

function build() {
    let tsProject = ts.createProject('./tsconfig.json');
    return tsProject.src()
        .pipe(tsProject())
        .pipe(gulp.dest('.'));
};

function run(cb) {
    browserSync.init({
        server: {
            baseDir: "../",
            index: "./UnitTest/index.html"
        },
        watch: true
    });

    // all done, notify gulp task finished
    cb && cb();
};

gulp.task('build', build);

gulp.task('run', gulp.series(build, run));
