const TopButton = (() => {
    const SCROLL_THRESHOLD = 300;

    function initialize(button) {
        if (!button) {
            throw new Error("TopButton requires a button element.");
        }

        button.hidden = true;

        window.addEventListener("scroll", () => {
            button.hidden = window.scrollY < SCROLL_THRESHOLD;
        });

        button.addEventListener("click", scrollToTop);
    }

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    return {
        initialize
    };

})();
