const PostsPage = (() => {

    const VALID_TYPES = ["image", "video", "audio", "text"];

    async function initialize(options) {
        const container = options.container;
        const title = options.title;
        const description = options.description;

        container.innerHTML = "";

        const params = new URLSearchParams(window.location.search);
        const type = (params.get("type") || "").toLowerCase();

        if (!VALID_TYPES.includes(type)) {
            title.textContent = "Type Not Found";
            description.textContent = "The requested type is invalid.";

            container.innerHTML = `
                <p class="empty-message">
                    No type was specified.
                </p>
            `;
            return;
        }

        title.textContent = capitalize(type) + " Posts";
        description.textContent = `Browsing all ${type} posts.`;

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
        const markdown = await repository.loadDescription(post);

        //const html = Markdown.render(markdown);
        const html = markdown;

        const element = Post.create({
            post,
            description: html,
            media: repository.buildMediaPath(post)
        });

        container.appendChild(element);
    }

    function capitalize(value) {
        return value.charAt(0).toUpperCase() + value.slice(1);
    }

    return {
        initialize
    };

})();