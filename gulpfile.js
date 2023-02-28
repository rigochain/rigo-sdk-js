const gulp = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const ts = require("gulp-typescript");
const babelify = require('babelify');
const tsify = require('tsify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const log = require('fancy-log');
const childproc = require('child_process');
const clean = require('gulp-clean');

gulp.task('protoc', function (cb) {
    return childproc.exec('protoc' +
        ' --plugin="./node_modules/.bin/protoc-gen-ts_proto"' +
        ' --ts_proto_opt=esModuleInterop=true'  +
        ' --ts_proto_opt=forceLong=long'  +
        ' --ts_proto_out="src/trx"' +
        ' -I src/trx trx_pb.proto',
        function (err, stdout, stderr) {
        if(stdout) console.log(stdout);
        if(stderr) console.log(stderr);
        cb(err);
    })
})
gulp.task('dist', function () {
    return browserify(['src/index.ts'])
        .plugin(tsify, {noImplicitAny:true})
        .transform(babelify, {global: true, presets: ["@babel/preset-env"]})
        .bundle()
        .on('error', function(e) {log.error('Error when updating the Bundle: \n' + e);})
        .on('end', function() {log("➡️  Build is finished")})
        .pipe(source('rigo.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('rigo.min.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task("tsc", function () {
    const tsProject = ts.createProject("tsconfig.json", {});
    return tsProject.src()
        .pipe(tsProject())
        .dts.pipe(gulp.dest(tsProject.config.compilerOptions.outDir));
});

gulp.task('clean', function(){
    const tsProject = ts.createProject("tsconfig.json", {});
    return gulp.src(['dist', tsProject.config.compilerOptions.outDir], { read: false })
        .pipe(clean());
});

gulp.task('default', gulp.series('protoc', 'dist', 'tsc'));
