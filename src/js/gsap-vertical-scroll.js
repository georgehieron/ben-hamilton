document.addEventListener(
    "DOMContentLoaded",
    function () {
        gsap.registerPlugin(ScrollTrigger);

        let container = document.querySelector("#site-wrap");

        let height;
        function setHeight() {
            height = container.clientHeight;
            document.body.style.height = height + "px";
        }
        ScrollTrigger.addEventListener("refreshInit", setHeight);

        // smooth scrolling container
        gsap.to(container, {
            y: () => -(height - document.documentElement.clientHeight),
            ease: "none",
            scrollTrigger: {
                trigger: document.body,
                start: "top top",
                end: "bottom bottom",
                scrub: 2,
                invalidateOnRefresh: true,
            },
        });

        // scrolltrigger for each box
        gsap.utils.toArray(".section-anchor").forEach((anchor) => {
            gsap.to(anchor, {
                scrollTrigger: {
                    trigger: anchor,
                    start: "top top",
                    end: "+=" + (anchor.parentElement.offsetHeight - anchor.offsetHeight),
                    pin: true,
                    markers: true,
                    pinReparent: true,
                    pinSpacing: false,
                },
            });
        });

        // let sidebar = document.querySelector(".sidebar");

        // gsap.to('.sidebar--internal', {
        //     scrollTrigger: {
        //         trigger: sidebar,
        //         start: "top top",
        //         end: "+=" + sidebar.offsetHeight,
        //         pin: true,
        //         markers: true,
        //         pinReparent: true,
        //         pinSpacing: false,
        //     },
        // });
    },
    false
);
