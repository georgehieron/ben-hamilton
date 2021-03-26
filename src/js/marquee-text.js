window.addEventListener(
    "load",
    function () {
        function updateTextWidth() {
            document.querySelectorAll('.marquee-link__text').forEach((link) => {
                console.log(link.offsetWidth);
                link.style = '--tw: ' + link.offsetWidth + 'px';
                link.style.animationPlayState = 'running';
            });
        }

        var resizeTimer;

        window.addEventListener('resize', function(e) {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                updateTextWidth();
            }, 250);
        });

        window.addEventListener("orientationchange", function(e) {
            updateTextWidth();
        });

        updateTextWidth();
    },
    false
);
