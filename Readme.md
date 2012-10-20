## String-con`cat` based Javascript templates for Express and Component

A few helpers to make templating using string concatenations easier.

### Requirements

Browser:

  * [component](https://github.com/component/component)

Maybe you can use another CommonJS system, I don't know.

### Browser Support:

IE9+

  * `indexOf`
  * `Array.isArray`
  * `String`
  * `Object` ?


## API

### `cat.createElement(tagName, [attributes, [block]])`

A helper to create an HTML element. 
Only really recommended for DOMs with many attributes.

Note: this function assumes an HTML5 doctype.

Arguments:

* `tagName` [string]
* `attributes` [object] - Object defining the tag attributes.
  Attribute scan be an array (that will `.join(' ')`ed),
  a boolean, or a string.
* `block` [string || function] - Element's block. 
  Does not escape for you.
  Function will simply be called and concatenated.

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
  * `locals` - Locals object to pass from the renderer
  * `callback(err, html)` - Function to pass the HTML or an error object.
* `locals` - Locals object to pass from the renderer
* `callback`

### `cat.renderFile(filename, options, callback)`

Same as `render` except `require`s the file.
Use this for Express:

    app.set('views', __dirname + '/views')
    app.engine('js', require('cat').renderFile)

### Examples

For examples, look at the following open source projects:

* [discore](https://github.com/discore/discore-bootstrap)