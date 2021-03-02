document.addEventListener(
    "DOMContentLoaded",
    function () {
        function updateTextWidth() {
            document.querySelectorAll('.marquee-link__text').forEach((link) => {
                link.style = '--tw: ' + link.clientWidth + 'px';
            });
        }

        var resizeTimer;

        window.addEventListener('resize', function(e) {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                updateTextWidth();
            }, 250);
        });

        updateTextWidth();
    },
    false
);
