const markdownIt = require("markdown-it")({
    html: true,
    breaks: true,
    linkify: false,
});

module.exports = function markdown(value) {
    return markdownIt.render(value);
};
