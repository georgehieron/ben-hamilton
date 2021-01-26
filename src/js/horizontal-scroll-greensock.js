document.addEventListener(
    "DOMContentLoaded",
    function () {
        gsap.registerPlugin(ScrollTrigger);

        let container = document.getElementById("container");

        ScrollTrigger.matchMedia({
            "(min-width: 1024px)": function() {
                gsap.to(container, {
                    x: () => -((container.scrollWidth - (document.documentElement.clientWidth / 2)) / 16) + "rem",
                    ease: "none",
                    scrollTrigger: {
                        trigger: container,
                        invalidateOnRefresh: true,
                        pin: true,
                        scrub: 1,
                        end: () => "+=" + container.offsetWidth
                    }
                })
            }
        })
    },
    false
);
