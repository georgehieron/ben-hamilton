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
                    const toTop  = e.deltaX < 0 && target.scrollLeft > 0
                    const toBottom = e.deltaX > 0 && target.scrollLeft < target.scrollWidth - target.clientWidth

                    // Scroll horizontall on vertical scroll
                    if (toLeft || toRight) {
                        e.preventDefault()
                        e.stopPropagation()
                        target.scrollLeft += e.deltaY / 4;
                    }

                    // Prevent actual horizontal scrolling with a trackpad
                    if (toTop || toBottom) {
                        e.preventDefault()
                        e.stopPropagation()
                        target.scrollTop += e.deltaX;
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
