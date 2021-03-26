window.addEventListener(
    "load",
    function () {
        const nextTitle = document.getElementById("next-item__title");
        const nextButton = document.getElementById("next-item__view");

        function isInViewport(el) {
            const rect = el.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <=
                    (window.innerHeight ||
                        document.documentElement.clientHeight) &&
                rect.right <=
                    (window.innerWidth || document.documentElement.clientWidth)
            );
        }

        var timeleft = 5;
        let timerRunning = false;
        var downloadTimer;

        function startCountdown() {
            if ( timerRunning === false ) {
                downloadTimer = setInterval(function () {
                    if (timeleft <= 0) {
                        document.getElementById("countdown").innerHTML = "0";
                        nextButton.click();
                    } else {
                        document.getElementById("countdown").innerHTML = timeleft;
                    }
                    timeleft -= 1;
                }, 1000);
            }
        }

        function clearCountdown() {
            if (downloadTimer) {
                clearInterval(downloadTimer);
                timeleft = 5;
                document.getElementById("countdown").innerHTML = timeleft;
            }
        }
        
        var scrollTimer;

        document.addEventListener(
            "scroll",
            function () {
                clearTimeout(scrollTimer);
                scrollTimer = setTimeout(function () {
                    const inViewport = isInViewport(nextTitle)
                        ? true
                        : false;

                    if (inViewport === true) {
                        startCountdown();
                        timerRunning = true;
                        // console.log('inview: ' + inViewport);
                        // console.log('timer: ' + timerRunning);
                    } else {
                        clearCountdown();
                        timerRunning = false;
                        // console.log('inview: ' + inViewport);
                        // console.log('timer: ' + timerRunning);
                    }
                }, 250);
            },
            {
                passive: true,
            }
        );
    },
    false
);
