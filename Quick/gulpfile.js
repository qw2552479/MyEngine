const gulp = require('gulp');
const ts = require('gulp-typescript');

gulp.task('build', function (cb) {

    let tsProject = ts.createProject('./tsconfig.json');
    gulp.src(tsProject.config.include)
        .pipe(tsProject())
        .pipe(gulp.dest(tsProject.config.compilerOptions.outFile));
    cb && cb();
});