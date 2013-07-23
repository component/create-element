var assert = require('assert')

var el = require('./')

assert.equal(el('img', {
  src: 'img.jpg',
  alt: ''
}), '<img src="img.jpg" alt="">')

assert.equal(el('img', {
  class: {
    yes: 'yes',
    no: false
  },
  src: 'img.jpg',
  alt: ''
}), '<img class="yes" src="img.jpg" alt="">')

assert.equal(el('a', {
  class: [
    'a',
    'b',
    'c'
  ],
  href: '#',
  title: ''
}), '<a class="a b c" href="#" title=""></a>')

assert.equal(el('a', function (html) {
  return html + '2'
}), '<a>2</a>')

assert.equal(el('a', {
  href: '#'
}, function (html) {
  return html + '2'
}), '<a href="#">2</a>')

console.log('Tests pass!')