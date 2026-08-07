const Header = (() => {

    function render(container) {

        container.className = "site-header";

        container.innerHTML = `
            <a class="banner" href="index.html" aria-label="Home">
                <h1>My Autobiography</h1>
            </a>

            <nav>
                <ul>
                    <li>
                        <a href="index.html">
                            Home
                        </a>
                    </li>

                    <li>
                        <a href="posts.html?type=image">
                            Images
                        </a>
                    </li>

                    <li>
                        <a href="posts.html?type=video">
                            Videos
                        </a>
                    </li>

                    <li>
                        <a href="posts.html?type=audio">
                            Audio
                        </a>
                    </li>

                    <li>
                        <a href="posts.html?type=text">
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