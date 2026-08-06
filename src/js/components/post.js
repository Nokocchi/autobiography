const Post = (() => {

    function create(options) {
        const { post, description, media } = options;

        const article = document.createElement("article");
        article.className = "post";

        // Title
        const title = document.createElement("h2");
        title.className = "post-title";
        title.textContent = post.title;
        article.appendChild(title);

        // Type Badge
        const badge = document.createElement("span");
        badge.className = `post-type type-${post.type}`;
        badge.textContent = capitalize(post.type);
        article.appendChild(badge);

        // Media
        const mediaElement = createMedia(post, media);
        if (mediaElement) {
            article.appendChild(mediaElement);
        }

        // Description
        const descriptionElement = document.createElement("div");
        descriptionElement.className = "post-description";
        descriptionElement.innerHTML = description;
        article.appendChild(descriptionElement);

        // Tags
        if (Array.isArray(post.tags) && post.tags.length > 0) {

            const tagContainer = document.createElement("div");
            tagContainer.className = "post-tags";

            for (const tag of post.tags) {

                const link = document.createElement("a");
                link.className = "post-tag";
                link.href = `tag.html?tag=${encodeURIComponent(tag)}`;
                link.textContent = tag;

                tagContainer.appendChild(link);
            }

            article.appendChild(tagContainer);
        }

        return article;
    }

    function createMedia(post, path) {

        if (!path) {
            return null;
        }

        switch (post.type) {

            case "image":
                return createImage(path);

            case "video":
                return createVideo(path);

            case "audio":
                return createAudio(path);

            case "text":
            default:
                return null;
        }

    }

    function createImage(path) {

        const img = document.createElement("img");
        img.className = "post-image";
        img.src = path;
        img.alt = "";

        return img;

    }

    function createVideo(path) {

        const video = document.createElement("video");
        video.className = "post-video";
        video.src = path;
        video.controls = true;
        video.preload = "metadata";

        return video;

    }

    function createAudio(path) {

        const audio = document.createElement("audio");
        audio.className = "post-audio";
        audio.src = path;
        audio.controls = true;
        audio.preload = "metadata";

        return audio;

    }

    function capitalize(value) {
        return value.charAt(0).toUpperCase() + value.slice(1);
    }

    return {
        create
    };

})();