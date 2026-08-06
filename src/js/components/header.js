const Header = (() => {

    function render(container) {

        container.className = "site-header";

        container.innerHTML = `
            <div class="banner">
                <a href="index.html" aria-label="Home">
                    <img src="images/logo.svg" alt="Logo">
                </a>

                <h1>My Autobiography</h1>
            </div>

            <nav>
                <ul>
                    <li>
                        <a href="index.html">
                            Home
                        </a>
                    </li>

                    <li>
                        <a href="category.html?type=image">
                            Images
                        </a>
                    </li>

                    <li>
                        <a href="category.html?type=video">
                            Videos
                        </a>
                    </li>

                    <li>
                        <a href="category.html?type=audio">
                            Audio
                        </a>
                    </li>

                    <li>
                        <a href="category.html?type=text">
                            Text
                        </a>
                    </li>

                    <li>
                        <a href="random.html">
                            Random
                        </a>
                    </li>
                </ul>
            </nav>
        `;
    }

    return {
        render
    };

})();