document.addEventListener(
    "DOMContentLoaded",
    function () {
        // Remove the no JS class so that the button will show
        document.documentElement.classList.remove("no-js");

        const STORAGE_KEY = "user-color-scheme";
        const COLOR_MODE_KEY = "--color-mode";

        // Colour Palette Toggle
        const modeToggleButton = document.getElementById("js-theme-toggle");
        const modeToggleText = document.getElementById("js-theme-toggle-text");
        const modeStatusElement = document.getElementById("js-theme-status");

        // Hanger icon components
        const clickHanger = document.getElementById('es15e4xiwzd1');
        const hoverHanger = document.getElementById('efux1o397r3m1');
        const hangerPaths = modeToggleButton.getElementsByTagName('path');

        /**
         * Pass in a custom prop key and this function will return its
         * computed value.
         * A reduced version of this: https://andy-bell.design/wrote/get-css-custom-property-value-with-javascript/
         */
        const getCSSCustomProp = (propKey) => {
            let response = getComputedStyle(
                document.documentElement
            ).getPropertyValue(propKey);

            // Tidy up the string if there’s something to work with
            if (response.length) {
                response = response.replace(/\'|"/g, "").trim();
            }

            // Return the string response by default
            return response;
        };

        /**
         * Takes either a passed settings ('light'|'dark') or grabs that from localStorage.
         * If it can’t find the setting in either, it tries to load the CSS color mode,
         * controlled by the media query
         */
        const applySetting = (passedSetting) => {
            let currentSetting =
                passedSetting || localStorage.getItem(STORAGE_KEY);

            if (currentSetting) {
                document.documentElement.setAttribute(
                    "data-user-color-scheme",
                    currentSetting
                );
                setButtonLabelAndStatus(currentSetting);
            } else {
                setButtonLabelAndStatus(getCSSCustomProp(COLOR_MODE_KEY));
            }
        };

        /**
         * Get’s the current setting > reverses it > stores it
         */
        const toggleSetting = () => {
            let currentSetting = localStorage.getItem(STORAGE_KEY);

            switch (currentSetting) {
                case null:
                    currentSetting =
                        getCSSCustomProp(COLOR_MODE_KEY) === "dark"
                            ? "light"
                            : "dark";
                    break;
                case "light":
                    currentSetting = "dark";
                    break;
                case "dark":
                    currentSetting = "light";
                    break;
            }

            localStorage.setItem(STORAGE_KEY, currentSetting);

            return currentSetting;
        };

        /**
         * A shared method for setting the button text label and visually hidden status element
         */
        const setButtonLabelAndStatus = (currentSetting) => {
            modeToggleText.innerText = `Enable ${
                currentSetting === "dark" ? "light" : "dark"
            } mode`;
            modeStatusElement.innerText = `Colour mode is now "${currentSetting}"`;
        };

        /**
         * Clicking the button runs the apply setting method which grabs its parameter
         * from the toggle setting method.
         */
        modeToggleButton.addEventListener("click", (evt) => {
            evt.preventDefault();

            // Apply the styles
            applySetting(toggleSetting());

            // Adjust the button
            setTimeout(switchIcon, 750);
            switchIcon();
            switchColor();
        });

        applySetting();

        clickHanger.style.display = 'none';

        /**
         * Switch the icon states
         */
        function switchIcon() {
            if (clickHanger.style.display === 'none') {
                clickHanger.style.display = 'block';
                hoverHanger.style.display = 'none';
            } else {
                hoverHanger.style.display = 'block';
                clickHanger.style.display = 'none';
            };
        }

        /**
         * Switch the icon's colour stroke to match current palette
         */
        function switchColor() {
            for (let path of hangerPaths) {
                path.style.stroke = 'var(--color-base)';
            }
        }
    },
    false
);
