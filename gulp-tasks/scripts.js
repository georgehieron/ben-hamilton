const { dest, src } = require("gulp");
const concat = require("gulp-concat");
const uglify = require('gulp-uglify-es').default;

const scripts = () => {
    return src(["./src/js/**/*.js"])
        .pipe(concat("main.js"))
        .pipe(uglify())
        .pipe(dest("./dist/js"));
};

module.exports = scripts;
