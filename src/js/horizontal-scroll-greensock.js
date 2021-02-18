document.addEventListener(
    "DOMContentLoaded",
    function () {
        // gsap.registerPlugin(ScrollTrigger);

        // let container = document.getElementById("container");

        // ScrollTrigger.matchMedia({
        //     "(min-width: 1024px)": function() {
        //         gsap.to(container, {
        //             x: () => -((container.scrollWidth - (document.documentElement.clientWidth / 2)) / 16) + "rem",
        //             ease: "none",
        //             scrollTrigger: {
        //                 trigger: container,
        //                 invalidateOnRefresh: true,
        //                 pin: true,
        //                 scrub: 2,
        //                 end: () => "+=" + container.offsetWidth
        //             }
        //         })
        //     }
        // })








        gsap.registerPlugin(ScrollTrigger,Draggable);

        var scroller = document.getElementById("main-content");

        var scrollWidth;
        
        var proxy = document.createElement("div");
        var draggable = Draggable.create(proxy, {
        trigger: scroller,
        type: "x",
        onDrag: function() {
            trigger.scroll(-this.x);
        }
        })[0];

        function createScroller() {
        scrollWidth = scroller.offsetWidth - innerWidth;
        draggable.applyBounds({minX: -scrollWidth, maxX: 0});
        ScrollTrigger.addEventListener("refreshInit", () => {
            scrollWidth = scroller.offsetWidth - innerWidth;
            gsap.set(document.body, {height: scrollWidth + innerHeight});
        });
        }
        
        function updateProxy() {
        // move the handler to the corresponding ratio according to the page's scroll position.
        gsap.set(proxy, {x: -trigger.scroll()});
        }

        createScroller();

        var trigger;

        ScrollTrigger.matchMedia({
            
            // desktop
            "(min-width: 64em)": function() {
            
            // gsap.set(document.body, {height: scrollWidth + innerHeight});
            var anim = gsap.to(scroller, {
                x: () => -((scroller.scrollWidth - (innerWidth)) / 16) + "rem",
                ease: "none", 
            });
            
            trigger = ScrollTrigger.create({
                animation: anim,
                id: 'tlScroller',
                scrub: 2,
                start: "left left",
                end: "bottom bottom",
                // start: 0,
                // end: scrollWidth,
                // horizontal: true,
                // markers: true,
                invalidateOnRefresh: true,
                onUpdate: updateProxy
            });

            }
        })
    },
    false
);
