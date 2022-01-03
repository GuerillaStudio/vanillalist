# Thank you! 💜

Thank you for contributing to our awesome resources.

## Todo list

1. Create a valid JSON file in the `/plugins` folder
2. Name the file as a "kebab case" (something-like-this) version of the title
3. Add the following keys to the JSON file:
    1. `id`: an integer number incrementing the current higher plugin id
    2. `title`: The plugin name followed by a very short description of what's kind of plugin is it (a few words at most)
    3. `image`: the thumbnail file name (more infos in the next list item)
    4. `description`: A short description about the plugin, a few keywords are welcome to help the search engine
    5. `url_github`: Link to Github repo *(Optional as long as there is at least one url)*
    6. `url_npm`: Link to NPM repo *(Optional as long as there is at least one url)*
    6. `url_demo`: Link to plugin's website or a demo page *(Optional as long as there is at least one url)*
4. Add a thumbnail picture in the `/uploads` folder 
    - PNG, JPG and GIF formats only are authorized for now
    - Measuring a least 616×390px
    - Prefixed with the same id you put in the JSON file *(example: 42-mysuperplugin.png)*.

## Guidelines

- **One item** per Pull Request.

- The resource **must** not need any external dependencies (like jQuery, React.js, Vue.js), that's the all point of a vanilla JS plugins.

- The todolist bellow must have been completed.

- *(optional)* Allow modification from maintener, to avoid waisting time if your pull-request only need a few fixes or if the todolist isn't completed

## Thank you! 💜
