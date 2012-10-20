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
  href: '#',
  title: 'kitty'
}, function(err, html) {
  assert.ifError(err)

  assert.equal('<a href="#" target="_blank" title="kitty">kitty</a>', html, 'Incorrect HTML: ' + html)
})

render(function(locals, callback) {
  callback(null, el('div', {
    class: ['a', 'b']
  }))
}, {}, function(err, html) {
  assert.ifError(err)

  assert.equal('<div class="a b"></div>', html, 'Incorrect array parsing.')
})

console.log('tada!!!')