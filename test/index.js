var cat = require('../')
var assert = require('assert')
var render = cat.render
var el = cat.createElement
var defaults = cat.defaultAttributes

render(function(locals, callback) {
  var anchor = el('a', {
    href: locals.href,
    target: '_blank',
    title: locals.title
  }, locals.title)

  callback(null, anchor)
}, {
  locals: {
    href: '#',
    title: 'kitty'
  }
}, function(err, html) {
  assert.ifError(err)

  assert.equal('<a href="#" target="_blank" title="kitty">kitty</a>', html, 'Incorrect HTML: ' + html)
})

function mixin(a, b) {
  return el('a', defaults(arguments, {
    href: '#'
  }), a)
}

render(function(locals, callback) {
  callback(null, mixin('text'))
}, {}, function(err, html) {
  assert.ifError(err)

  assert.equal('<a href="#">text</a>', html, 'Invalid first mixin: ' + html)
})

render(function(locals, callback) {
  callback(null, mixin('test', {
    href: '/'
  }))
}, {}, function(err, html) {
  assert.ifError(err)

  assert.equal('<a href="/">test</a>', html, 'Invalid second mixin: ' + html)
})

render(function(locals, callback) {
  callback(null, mixin('test', {
    target: '_blank'
  }))
}, {}, function(err, html) {
  assert.ifError(err)

  assert.equal('<a target="_blank" href="#">test</a>', html, 'Invalid third mixin: ' + html)
})

console.log('tada!!!')