document.addEventListener(
    "DOMContentLoaded",
    function () {
        gsap.registerPlugin(ScrollTrigger, Draggable);

        var scroller = document.getElementById("main-content");

        var scrollWidth;

        var proxy = document.createElement("div");
        var draggable = Draggable.create(proxy, {
            trigger: scroller,
            type: "x",
            dragResistance: -1,
            onDrag: function () {
                trigger.scroll(-this.x);
            },
        })[0];

        function createScroller() {
            scrollWidth = scroller.offsetWidth - innerWidth;
            draggable.applyBounds({ minX: -scrollWidth, maxX: 0 });
            ScrollTrigger.addEventListener("refreshInit", () => {
                scrollWidth = scroller.offsetWidth - innerWidth;
                gsap.set(document.body, { height: scrollWidth + innerHeight });
            });
        }

        function updateProxy() {
            // move the handler to the corresponding ratio according to the page's scroll position.
            gsap.set(proxy, { x: -trigger.scroll() });
        }

        createScroller();

        var trigger;

        ScrollTrigger.matchMedia({
            // desktop
            "(min-width: 64em)": function () {
                // Add keyboard navigation
                document.addEventListener("keyup", function (event) {
                    if (event.code == "Tab") {
                        let activeRect = document.activeElement.offsetParent;
                        trigger.scroll(activeRect.offsetLeft - 150);
                    }
                    if (event.shiftKey && event.code == "Tab") {
                        let activeRect = document.activeElement.offsetParent;
                        trigger.scroll(activeRect.offsetLeft - 150);
                    }
                });

                // gsap.set(document.body, {height: scrollWidth + innerHeight});
                var anim = gsap.to(scroller, {
                    x: () =>
                        -((scroller.scrollWidth - innerWidth) / 16) + "rem",
                    ease: "none",
                });

                trigger = ScrollTrigger.create({
                    animation: anim,
                    id: "tlScroller",
                    scrub: 2,
                    start: 0,
                    end: scrollWidth,
                    invalidateOnRefresh: true,
                    onUpdate: updateProxy,
                });
            },
        });
    },
    false
);
