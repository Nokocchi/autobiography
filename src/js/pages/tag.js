const TagPage = (() => {

    const VALID_TYPES = [
        "all",
        "image",
        "video",
        "audio",
        "text"
    ];

    let container = null;
    let title = null;
    let description = null;
    let filter = null;

    let tag = "";
    let posts = [];

    async function initialize(options) {
        container = options.container;
        title = options.title;
        description = options.description;
        filter = options.filter;

        const params = new URLSearchParams(window.location.search);

        tag = (params.get("tag") || "").trim();

        if (!tag) {
            showInvalidTag();
            return;
        }

        updateHeader();

        posts = repository.getByTag(tag);

        filter.addEventListener("change", render);

        await render();
    }

    function updateHeader() {
        title.textContent = `Tag: ${tag}`;

        description.textContent =
            `Posts tagged with "${tag}".`;
    }

    async function render() {
        container.innerHTML = "";

        let selectedType = filter.value;

        if (!VALID_TYPES.includes(selectedType)) {
            selectedType = "all";
            filter.value = "all";
        }

        let filteredPosts = posts;

        if (selectedType !== "all") {
            filteredPosts = posts.filter(
                post => post.type === selectedType
            );
        }

        if (filteredPosts.length === 0) {
            showNoPosts();
            return;
        }

        for (const post of filteredPosts) {
            await renderPost(post);
        }
    }

    async function renderPost(post) {
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

    function showInvalidTag() {
        title.textContent = "Tag Not Found";

        description.textContent =
            "No tag was specified.";

        filter.disabled = true;

        container.innerHTML = `
        <p class="empty-message">
            Please select a tag.
        </p>
    `;
    }

    function showNoPosts() {
        const selectedType = filter.value;

        let message;

        if (selectedType === "all") {
            message = `No posts found with the tag "${tag}".`;
        } else {
            const typeName = getTypeName(selectedType);

            message =
                `No ${typeName.toLowerCase()} posts found with the tag "${tag}".`;
        }

        container.innerHTML = `
        <p class="empty-message">
            ${escapeHtml(message)}
        </p>
    `;
    }

    function getTypeName(type) {
        switch (type) {
            case "image":
                return "Images";

            case "video":
                return "Videos";

            case "audio":
                return "Audio";

            case "text":
                return "Text";

            default:
                return "Posts";
        }
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