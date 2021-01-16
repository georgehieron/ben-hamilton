const { dest, src } = require("gulp");
const uglify = require('gulp-uglify-es').default;

const inlineScripts = () => {
    return src(["./src/js/*.js"])
        .pipe(uglify())
        .pipe(dest("./src/_includes/js"));
};

module.exports = inlineScripts;
