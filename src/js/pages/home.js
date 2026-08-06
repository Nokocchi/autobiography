const HomePage = (() => {

    async function initialize(options) {
        const container = options.container;

        container.innerHTML = "";

        const posts = repository.getAll();

        if (posts.length === 0) {
            container.innerHTML = `
                <p class="empty-message">
                    No posts available.
                </p>
            `;
            return;
        }

        for (const post of posts) {
            await renderPost(post, container);
        }

        // Begin loading markdown files in the background.
        repository.prefetchDescriptions();
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

    return {
        initialize
    };

})();