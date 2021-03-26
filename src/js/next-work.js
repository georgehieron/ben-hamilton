window.addEventListener(
    "load",
    function () {
        const nextTitle = document.getElementById("next-item__title");
        const nextButton = document.getElementById("next-item__view");
        const countdownNo = document.getElementById("countdown");

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
            if (timerRunning === false) {
                countdownNo.setAttribute("data-counting", "true");
                downloadTimer = setInterval(function () {
                    if (timeleft <= 0) {
                        countdownNo.innerHTML = "0";
                        nextButton.click();
                    } else {
                        countdownNo.innerHTML = timeleft;
                    }
                    timeleft -= 1;
                }, 1000);
            }
        }

        function clearCountdown() {
            if (downloadTimer) {
                clearInterval(downloadTimer);
                timeleft = 5;
                countdownNo.innerHTML = timeleft;
                countdownNo.setAttribute("data-counting", "false");
            }
        }

        var scrollTimer;

        document.addEventListener(
            "scroll",
            function () {
                clearTimeout(scrollTimer);
                scrollTimer = setTimeout(function () {
                    const inViewport = isInViewport(nextTitle) ? true : false;

                    if (inViewport === true) {
                        startCountdown();
                        timerRunning = true;
                    } else {
                        clearCountdown();
                        timerRunning = false;
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
