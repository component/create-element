# Create Element [![Build Status](https://travis-ci.org/component/create-element.png)](https://travis-ci.org/component/create-element)

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

The MIT License (MIT)

Copyright (c) 2013 Jonathan Ong me@jongleberry.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.