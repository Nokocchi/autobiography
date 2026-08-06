const repository = (() => {

    let posts = null;
    const descriptionCache = new Map();

    async function initialize() {

        if (posts !== null) {
            return;
        }

        if (!window.POSTS_DATA) {
            throw new Error("POSTS_DATA was not loaded");
        }

        posts = POSTS_DATA;
    }

    function getAll() {
        ensureInitialized();

        // Newest first (last element in JSON array)
        return [...posts].reverse();
    }

    function getByType(type) {
        ensureInitialized();

        return getAll().filter(post => post.type === type);
    }

    function getByTag(tag) {
        ensureInitialized();

        const normalized = tag.toLowerCase();

        return getAll().filter(post =>
            Array.isArray(post.tags) &&
            post.tags.some(t => t.toLowerCase() === normalized)
        );
    }

    function getById(id) {
        ensureInitialized();

        return posts.find(post => post.id === id) ?? null;
    }

    function getRandom(excludeIds = []) {
        ensureInitialized();

        const available = getAll().filter(post =>
            !excludeIds.includes(post.id)
        );

        if (available.length === 0) {
            return null;
        }

        const index = Math.floor(Math.random() * available.length);

        return available[index];
    }

    async function loadDescription(post) {
        if (!post.description) {
            return "";
        }

        if (descriptionCache.has(post.id)) {
            return descriptionCache.get(post.id);
        }

        const markdown = window.Autobiography.descriptions[post.id] || "";

        descriptionCache.set(post.id, markdown);

        return markdown;
    }

    function prefetchDescriptions() {
        ensureInitialized();

        for (const post of posts) {
            loadDescription(post).catch(() => {
                // Ignore failed prefetches.
            });
        }
    }

    function buildMediaPath(post) {
        if (!post.media) {
            return null;
        }

        return `data/${post.type}/${post.id}/${post.media}`;
    }

    function buildThumbnailPath(post) {
        if (!post.thumbnail) {
            return null;
        }

        return `data/${post.type}/${post.id}/${post.thumbnail}`;
    }

    function ensureInitialized() {
        if (posts === null) {
            throw new Error("Repository has not been initialized. Call repository.initialize() first.");
        }
    }

    return {
        initialize,
        getAll,
        getByType,
        getByTag,
        getById,
        getRandom,
        loadDescription,
        prefetchDescriptions,
        buildMediaPath,
        buildThumbnailPath
    };

})();