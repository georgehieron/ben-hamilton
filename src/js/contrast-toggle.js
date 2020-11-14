document.addEventListener(
    "DOMContentLoaded",
    function () {
        // Remove the no JS class so that the button will show
        document.documentElement.classList.remove("no-js");

        const COLOR_MODE_KEY = "--color-mode";
        const CONTRAST_KEY = "off";

        // High Contrast Toggle
        const contrastToggleButton = document.getElementById("js-high-contrast-toggle");
        const contrastToggleText = document.getElementById("js-high-contrast-state");

        // Standard Theme Toggle
        const modeToggleButton = document.getElementById("js-theme-toggle");

        // High contrast off by default
        document.documentElement.setAttribute(
            "data-high-contrast",
            CONTRAST_KEY
        );

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
         * Takes either a passed settings ('on'|'off') or grabs that from localStorage.
         * If it can’t find the setting in either, it tries to load the CSS color mode,
         * controlled by the media query
         */
        const applySetting = (passedSetting) => {
            let currentSetting =
                passedSetting || localStorage.getItem(CONTRAST_KEY);

            if (currentSetting) {
                document.documentElement.setAttribute(
                    "data-high-contrast",
                    currentSetting
                );
                setButtonStatus(currentSetting);
            } else {
                setButtonStatus(getCSSCustomProp(COLOR_MODE_KEY));
            }
        };

        /**
         * Get’s the current setting > reverses it > stores it
         */
        const toggleSetting = () => {
            let currentSetting = localStorage.getItem(CONTRAST_KEY);

            switch (currentSetting) {
                case null:
                    currentSetting =
                        getCSSCustomProp(CONTRAST_KEY) === "off"
                            ? "on"
                            : "off";
                    break;
                case "on":
                    currentSetting = "off";
                    break;
                case "off":
                    currentSetting = "on";
                    break;
            }

            localStorage.setItem(CONTRAST_KEY, currentSetting);

            return currentSetting;
        };

        /**
         * A shared method for setting the button text label and visually hidden status element
         */
        const setButtonStatus = (currentSetting) => {
            contrastToggleText.innerText = `Enable ${
                currentSetting === "off" ? "on" : "off"
            } mode`;
            contrastToggleText.innerText = `${currentSetting}`;
        };

        /**
         * Clicking the button runs the apply setting method which grabs its parameter
         * from the toggle setting method.
         */
        contrastToggleButton.addEventListener("click", (evt) => {
            evt.preventDefault();

            // Apply the styles
            applySetting(toggleSetting());
        });

        /**
         * Clicking the standard theme toggle resets high contrast to off.
         */
        modeToggleButton.addEventListener("click", (evt) => {
            evt.preventDefault();

            localStorage.setItem(CONTRAST_KEY, 'off');

            // Apply the styles
            applySetting('off');
        });

        applySetting();
    },
    false,
);
