document.addEventListener(
    "DOMContentLoaded",
    function () {
        document.getElementById("site-wrap").addEventListener("wheel", function (event, delta) {
            if (event.deltaY > 0) this.scrollLeft += event.deltaY;
            else this.scrollLeft += event.deltaY;
            event.preventDefault();
        });
    },
    false
);
