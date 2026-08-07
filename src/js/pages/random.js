const RandomPage = (() => {
    const STORAGE_KEY = "autobiography.random.history";

    let container = null;
    let button = null;

    async function initialize(options) {
        container = options.container;
        button = options.button;

        button.addEventListener("click", showAnother);

        await showAnother();
    }

    async function showAnother() {
        const posts = repository.getAll();

        if (posts.length === 0) {
            showMessage("No posts available.");
            button.disabled = true;
            return;
        }

        const history = loadHistory();

        /*
         * If every post has already been shown, start a new cycle.
         * This means the user can continue pressing "Show Another"
         * indefinitely without getting stuck.
         */
        if (history.length >= posts.length) {
            history.length = 0;
            saveHistory(history);
        }

        const availablePosts = posts.filter(
            post => !history.includes(post.id)
        );

        if (availablePosts.length === 0) {
            showMessage("No more unseen posts.");
            return;
        }

        const randomIndex = Math.floor(
            Math.random() * availablePosts.length
        );

        const post = availablePosts[randomIndex];

        history.push(post.id);
        saveHistory(history);

        await renderPost(post);
    }

    async function renderPost(post) {
        container.innerHTML = "";

        const markdown = await repository.loadDescription(post);
        //const html = Markdown.render(markdown);
        html = markdown;

        const element = Post.create({
            post,
            description: html,
            media: repository.buildMediaPath(post)
        });

        container.appendChild(element);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    function loadHistory() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);

            if (!stored) {
                return [];
            }

            const history = JSON.parse(stored);

            if (!Array.isArray(history)) {
                return [];
            }

            return history;
        } catch (error) {
            console.warn(
                "Unable to read random post history.",
                error
            );

            return [];
        }
    }

    function saveHistory(history) {
        try {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(history)
            );
        } catch (error) {
            console.warn(
                "Unable to save random post history.",
                error
            );
        }
    }

    function showMessage(message) {
        container.innerHTML = `<p class="empty-message">${escapeHtml(message)}</p>`;
    }

    function escapeHtml(value) {
        const element = document.createElement("div");
        element.textContent = value;
        return element.innerHTML;
    }

    return {
        initialize
    };

})();
