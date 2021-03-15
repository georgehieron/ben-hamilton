const { dest, src } = require("gulp");
const imagemin = require("gulp-imagemin");

// Grabs all images, runs them through imagemin
// and plops them in the dist folder
const images = () => {
    // We have specific configs for jpeg and png files to try
    // to really pull down asset sizes
    return src("./src/images/**/*.{gif,png,jpg}")
        .pipe(
            imagemin(
                [
                    imagemin.mozjpeg({ quality: 60, progressive: true }),
                    imagemin.gifsicle({
                        interlaced: true,
                        optimizationLevel: 3
                    }),
                    imagemin.optipng({
                        optimizationLevel: 5,
                        interlaced: null,
                    }),
                ],
                {
                    silent: true,
                }
            )
        )
        .pipe(dest("./dist/images"));
};

module.exports = images;
