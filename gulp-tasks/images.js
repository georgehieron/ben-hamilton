const { dest, src } = require("gulp");
const imagemin = require("gulp-imagemin");

// Grabs all jpgs, runs them through imagemin
// and plops them in the dist folder
const images = () => {
    return src("./src/images/**/*.jpg")
        .pipe(
            imagemin(
                [
                    imagemin.mozjpeg({ quality: 60, progressive: true }),
                ],
                {
                    silent: true,
                }
            )
        )
        .pipe(dest("./dist/images"));
};

module.exports = images;
