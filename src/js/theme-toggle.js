document.addEventListener(
    "DOMContentLoaded",
    function () {
        // Remove the no JS class so that the button will show
        document.documentElement.classList.remove("no-js");

        const STORAGE_KEY = "user-color-scheme";
        const COLOR_MODE_KEY = "--color-mode";
        const HIGHCONTRAST_KEY = "high-contrast";

        // Colour Theme Toggle
        const modeToggleButton = document.getElementById("js-theme-toggle");
        const modeToggleText = document.getElementById("js-theme-toggle-text");
        const modeStatusElement = document.getElementById("js-theme-status");

        // Hanger icon components
        const clickHanger = document.getElementById("es15e4xiwzd1");
        const hoverHanger = document.getElementById("efux1o397r3m1");
        const hangerPaths = modeToggleButton.getElementsByTagName("path");

        // High Contrast Toggle
        const contrastToggleButton = document.getElementById(
            "js-high-contrast-toggle"
        );
        const contrastToggleState = document.getElementById(
            "js-high-contrast-state"
        );
        const contrastToggleText = document.getElementById(
            "js-high-contrast-btn-text"
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
                case HIGHCONTRAST_KEY:
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
         * A shared method for setting the theme toggle's button text label and visually hidden status element
         */
        const setButtonLabelAndStatus = (currentSetting) => {
            modeToggleText.innerText = `Enable ${
                currentSetting === "dark" ? "light" : "dark"
            } mode`;
            modeStatusElement.innerText = `Colour mode is now "${currentSetting}"`;
        };

        /**
         * A shared method for setting the contrast toggle's button text label and visually hidden status element
         */
        const setContrastButtonLabelAndStatus = (currentSetting) => {
            contrastToggleText.innerText = `Turn high-contrast mode ${
                currentSetting === "off" ? "on" : "off"
            }`;
            contrastToggleState.innerText = `${currentSetting}`;
            if (currentSetting === "on") {
                contrastToggleButton.setAttribute("aria-checked", "true");
            } else {
                contrastToggleButton.setAttribute("aria-checked", "false");
            }
        };

        /**
         * Clicking the button runs the apply setting method which grabs its parameter
         * from the toggle setting method.
         */
        modeToggleButton.addEventListener("click", (evt) => {
            evt.preventDefault();

            // Apply the styles
            if (localStorage.getItem(STORAGE_KEY) === HIGHCONTRAST_KEY) {
                // If the high contrast mode was on, revert to the user's default theme
                // By running toggle twice to get the original preference
                applySetting(toggleSetting(toggleSetting()));
            } else {
                applySetting(toggleSetting());
            }

            // Adjust the button
            setTimeout(switchIcon, 750);
            switchIcon();
            switchColor();

            // High contrast mode will be disabled so update the state text
            contrastToggleState.innerText = "off";
            setContrastButtonLabelAndStatus("off");
            contrastToggleButton.setAttribute("aria-checked", "false");
        });

        /**
         * Clicking the contrast toggle button runs the apply setting method explicitly stating highcontrast
         */
        contrastToggleButton.addEventListener("click", (evt) => {
            evt.preventDefault();

            // Apply the styles if high contrast was not enabled,
            // otherwise go back to last used theme
            if (localStorage.getItem(STORAGE_KEY) != HIGHCONTRAST_KEY) {
                localStorage.setItem(STORAGE_KEY, HIGHCONTRAST_KEY);
                applySetting(HIGHCONTRAST_KEY);
                setContrastButtonLabelAndStatus("on");
                modeToggleButton.setAttribute("aria-hidden", "true");
                modeStatusElement.innerText = `Colour mode is now ${HIGHCONTRAST_KEY}"`;
                modeToggleText.innerText = `Restore default colour theme`;
            } else {
                // If the high contrast mode was on, revert to the user's default theme
                // By running toggle twice to get the original preference
                applySetting(toggleSetting(toggleSetting()));
                setContrastButtonLabelAndStatus("off");
                contrastToggleButton.setAttribute("aria-checked", "false");
            }
        });

        // Hide the animated click hanger by default
        clickHanger.style.display = "none";

        /**
         * Switch the icon states
         */
        function switchIcon() {
            if (clickHanger.style.display === "none") {
                clickHanger.style.display = "block";
                hoverHanger.style.display = "none";
            } else {
                hoverHanger.style.display = "block";
                clickHanger.style.display = "none";
            }
        }

        /**
         * Switch the icon's colour stroke to match current theme
         */
        function switchColor() {
            for (let path of hangerPaths) {
                path.style.stroke = "var(--color-base)";
            }
        }

        // On load, apply the user's preferred setting
        applySetting();

        // If high contrast is the locally stored option, keep the toggle button state set to 'on'
        if (localStorage.getItem(STORAGE_KEY) === HIGHCONTRAST_KEY) {
            setContrastButtonLabelAndStatus("on");
            contrastToggleButton.setAttribute("aria-checked", "true");
            modeToggleText.innerText = `Restore default colour theme`;
        }
    },
    false
);
