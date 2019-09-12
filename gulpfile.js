const gulp = require('gulp');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const tslint = require('gulp-tslint');
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var tsify = require("tsify");

const browserSync = require('browser-sync').create();

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

function buildEngine() {
    let tsProject = ts.createProject('./Quick/tsconfig.json');
    return browserify({
        basedir: '.',
        debug: true,
        entries: ['./Quick/src/core/QuickEngine.ts'],
        cache: {},
        packageCache: {}
    })
        .plugin(tsify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest("./Quick/dist"));
    // return tsProject.src()
    //     .pipe(tslint(tslintOptions))
    //     // .pipe(tslint.report(reportOptions))
    //     .pipe(sourcemaps.init())
    //     .pipe(tsProject())
    //     .pipe(sourcemaps.write('.'))
    //     .pipe(gulp.dest('./Quick/dist'));
};

function buildEngineEditor() {
    let tsProject = ts.createProject('./QuickEditor/tsconfig.json');
    return tsProject.src()
        .pipe(tslint(tslintOptions))
        // .pipe(tslint.report(reportOptions))
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./QuickEditor'));
};

function buildUnitTest() {
    let tsProject = ts.createProject('./UnitTest/tsconfig.json');
    return tsProject.src()
        .pipe(tslint(tslintOptions))
        // .pipe(tslint.report(reportOptions))
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./UnitTest'));
};

function reload(cb) {
    browserSync.reload();
    cb && cb();
}

function run(cb) {
    browserSync.init({
        server: {
            baseDir: ".",
            index: "./UnitTest/index.html"
        }
    });

    // all done, notify gulp task finished
    cb && cb();
};

function watch() {
    gulp.watch('./Quick/src/**/*.ts', gulp.series(buildEngine, reload));
    gulp.watch('./QuickEditor/src/**/*.ts', gulp.series(buildEngineEditor, reload));

    gulp.watch('./UnitTest/src/**/*.ts', gulp.series(buildUnitTest, reload));
    gulp.watch('./UnitTest/index.html', gulp.series(buildUnitTest, reload));
}

gulp.task('buildEngine', buildEngine);
gulp.task('buildEngineEditor', buildEngineEditor);
gulp.task('buildUnitTest', buildUnitTest);

gulp.task('run', gulp.parallel(run, gulp.series(buildEngine, buildEngineEditor, buildUnitTest, watch)));
gulp.task('default', gulp.parallel(run, gulp.series(buildEngine, buildEngineEditor, buildUnitTest, watch)));
