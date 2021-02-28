// https://codersblock.com/blog/external-links-new-tabs-and-accessibility/

document.addEventListener(
    "DOMContentLoaded",
    function () {
        function addNoOpener(link) {
            let linkTypes = (link.getAttribute("rel") || "").split(" ");
            if (!linkTypes.includes("noopener")) {
                linkTypes.push("noopener");
            }
            link.setAttribute("rel", linkTypes.join(" ").trim());
        }

        function addNewTabMessage(link) {
            if (!link.querySelector(".visually-hidden")) {
                link.insertAdjacentHTML(
                    "beforeend",
                    '<span class="visually-hidden"> (opens in a new tab)</span>'
                );
            }
        }

        document.querySelectorAll('a[target="_blank"]').forEach((link) => {
            addNoOpener(link);
            addNewTabMessage(link);
        });
    },
    false
);
