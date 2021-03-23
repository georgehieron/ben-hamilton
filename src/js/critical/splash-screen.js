document.addEventListener(
    "DOMContentLoaded",
    function () {
        function removeSplash() {
            const splashScreen = document.getElementById('splash-screen');

            setTimeout(function () {
                splashScreen.setAttribute('data-fadeout', '');
                document.body.removeAttribute('data-loading');
            }, 250);

            setTimeout(function () {
                splashScreen.style.display = 'none';
            }, 500);
        }

        removeSplash();
    },
    false
);
