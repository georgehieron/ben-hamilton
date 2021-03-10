document.addEventListener(
    "DOMContentLoaded",
    function () {
        gsap.registerPlugin(ScrollTrigger, Draggable);

        var scroller = document.getElementById("home-primary");

        var scrollHeight;

        // var proxy = document.createElement("div");
        // var draggable = Draggable.create(proxy, {
        //     trigger: scroller,
        //     type: "x",
        //     dragResistance: -1,
        //     onDrag: function () {
        //         trigger.scroll(-this.y);
        //     },
        // })[0];

        function createScroller() {
            scrollHeight = scroller.scrollHeight;
            // draggable.applyBounds({ minY: -scrollHeight, maxY: 0 });
            ScrollTrigger.addEventListener("refreshInit", () => {
                scrollHeight = scroller.scrollHeight;
                gsap.set(document.body, { height: scrollHeight });
            });
        }

        // function updateProxy() {
        //     // move the handler to the corresponding ratio according to the page's scroll position.
        //     gsap.set(proxy, { x: -trigger.scroll() });
        // }

        createScroller();

        var trigger;

        ScrollTrigger.matchMedia({
            // desktop
            "(min-width: 48em)": function () {
                // Add keyboard navigation
                document.addEventListener("keyup", function (event) {
                    if (event.code == "Tab") {
                        let activeEl = document.activeElement;
                        trigger.scroll(activeEl.offsetLeft - 250);
                    }
                    if (event.shiftKey && event.code == "Tab") {
                        let activeEl = document.activeElement;
                        trigger.scroll(activeEl.offsetLeft - 250);
                    }
                });

                // gsap.set(document.body, {height: scrollHeight + innerHeight});
                var anim = gsap.to(scroller, {
                    y: () =>
                        -((scroller.scrollHeight) / 16) + "rem",
                    ease: "none",
                });

                trigger = ScrollTrigger.create({
                    animation: anim,
                    id: "tlScroller",
                    scrub: 2,
                    start: 0,
                    end: scrollHeight,
                    invalidateOnRefresh: true,
                    // onUpdate: updateProxy,
                });
            },
        });
    },
    false
);
