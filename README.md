# TODO:

Add `posts.html?id=graduation-day` for single post links. 

Posts are now half in posts.js and half in descriptions.js and the media is in a third location. Posts.js hardcodes the name of the media file, but not the path because the path is determined by the post type. Can this be simplified?
It should be as easy as possible to add new posts.

Add Random page

Add "to the top" floating button.

Posts are loaded from scratch whenever a navbar item is clicked because it loads a completely new html document. Should this be optimized? Maybe store in localstorage? 