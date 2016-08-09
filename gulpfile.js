var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var tsb = require("gulp-tsb");

var compilation = tsb.create({
    target: "es6",
    module: "commonjs",
    declaration: false
});

gulp.task('build', function() {
    return gulp.src("src/**/*.ts")
        .pipe(compilation())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/'));
});