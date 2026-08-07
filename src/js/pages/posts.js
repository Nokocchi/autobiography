const PostsPage = (() => {

    const VALID_TYPES = [
        "image",
        "video",
        "audio",
        "text"
    ];

    async function initialize(options) {
        const container = options.container;
        const title = options.title;
        const description = options.description;

        container.innerHTML = "";

        const params = new URLSearchParams(window.location.search);

        /*
         * ID takes precedence over type.
         *
         * posts.html?id=foo&type=video
         * will therefore display only post "foo".
         */
        const id = params.get("id");
        const type = (params.get("type") || "").toLowerCase();

        if (id) {
            await renderSinglePost(
                id,
                container,
                title,
                description
            );
            return;
        }

        if (VALID_TYPES.includes(type)) {
            await renderCategory(
                type,
                container,
                title,
                description
            );
            return;
        }

        showInvalidRequest(
            container,
            title,
            description
        );
    }

    async function renderSinglePost(
        id,
        container,
        title,
        description
    ) {
        const post = repository.getById(id);

        if (!post) {
            title.textContent = "Post Not Found";
            description.textContent =
                "The requested post could not be found.";

            container.innerHTML = `
            <p class="empty-message">
                No post exists with the requested ID.
            </p>
        `;

            return;
        }

        title.textContent = post.title;
        description.textContent = "";

        await renderPost(post, container);
    }

    async function renderCategory(
        type,
        container,
        title,
        description
    ) {
        title.textContent =
            capitalize(type) + " Posts";

        description.textContent =
            `Browsing all ${type} posts.`;

        const posts = repository.getByType(type);

        if (posts.length === 0) {
            container.innerHTML = `
            <p class="empty-message">
                No ${type} posts found.
            </p>
        `;

            return;
        }

        for (const post of posts) {
            await renderPost(post, container);
        }
    }

    async function renderPost(post, container) {
        const markdown =
            await repository.loadDescription(post);

        //const html = Markdown.render(markdown);
        const html = markdown;
        const element = Post.create({
            post,
            description: html,
            media: repository.buildMediaPath(post)
        });

        container.appendChild(element);
    }

    function showInvalidRequest(
        container,
        title,
        description
    ) {
        title.textContent = "Posts";
        description.textContent =
            "No valid post or category was specified.";

        container.innerHTML = `
        <p class="empty-message">
            Please select a category or post.
        </p>
    `;
    }

    function capitalize(value) {
        return value.charAt(0).toUpperCase() +
            value.slice(1);
    }

    return {
        initialize
    };

})();