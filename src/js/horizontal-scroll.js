document.addEventListener(
    "DOMContentLoaded",
    function () {
        var resizeTimer; // Set resizeTimer to empty so it resets on page load

        function resizeFunction() {
            if (window.innerWidth > 768) {
                document.getElementById("site-wrap").addEventListener("wheel", function (event) {
                    if (event.deltaY > 0) {
                        this.scrollLeft += event.deltaY;
                    } else {
                        this.scrollLeft += event.deltaY;
                    }
                });
            }
        };
    
        // On resize, run the function and reset the timeout
        // 250 is the delay in milliseconds.
        window.addEventListener("resize", function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(resizeFunction, 250);
        });

        resizeFunction();
    },
    false
);
