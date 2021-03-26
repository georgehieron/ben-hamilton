const fs = require('fs');

// Import filters
const markdownFilter = require("./src/filters/markdown-filter.js");

// Transforms
const htmlMinTransform = require("./src/transforms/html-min-transform.js");

// Create a helpful production flag
const isProduction = process.env.NODE_ENV === "production";

// Functions
const sortByDisplayOrder = require("./src/utils/sort-by-display-order.js");

module.exports = (config) => {
    // Filters
    config.addFilter("markdownFilter", markdownFilter);

    // Only minify HTML if we are in production because it slows builds _right_ down
    if (isProduction) {
        config.addTransform("htmlmin", htmlMinTransform);
    }

    // Returns work items, sorted by display order then filtered by featured
    config.addCollection("featuredWork", (collection) => {
        return sortByDisplayOrder(
            collection.getFilteredByGlob("./src/work/*.md")
        ).filter((x) => x.data.featured);
    });

    // Tell 11ty to use the .eleventyignore and ignore our .gitignore file
    config.setUseGitIgnore(false);

    // Copy Static Files to /dist
    config.addPassthroughCopy("src/fonts");
    config.addPassthroughCopy("src/images");
    config.addPassthroughCopy("src/admin/config.yml");

    // 404
    config.setBrowserSyncConfig({
        callbacks: {
            ready: function (err, browserSync) {
                const content_404 = fs.readFileSync("dist/404.html");

                browserSync.addMiddleware("*", (req, res) => {
                    // Provides the 404 content without redirect.
                    res.write(content_404);
                    res.end();
                });
            },
        },
    });

    return {
        markdownTemplateEngine: "njk",
        dataTemplateEngine: "njk",
        htmlTemplateEngine: "njk",
        dir: {
            input: "src",
            output: "dist",
        },
    };
};
