// Transforms
const htmlMinTransform = require("./src/transforms/html-min-transform.js");

// Create a helpful production flag
const isProduction = process.env.NODE_ENV === "production";

// Functions
const sortByDisplayOrder = require("./src/utils/sort-by-display-order.js");

module.exports = (config) => {
    // Only minify HTML if we are in production because it slows builds _right_ down
    if (isProduction) {
        config.addTransform("htmlmin", htmlMinTransform);
    }

    // Layout aliases
    config.addLayoutAlias('home', 'layouts/home.html');

    // Returns work items, sorted by display order then filtered by featured
    config.addCollection("featuredWork", (collection) => {
        return sortByDisplayOrder(
            collection.getFilteredByGlob("./src/work/*.md")
        ).filter((x) => x.data.featured);
    });

    // Tell 11ty to use the .eleventyignore and ignore our .gitignore file
    config.setUseGitIgnore(false);

    // Copy Static Files to /dist
    config.addPassthroughCopy('src/fonts');
    config.addPassthroughCopy('src/images');
    config.addPassthroughCopy('src/admin/config.yml');

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
