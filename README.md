# TODO:

Rename `category.html?type=image` to `post.html?category=image`. 

Add `post.html?id=graduation-day` for single post links. 

Posts are now half in posts.js and half in descriptions.js. Posts.js hardcodes the name of the files, but not the path because the path is determined by the post type. Can this be simplified?

Add Random page

Add "to the top" floating button.

Posts are loaded from scratch whenever a navbar item is clicked because it loads a completely new html document. Should this be optimized? Maybe store in localstorage? 