const gulp = require("gulp");
const prefix = require("gulp-autoprefixer");
const cleancss = require("gulp-clean-css");
const imagemin = require("gulp-imagemin");
const babel = require("@babel/preset-es2015");
const concat = require("gulp-concat");
const ugly = require("gulp-uglify");

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

function images() {
  return gulp
    .src("src/images/*")
    .pipe(imagemin())
    .pipe(gulp.dest("dest/images"));
}

function js() {
  return gulp
    .src("src/js/*.js")
    .pipe(
      babel({
        presets: [["@babel/preset-env", { modules: false }]]
      })
        .pipe(concat("main.js"))
        .pipe(ugly())
    )
    .pipe(gulp.dest("dest/js"));
}

function html() {
  return gulp.src("index.html").pipe(gulp.dest("dest"));
}
function watch() {
  watch("./src/css/*.css", css);
  watch("./src/images/*.*", images);
  watch("./src/js/*.js", js);
  watch("./src/index.html", html);
}
exports.all = gulp.parallel(css, images, js, html, watch);
