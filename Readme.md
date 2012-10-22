## String-con`cat` based Javascript templates for Express and Component

A few helpers to make templating using string concatenations easier. 
You should only use this if your templates have a significant amount of logic.

### Why?

* Use Javascript more easily in your templates.
* Modularize your templates.
* Organize, extend, include, etc. your templates any way you like.
* Templates compile to string concatenations anyways!
* Less than 2kb uncompressed.
* Works in both the browser and node.js.
* Use asynchronous logic in your templates, though you probably shouldn't do that.

### Requirements

Browser:

  * [component](https://github.com/component/component)

Maybe you can use another CommonJS system, I don't know.

### Browser Support:

IE9+

## API

### `cat.createElement(tagName, [attributes, [block]])`

A helper to create an HTML element. 
Only really recommended for DOMs with many attributes.
This function assumes an HTML5 doctype.

Arguments:

* `tagName` [string]
* `attributes` [object] - Object defining the tag attributes.
  Attributes can be an array (that will `.join(' ')`ed),
  a boolean, or a string.
* `block` [string || function] - Element's innerHTML. 
  Does not escape for you.
  Functions will simply be called and concatenated.

Example:

    cat.createElement('a', {
      href: '#',
      class: ['btn', 'btn-red'],
      target: '_blank',
      title: 'kitty',
      'data-true': true,
      'data-false': false
    }, 'kitty')

    > '<a href="#" class="btn btn-red" target="_blank" title="kitty" data-true>kitty</a>'

### `cat.render(fn, options, callback)`

Arguments:

* `fn` - Template that takes the following arguments:
  * `locals` - Locals object to template
  * `callback(err, html)` - Function to pass the HTML or an error object.
* `locals` - Locals object to template
* `callback`

### `cat.renderFile(filename, options, callback)`

Same as `cat.render` except `require`s the file.
Use this for Express:

    app.set('views', __dirname + '/views')
    app.engine('js', require('cat').renderFile)

### Examples

For examples, look at the following open source projects:

* [discore](https://github.com/discore/discore-bootstrap)