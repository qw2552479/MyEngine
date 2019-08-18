const gulp = require('gulp');
const ts = require('gulp-typescript');
const tslint = require('gulp-tslint');

function build() {
    let tsProject = ts.createProject('./tsconfig.json');
    return tsProject.src()
        .pipe(tsProject())
        .pipe(gulp.dest('.'));
}

gulp.task('build', build);

gulp.task('tslint', function () {
    let tsProject = ts.createProject('./tsconfig.json');

    const tslintOptions = {
        configuration: 'tslint.json',
        fix: true,
        formatter: "prose",
        formattersDirectory: null,
        rulesDirectory: null
    };

    const reportOptions = {
        emitError: true,
        reportLimit: 0,
        summarizeFailureOutput: false,
        allowWarnings: false
    };

    return gulp.src('src/**/*.ts', {base: '.'})
        .pipe(tslint(tslintOptions))
        .pipe(gulp.dest('.'))
        .pipe(tslint.report(reportOptions));
});