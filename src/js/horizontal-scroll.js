document.addEventListener(
    "DOMContentLoaded",
    function () {
        const scroller = new LocomotiveScroll({
            el: document.querySelector('[data-scroll-container]'),
            smooth: true,
            direction: 'horizontal',
            tablet: {
                smooth: false,
                direction: 'vertical',
                gestureDirection:"vertical",
                breakpoint: 992
            },
            smartphone: {
                smooth: false,
                direction: 'vertical',
                gestureDirection:"vertical"
            },
            reloadOnContextChange: true,
            resetNativeScroll: false
        });
    },
    false
);
