const gulp = require("gulp");
const prefix = require("gulp-autoprefixer");
const cleancss = require("gulp-clean-css");
// const imagemin = require("gulp-imagemin");
// const babel = require("gulp-babel");
// const concat = require("gulp-concat");
// const ugly = require("gulp-uglify");

function css() {
  return gulp
    .src("src/css/style.css")
    .pipe(
      prefix({
        cascade: false
      })
    )
    .pipe(cleancss({ compatibility: "ie8" }))

    .pipe(gulp.dest("dest/css"));
}

exports.all = gulp.series(css);
