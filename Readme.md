## String-con`cat` based Javascript templating system

### Features:

  * Asynchronous - Because it's just Javascript.
    However, you'll have to handle all control-flows yourself,
    which might be a little annoying since string concatenations are linear.
  * No compilation necessary
  * Minimal, unopinionated - Relies on Javascript, not its own syntax.
    Don't bother learning a new templating language, and just use Javascript!
  * CommonJS - Each template is simply a module that asynchronously returns a string.
  * Node.js and the Browser - Use the same templates on the server 
    and in the browser using a CommonJS package manager such as [Component](https://github.com/component/component).

### Why?

This templating system was created for Discore/Funraise.me!.
Very little static HTML is defined as most HTML is derived using helper functions on objects.
This made most string-based templating systems such as EJS tedious.

On the other hand, DOM-based templating systems like Jade is just syntactic sugar on top of Javascript.
By adding its own sugar, it creates a lot of hacks and unnecessary work arounds.
Jade compiles the template into a series of string concatenations anyways, 
so why not just use Javascript in the first place?

If you need to include copy text or static templates, just import an external file. 

### Browser Support:

  * `indexOf` - No shimming

## API

### `cat.el(tagName, attributes, innerHTML)`

A helper to create an HTML element.
For simple, self closing tags like `<br>`, just add `<br>` instead of `cat.el('br')`.

Note: this function assumes an HTML5 doctype.

Arguments:

* `tagName`
* `attributes` [Optional] - Object defining the tag attributes
* `innerHTML` [Optional] - Element's innerHTML. Does not escape for you.

Example:

    cat.el('a', {
      href: '#',
      target: '_blank',
      title: 'kitty',
      'data-true': true,
      'data-false': false
    }, 'kitty')

    > '<a href="#" target="_blank" title="kitty" data-true>kitty</a>'

### `cat.extends(fnChild, fnParent)`

Returns a new function that passes `fnChild`'s result to `fnParent`'s block.

### `cat.compile(fn, options, callback)`

Arguments:

* `fn` - Template that takes the following arguments:
  * `locals` - Locals object to pass from the renderer
  * `block` - HTML to pass to the template. 
    Used for extending/inheriting.
  * `callback(err, html)` - Function to pass the HTML or an error object.
* `options`:
  * `locals` - Locals to pass to the template function
  * `block` - HTML to pass to the template function
* `callback`

### `cat.render(filename, options, callback)`

Similar as `compile` except takes a filename instead of the actual function.

Additional option:

* `cache` (`false`) - Don't reload the template on every page load.
  This should only be false in development mode.

## Creating a template

### Simple example:

    var cat = require('cat')
    var el = cat.el

    module.exports = function(locals, block, callback) {
      var html = el('a', {
        href: locals.href,
        target: '_blank',
        title: locals.title,
        'data-true': true,
        'data-false': false
      }, locals.text)

      callback(null, html)
    }

### Extending from a layout:

    var cat = require('cat')
    var el = cat.el

    function myPage(locals, block, callback) {
      var html = el('a', {
        href: locals.href,
        target: '_blank',
        title: locals.title,
        'data-true': true,
        'data-false': false
      }, locals.text)

      callback(null, html)
    }
    module.exports = cat.extends(myPage, require('./views/layout'))

### Creating a mixin:

Mixins are just functions.
No need to make things any more complicated!
Attach them to the `el` function so they can be shared by all your templates without `require`-ing.

    // mixins.js

    var el = require('cat').el

    el.a = function(href, text, title) {
      return el('a', {
        href: href,
        title: title || text
      }, text)
    }

    el.meta = function(name, content) {
      return '<meta name="' + name + '" content="' + content + '">'
    }

    el.a('#', 'kitty!!!')