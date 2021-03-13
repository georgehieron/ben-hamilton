document.addEventListener(
    "DOMContentLoaded",
    function () {
        const scroller = new LocomotiveScroll({
            el: document.querySelector('[data-scroll-container]'),
            smooth: true,
            tablet: {
                smooth: true,
                breakpoint: 768,
            },
            smartphone: {
                smooth: false,
            },
            reloadOnContextChange: true,
            resetNativeScroll: false
        });

        var resizeTimer;

        window.addEventListener('resize', function(e) {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                scroller.update();
            }, 250);
        });

        scroller.init();
    },
    false
);
