# Autobiography Website - Solution Design

## Overview

This project is a completely static autobiography website implemented using only HTML, CSS and vanilla JavaScript.

There are no dependencies, no package manager, no build step and no server-side code. The entire website can be copied to another computer and opened by double-clicking `index.html`.

All content is driven by a single JSON file together with a folder hierarchy containing media and markdown files.

---

# Goals

The website should allow visitors to browse stories from the author's life in multiple formats:

* Text
* Images
* Audio
* Video

Every post is represented by metadata stored in a single JSON file and optional media files stored in the project's data directory.

The design should remain intentionally simple and easy to extend.

---

# Folder Structure

```
project/
│
├── index.html
├── posts.html
├── random.html
├── tag.html
│
├── css/
│   └── style.css
│
├── js/
│   ├── postRepository.js
│   ├── markdown.js
│   │
│   ├── components/
│   │     header.js
│   │     post.js
│   │     topButton.js
│   │
│   └── pages/
│         home.js
│         posts.js
│         random.js
│         tag.js
│
├── images/
│   └── logo.svg
│
├── data/
│   ├── posts.json
│   ├── image/
│   ├── video/
│   ├── audio/
│   └── text/
│
└── README.md
```

---

# Data Storage

The website is driven by a single file:

```
/data/posts.json
```

The JSON file contains an array.

Each object represents one post.

Example:

```json
{
    "id": "graduation-day",
    "type": "image",
    "title": "Graduation Day",
    "description": "description.md",
    "media": "photo.webp",
    "tags": [
        "school",
        "family"
    ]
}
```

The physical files are located at

```
src/data/image/graduation-day/
```

Example:

```
image/
└──graduation-day/
    ├── description.md
    └── photo.webp
```

---

# Supported Post Types

## Text

Required

```
description.md
```

No media file.

---

## Image

Required

```
description.md
image file
```

Optional

```
thumbnail
```

---

## Audio

Required

```
description.md
audio file
```

---

## Video

Required

```
description.md
video file
```

Optional

```
thumbnail
```

---

# Post Ordering

The JSON array determines ordering.

* last object in the array = newest post
* first object in the array = oldest post

Every page simply renders the array in reverse order.

Advantages

* extremely easy to maintain
* no timestamp editing
* deterministic ordering

---

# Navigation

Every page contains a shared reusable header.

The header contains a logo/bannar at the top, as well as a navbar with the following links:
*
* Home
* Images
* Videos
* Audio
* Text
* Random

Clicking the logo always returns Home.

---

# Home Page

The Home page displays

* all post
* newest first

No filtering.

This effectively acts as the site's front page.

---

# Posts Pages

There is one posts page that can show posts of four different categories:

* Images
* Videos
* Audio
* Text

This should be implemented like this:

* posts.html?type=image
* posts.html?type=video
* posts.html?type=audio
* posts.html?type=text

Ordering remains newest first.

---

# Random Page

The Random page

* selects one visible post randomly
* displays the post
* contains a "Show Another" button

Pressing the button simply selects another random post.

Keep history in local storage so the same post is not shown twice.

---

# Tag Pages

Each rendered tag is clickable.

Example

```
family
```

opens

```
tag.html?tag=family
```

The Tag page displays every visible post containing that tag.

Ordering is newest first.

---

# Tag Filtering

The Tag page contains a type filter.

Available options

```
All
Images
Videos
Audio
Text
```

Default

```
All
```

Changing the filter does not reload the page.

Instead, JavaScript filters the already loaded data.

---

# Post Layout

Every post uses the same reusable Post component.

A post contains

* title
* type badge
* media
* rendered markdown description
* clickable tags

Example

```
--------------------------------
Graduation Day

[image]

Markdown description...

Tags

family
school
friends
--------------------------------
```

---

# Markdown

Descriptions are written in Markdown.

Supported features

* headings
* bold
* italic
* unordered lists
* ordered lists
* links
* blockquotes
* code blocks

The parser is implemented in vanilla JavaScript.

No external libraries.

---

# Image Handling

Images are displayed responsively.

Maximum width

```
100%
```

Never stretched.

---

# Video Handling

Native HTML5 video element.

Controls enabled.

No autoplay.

---

# Audio Handling

Native HTML5 audio element.

Controls enabled.

---

# Caching

The application loads

```
posts.json
```

exactly once.

The parsed data is stored in memory.

Every page reuses the cached copy.

Descriptions are also cached after first load.

Therefore

* returning to Home is instant
* switching categories is instant
* switching between tag pages only loads descriptions not previously loaded

Media files rely on the browser cache.

---

# Startup Prefetch

When Home loads

```
posts.json
```

is loaded immediately.

After rendering Home the application begins prefetching markdown descriptions in the background.

Media files are not prefetched.

This provides faster navigation without consuming excessive bandwidth.

---

# Component Architecture

Reusable components

```
Header
```

Shared navigation.

---

```
Post
```

Renders every post regardless of type.

---

```
Top Button
```

Floating button.

Appears after scrolling.

Smooth scroll to top.

---

# Page Modules

Home

* all posts

Posts

* filtered by type

Random

* random visible post

Tag

* filter by tag
* type filter

---

# Routing

Navigation is traditional HTML pages.

No SPA routing.

Each page loads

```
app.js
```

which initializes the appropriate page module.

---

# PostRepository

Responsible for

* loading posts.json
* caching JSON
* loading markdown
* caching markdown

It exposes functions such as

```
repository.initialize();
repository.getAll();
repository.getByType("image");
repository.getByTag("family");
repository.getRandom();
repository.getById(17);
repository.loadDescription(post);
```

---

# Rendering Strategy

All filtering is performed in memory.

The page never requests filtered JSON.

Instead

```
load JSON once

↓

filter array

↓

render posts
```

This keeps the implementation simple and efficient.

---

# Summary

The website consists of a small collection of HTML pages backed by a shared JavaScript application and a single metadata file. All content is derived from `posts.json`, while media and Markdown descriptions are loaded on demand from predictable folder locations based on the post type and ID. Shared components handle the common UI, all data is cached after the first load, posts are ordered by their position in the JSON array, and tag-based navigation with client-side filtering provides an additional way to explore the autobiography.
