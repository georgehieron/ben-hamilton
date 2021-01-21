document.addEventListener(
    "DOMContentLoaded",
    function () {
        var resizeTimer; // Set resizeTimer to empty so it resets on page load

        function resizeFunction() {
            if (window.innerWidth > 768) {
                const target = document.getElementById("site-wrap");

                target.addEventListener('wheel', e => {
                const toLeft  = e.deltaY < 0 && target.scrollLeft > 0
                const toRight = e.deltaY > 0 && target.scrollLeft < target.scrollWidth - target.clientWidth

                    if (toLeft || toRight) {
                        e.preventDefault()
                        e.stopPropagation()
                        target.scrollLeft += e.deltaY / 4
                    }
                })
            }
        }

        // On resize, run the function and reset the timeout
        // 250 is the delay in milliseconds.
        window.addEventListener("resize", function () {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(resizeFunction, 250);
        });

        resizeFunction();
    },
    false
);
