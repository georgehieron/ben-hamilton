module.exports = {
    /**
     * Filters out the passed item from the passed collection
     * and randomises and limits them based on flags
     *
     * @param {Array} collection The 11ty collection we want to take from
     * @param {Object} item The item we want to exclude (often current page)
     * @returns {Array} The resulting collection
     */
    getNextItem(collection, item) {
        let nextItem = {};
        for (let i = 0; i < collection.length; i++) {
            if (collection[i].url === item.url) {
                if (i === collection.length - 1) {
                    nextItem = collection[0];
                } else {
                    nextItem = collection[i + 1];
                }
            }
        }

        return nextItem;
    },
};
