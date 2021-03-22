window.addEventListener(
    "load",
    function () {
        function removeSplash() {
            const splashScreen = document.getElementById('splash-screen');

            setTimeout(function () {
                splashScreen.setAttribute('data-fadeout', '');
                document.body.removeAttribute('data-loading');
            }, 250);
        }

        removeSplash();
    },
    false
);
