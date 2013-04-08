# Create Element [![Build Status](https://travis-ci.org/discore/create-element.png)](https://travis-ci.org/discore/create-element)

Programatically create an HTML string.

```js
var createElement = require('create-element')

createElement('a', {
  id: 'user-link',
  href: '#',
  class: {
    yes: true,
    no: false,
    'maybe-so': true
  },
  'data-id': user.id
}, user.name)
```

yields:

```html
<a id="user-link" href="#" class="yes maybe-so" data-id="jonathanong">Jonathan Ong</a>
```
## API

### createElement(tagName, [attributes], [innerHTML])

#### Output

`HTML` [String]

#### Input

* `tagName` [string] - tag name of the element. ie `'div'` or `'blockquote'`
* `attributes` [object] - object of attribute keys and values.
  See `createElement.attributes` for more details.
* `innerHTML` [function || string] - element's `innerHTML`.
  If a function, evaluates the function within `createElement.element`'s current context, ie `fn.call(this, '')`.

```js
var html = createElement('a', {
  href: '#'
}, function (html) {
  // html === ''
  html += user.name

  return html
})
```

Both `attributes` and `innerHTML` are optional via type checking.
If there is no `innerHTML`, the element will not be self closed depending on `tagName`.

### createElement.attributes(attributes)

`attributes` is an object with attribute keys and values.
Each `attributes.value` can be:

* `[string]` - Simply returns a string
* `[array]` - Removes the "falsey" strings and `[].join(' ')` the strings
* `[object]` - Removes the keys with "falsey" values and `[].join(' ')`s the keys

```js
createElement.attributes({
  id: [
    '1',
    '2',
    false,
    null,
    '5'
  ],
  class: {
    yes: true,
    no: false,
    'maybe-so'; true
  },
  href: 'some string'
})
```

yields:

```js
' id="1 2 5" class="yes maybe-so" href="some string"'
```

### createElement.selfClosingTags

```js
createElement.selfClosingTags = {
  meta: true,
  img: true,
  link: true,
  input: true,
  source: true,
  area: true,
  base: true,
  col: true,
  br: true,
  hr: true
}
```

### createElement.openingTag(tagName, [attributes])

### createElement.closingTag(tagName)

## Browser Support

IE9+

## License

http://en.wikipedia.org/wiki/WTFPL
